
const CELL_LIMIT = 10000000;
const LOGGERSHEET = "LOGGER";
const OVERVIEWSHEET = "OVERVIEW";
const INVENTORYSHEET = "INVENTORY";
const PROFILESSHEET = "PROFILES";
const PROJECTSHEET = "PROJECTS";
const BUILDSSHEET = "BUILDS";

let source = SpreadsheetApp.getActiveSpreadsheet();
let overviewSheet = source.getSheetByName(OVERVIEWSHEET);
let profilesSheet = source.getSheetByName(PROFILESSHEET);

const eurCell = 'T2';        // cell where currency conversion multiplier is located
const functCell = "U2";      // reload functions tick box
const armCell = 'U3';        // cell where currency conversion multiplier lies
const groupCell = "U4";      // global group bool

const searchOutRows = 70;    // Number / Rows of Search results
const searchOutStartRow = 9; // first row of search output
const SEARCHINPUT = "D6";    // search input cell on overview sheet
const MONITORCELL = "G2";    // first cell of monitor
const monitorRow = 2;
const monitorColumn = 8;
const BUILDBUTTONCELL = 'B1';
const IDCOLUMN = 18;         // on sheet: IDCOLUMN + 4  ||  column where ID number of component entries is located

let sheetName;
const knownUsers = ['manu.bender@gmail.com']; // Add more email addresses as needed
let totalCellCounter = 0, totalDataCellCounter = 0; // for SheetSizeAuditTool sheet cell counter



function onOpen(e) {
  source = SpreadsheetApp.getActiveSpreadsheet();
  overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  logAll("Monitor", "Good Morning " + getCurrentUserName() + "! " + "Initializing sheet...", "onOpen");

  overviewSheet.getRange(functCell).setValue(Boolean(false));
  overviewSheet.getRange(searchOutStartRow, 6).activate();
  SpreadsheetApp.flush();

  SpreadsheetApp.getUi().createMenu('Functions')
    .addItem('injectOrder()', 'injectOrder')
    .addItem('buildProfile()', 'buildPROFILE')
    .addItem('logSheetsDaily()', 'logSheetsDaily')
    .addItem('toggleGroups()', 'toggleGroups')
    .addItem('onOpen()', 'onOpen')
    .addToUi();


  overviewSheet.getRange(9, 2, searchOutRows + 1, 24).clearContent();
  searchInputRange = overviewSheet.getRange(SEARCHINPUT); // Clear search
  overviewSheet.getRange(2, 1).setBackgroundRGB(153, 153, 153);
  overviewSheet.getRange(BUILDBUTTONCELL).setFontColor("#b7b7b7");
  searchInputRange.clearContent();
  searchInputRange.activate();

  const inventorySheet = source.getSheetByName(INVENTORYSHEET); // copy first row over to other sheets
  let tempSheet;
  let firstRow = inventorySheet.getRange(1, 1, 1, inventorySheet.getLastColumn()).getValues();
  [BUILDSSHEET, PROFILESSHEET, PROJECTSHEET].forEach(sheet => {
    tempSheet = source.getSheetByName(sheet);
    tempSheet.getRange(1, 1, 1, firstRow[0].length).setValues(firstRow);
  });
  firstRow[0][0] = "Row";
  overviewSheet.getRange(searchOutStartRow - 1, 2, 1, firstRow[0].length).setValues(firstRow);


  [BUILDSSHEET, PROFILESSHEET, PROJECTSHEET, INVENTORYSHEET].forEach(sheet => { // set all groups bool to false
    tempSheet = source.getSheetByName(sheet);
    tempSheet.getRange(2, 1).setValue(false);
  });


  overviewSheet.getRange(functCell).setValue(Boolean(true));
  overviewSheet.getRange(groupCell).setValue(Boolean(false));
  logAll("Monitor", "");
}





function onEdit(e) {
  const sheetName = SpreadsheetApp.getActiveSheet().getName();

  if (sheetName === OVERVIEWSHEET) {
    overviewSheet = source.getSheetByName(OVERVIEWSHEET);
    const range = e.range;
    const editedRow = range.getRow();
    const editedColumn = range.getColumn();
    const editedCellValue = range.getValue();

    if (editedRow >= searchOutStartRow && editedRow <= searchOutStartRow + searchOutRows) { // edit in search field detected
      const ID = overviewSheet.getRange(editedRow, IDCOLUMN + 5).getDisplayValue(); // edit handler
      const inventorySheet = source.getSheetByName(INVENTORYSHEET);
      const searchArray = inventorySheet.getDataRange().getDisplayValues();
      const row = findRowBySearchTerm(ID, searchArray);
      if (row > 0) {
        inventorySheet.getRange(row, editedColumn - 1).setValue(editedCellValue);
        logAll("Monitor", `Row ${row} edited: '${editedCellValue}'\n${INVENTORYSHEET}`);
        updateProfileItemsByID();
      } else {
        logAll("Monitor", "Item not Found.\nNot edited.");
      }
    }

    if (range.getA1Notation() === SEARCHINPUT && !editedCellValue) {
      logAll("Monitor", "");
      overviewSheet.getRange(2, 1).setBackgroundRGB(153, 153, 153);
      overviewSheet.getRange(BUILDBUTTONCELL).setFontColor("#b7b7b7");
      const clearRange = overviewSheet.getRange(9, 1, searchOutRows + 1, source.getLastColumn());
      clearRange.clearContent();
    } else if (range.getA1Notation() === SEARCHINPUT) {
      fillSearch(editedCellValue);
      overviewSheet.setActiveRange(cell);
    }
  }

  if (sheetName === PROFILESSHEET) {
    const range = e.range;
    const editedRow = range.getRow();
    const editedColumn = range.getColumn();
    if (editedRow > 3 && editedColumn > 2 && editedColumn < IDCOLUMN + 5) {
      updateProfileItemsByID();
      if (editedColumn !== IDCOLUMN + 4) logAll("Alert", "Don't edit item rows here!");
    }
  }
  if (sheetName === INVENTORYSHEET) {
    const range = e.range;
    const editedRow = range.getRow();
    const editedColumn = range.getColumn();
    if (editedRow > 3 && editedColumn > 1) {
      updateProfileItemsByID();
    }
  }
}


function fillSearch(input) {
  const source = SpreadsheetApp.getActiveSpreadsheet();
  const overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  overviewSheet.getRange(searchOutStartRow, 1, searchOutRows + 1, overviewSheet.getLastColumn()).clearContent();

  const index = getNonEmptyRowsValues(PROFILESSHEET)[0].indexOf(input);

  if (index > -1) {
    const profileNamesRows = getNonEmptyRowsAsIntegers(PROFILESSHEET);
    const profilesSheet = source.getSheetByName(PROFILESSHEET);
    const profileStartRow = profileNamesRows[index] + 2;
    const profileEndRow = profileNamesRows[index + 1] - 2;
    const profileRange = profilesSheet.getRange(profileStartRow, 1, profileEndRow - profileStartRow + 1, profilesSheet.getLastColumn());
    const results = profileRange.getDisplayValues();

    if (results.length > 0) {
      const outputRange = overviewSheet.getRange(searchOutStartRow, 2, results.length, results[0].length);
      outputRange.setValues(results);
      overviewSheet.getRange(searchOutStartRow, IDCOLUMN + 3, searchOutStartRow + searchOutRows, 1).clearContent();
      overviewSheet.getRange(2, 1).setBackgroundRGB(230, 230, 50);
      overviewSheet.getRange(BUILDBUTTONCELL).setFontColor("#ffffff");
      logAll("Monitor", "Profile Mode. \n" + input + "\n- Edit goes to Inventory Sheet\n- No editing amounts \n- ?? transfer amount edit to profile sheet ??");
      return;
    } else {
      logAll("Monitor", "Profile not found. Couldn't go into profile mode.");
    }
  }

  const results = performSearch(input);

  if (results.length > 0) {
    const outputRange = overviewSheet.getRange(searchOutStartRow, 1, results.length, results[0].length);
    outputRange.setValues(results);
    overviewSheet.getRange(2, 1).setBackgroundRGB(126, 227, 178);
    overviewSheet.getRange(BUILDBUTTONCELL).setFontColor("#b7b7b7");
    const cell = overviewSheet.getRange("F9");
    overviewSheet.setActiveRange(cell);
  }
  logAll("Monitor", "");
}

function performSearch(searchPrompt) {
  const inventorySheet = source.getSheetByName(INVENTORYSHEET);
  const values = inventorySheet.getDataRange().getDisplayValues();
  const searchTerms = searchPrompt.toLowerCase().split(" ");
  const matchResults = [];

  for (let i = 1; i < values.length && matchResults.length <= searchOutRows; i++) {
    const rowData = values[i];
    const rowString = rowData.join(" ").toLowerCase();
    const found = searchTerms.every(searchTerm => rowString.includes(searchTerm));

    if (found && rowData[4] !== "") { // filter out headline rows
      rowData.splice(1, 0, i + 1);
      matchResults.push(rowData);
    }
  }

  return matchResults;
}





function getSheetInfo(outputSelect) {
  const sheets = source.getSheets();
  const sheetNames = getSheetnames();
  let counter = 0;

  switch (outputSelect) {
    case "all":
      let info = "";
      let thisSheetInfo;
      sheets.forEach((sheet) => {
        thisSheetInfo = SheetSizeAuditTool.getSingleSheetInfo(sheet);
        info += `<tr><td>${sheetNames[0][counter]}</td><td>${thisSheetInfo[3]}</td><td>${thisSheetInfo[4]}</td></tr>`;
        totalCellCounter += thisSheetInfo[3];
        totalDataCellCounter += thisSheetInfo[4];
        counter++;
      });
      return `<table><tr><th>Sheet Name</th><th>Total Cell Counter</th><th>Total Data Cell Counter</th></tr>${info}</table>`;
    case "cell":
      return totalCellCounter;
    case "data":
      return totalDataCellCounter;
  }
}





function getCurrentUserName() {
  var userEmail = Session.getActiveUser().getEmail();
  var userName = "";

  switch (userEmail) {
    case "manu.bender@gmail.com":
      userName = "Manu";
      break;
    case "user2@example.com":
      userName = "User Two";
      break;
    // Add more cases for other users as needed
    default:
      userName = userEmail;
  }

  return userName;
}


function showDialog(html, title) {
  var html = HtmlService.createHtmlOutput(createTemplate(html))
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, title);
}

function showSidebar(html, title) {
  var html = HtmlService.createHtmlOutput(createTemplate(html))
    .setWidth(300)
    .setHeight(800)
    .setTitle(title);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

function createTemplate(input) {
  var t = HtmlService.createTemplateFromFile('Index');
  t.data = input;
  return t.evaluate();
}


function getSheetnames() {
  let out = new Array();
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++) out.push(sheets[i].getName())
  return [out];
}




function logAll(type, string, descriptor) {
  source = SpreadsheetApp.getActiveSpreadsheet();

  const setValueIfDescriptor = (range, value) => {
    range.setValue(descriptor ? value : "Monitor");
  };

  switch (type) {
    case "ALL":
      sheet = source.getSheetByName(OVERVIEWSHEET);
      sheet.getRange(monitorRow, monitorColumn).setValue(string);
      setValueIfDescriptor(sheet.getRange(monitorRow, monitorColumn - 1), descriptor);
      Logger.log(string);
      SpreadsheetApp.getUi().alert(string);
      break;
    case "NoAlert":
    case "LoggerMonitor":
      Logger.log(string);
      sheet = source.getSheetByName(OVERVIEWSHEET);
      sheet.getRange(monitorRow, monitorColumn).setValue(string);
      setValueIfDescriptor(sheet.getRange(monitorRow, monitorColumn - 1), descriptor);
      break;
    case "LoggerUi":
      Logger.log(string);
      SpreadsheetApp.getUi().alert(string);
      break;
    case "Logger":
      Logger.log(string);
      break;
    case "ui":
    case "Alert":
      SpreadsheetApp.getUi().alert(string);
      break;
    case "Monitor":
      sheet = source.getSheetByName(OVERVIEWSHEET);
      sheet.getRange(monitorRow, monitorColumn).setValue(string);
      setValueIfDescriptor(sheet.getRange(monitorRow, monitorColumn - 1), descriptor);
      break;
    case "Sidebar":
      Logger.log(string);
      // var htmlOutput = HtmlService.createHtmlOutput(string).setTitle(descriptor);
      SpreadsheetApp.getUi().showSidebar(string);
      break;
    case "Dialog":
      Logger.log(string);
      // var htmlOutput = HtmlService.createHtmlOutput(string).setTitle(descriptor);
      SpreadsheetApp.getUi().showModelessDialog(string);
      break;
    default:
      throw new Error("Invalid type provided. logAll()");
  }
}






function logSheetsDaily() {
  logAll("Monitor", "Running Daily log...", "Logger");
  makeLoggerEntry("Log", "logSheetsDaily()", OVERVIEWSHEET, " ", LOGGERSHEET, " ", " ", " ", " ", " ", " ");
  logAll("Monitor", "");

}



function makeLoggerEntry(type, area, source1, source2, sheetchange = "", changed = 0, armed = false, profile = "", revision = "", report) {
  source = SpreadsheetApp.getActiveSpreadsheet();
  const loggerSheet = source.getSheetByName(LOGGERSHEET);
  const overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  const sheets = source.getSheets();

  totalCellCounter = 0, totalDataCellCounter = 0;

  sheets.forEach((sheet) => {
    const thisSheetInfo = SheetSizeAuditTool.getSingleSheetInfo(sheet);
    totalCellCounter += thisSheetInfo[3];
    totalDataCellCounter += thisSheetInfo[4];
  });

  const totalCellPercent = totalCellCounter / CELL_LIMIT;
  const totalDataCellPercent = totalDataCellCounter / CELL_LIMIT;

  const date = getDate();
  let errorArray = checkforErrors();
  if (errorArray === "") {
    errorArray = ""; // or any default value you prefer
  } else {
    errorArray = errorArray.join('\n');
  }
  const ownedEUR = getOwnedEUR();
  const inventoryEUR = getSheetEUR(INVENTORYSHEET);
  const totalInventoryUnits = calculateTotalUnits(true);
  const totalInventoryEntries = calculateTotalUnits(false);
  const nonEmptyRowsBuild = getNonEmptyRowsAsIntegers(BUILDSSHEET).length;
  const sheetEurBuild = parseFloat(getSheetEUR(BUILDSSHEET));
  const nonEmptyRowsProfile = getNonEmptyRowsAsIntegers(PROFILESSHEET).length;
  const sheetEurProfile = parseFloat(getSheetEUR(PROFILESSHEET));
  const nonEmptyRowsProject = getNonEmptyRowsAsIntegers(PROJECTSHEET).length;
  const sheetEurProject = parseFloat(getSheetEUR(PROJECTSHEET));
  const EURUSD = overviewSheet.getRange(eurCell).getDisplayValue();

  const output = [
    date,
    type,
    area,
    source1,
    source2,
    sheetchange,
    changed,
    armed,
    profile,
    revision,
    report,
    errorArray,
    ownedEUR,
    inventoryEUR,
    totalInventoryUnits,
    totalInventoryEntries,
    totalCellCounter,
    totalCellPercent,
    totalDataCellCounter,
    totalDataCellPercent,
    nonEmptyRowsBuild,
    sheetEurBuild,
    nonEmptyRowsProfile,
    sheetEurProfile,
    nonEmptyRowsProject,
    sheetEurProject,
    EURUSD
  ];

  const loggerSheetLast = loggerSheet.getLastRow();
  loggerSheet.insertRowsAfter(loggerSheetLast + 1, 1);
  loggerSheet.getRange(loggerSheetLast + 1, 1, 1, output.length).setValues([output]);
}



function getOwnedEUR() {
  return parseFloat(getSheetEUR(BUILDSSHEET) + getSheetEUR(INVENTORYSHEET));
}



function checkforErrors() {
  const source = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = getSheetnames()[0];
  let tempSheet, e, importedSheet, row, outputArray = [], rowCounter = 0;

  for (e = 1; e < sheetNames.length; e++) { // all sheets exccept the first one
    tempSheet = source.getSheetByName(sheetNames[e]);

    importedSheet = tempSheet.getRange(1, 1, tempSheet.getLastRow(), tempSheet.getLastColumn()).getValues();

    let errorRows = [];
    for (let i = 0; i < importedSheet.length; i++) {
      for (let j = 0; j < importedSheet[i].length; j++) {
        if (importedSheet[i][j].toString().toLowerCase().includes("#error!") || importedSheet[i][j].toString().toLowerCase().includes("#ref!")) {
          errorRows.push(i + 1);
        }
      }
    }

    if (errorRows.length > 0) {
      outputArray.push(sheetNames[e] + ": " + errorRows.join(", "));
    } else {
      rowCounter++;
    }
  }

  if (rowCounter === sheetNames.length - 1) {
    return "";
  }

  return outputArray;
}




function createShoppingList(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(4, 1, lastRow - 3, lastColumn);

  const inventoryArray = range.getValues();
  const outputArray = [];

  for (let x = 0; x < inventoryArray.length; x++) {
    const currentItem = inventoryArray[x];
    const quantity = currentItem[1];
    currentItem[2] = parseFloat(currentItem[2]).toFixed(2);
    const lowNoti = currentItem[IDCOLUMN + 1];
    const inOnList = currentItem[IDCOLUMN + 2];

    if (quantity !== "" && quantity < lowNoti && inOnList) {
      outputArray.push(currentItem);
    }
  }

  return outputArray;
}








