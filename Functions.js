
function toggleGroups() {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const sheetName = activeSheet.getName();
  overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  let storedBool = overviewSheet.getRange(groupCell).getValue();
  let bool = false;

  if (sheetName === OVERVIEWSHEET) { // all sheets toggle
    source = SpreadsheetApp.getActiveSpreadsheet();

    bool = storedBool === true ? false : true;
    overviewSheet.getRange(groupCell).setValue(bool);

    [BUILDSSHEET, PROFILESSHEET, PROJECTSHEET, INVENTORYSHEET].forEach(sheet => collapseGroups(sheet, bool));

    [BUILDSSHEET, PROFILESSHEET, PROJECTSHEET, INVENTORYSHEET].forEach(sheetName => source.getSheetByName(sheetName).getRange(2, 1).setValue(bool));
  } else { // function for button operation on other sheets than overview sheet
    bool = !activeSheet.getRange(2, 1).getValue();
    activeSheet.getRange(2, 1).setValue(bool);
    collapseGroups(sheetName, bool);
  }
}

function collapseGroups(input, collapse) {
  const sheet = source.getSheetByName(input);
  const rowArray = getNonEmptyRowsAsIntegers(input);
  const groupStates = rowArray.map(row => {
    const group = sheet.getRowGroup(row + 1, 1);
    return { group, isCollapsed: group.isCollapsed() };
  });

  groupStates.forEach(({ group, isCollapsed }) => {
    if ((collapse && !isCollapsed) || (!collapse && isCollapsed)) {
      collapse ? group.collapse() : group.expand();
    }
  });
}




function updateProfileItemsByID() { // will only update cell values between PPU and Sore ID
  source = SpreadsheetApp.getActiveSpreadsheet();
  profilesSheet = source.getSheetByName(PROFILESSHEET);
  const inventorySheet = source.getSheetByName(INVENTORYSHEET);
  const profileArray = profilesSheet.getRange(4, IDCOLUMN + 4, profilesSheet.getLastRow(), 1).getDisplayValues().flat();
  const inventoryArray = inventorySheet.getRange(4, IDCOLUMN + 4, inventorySheet.getLastRow(), 1).getDisplayValues().flat();

  const idToRowMap = {};
  inventoryArray.forEach((id, index) => {
    idToRowMap[id] = index + 4;
  });

  const outputArray = profileArray.map((id, index) => {
    if (id && index > 0 && id in idToRowMap) {
      const invenRow = idToRowMap[id];
      const rowCopy = inventorySheet.getRange(invenRow, 3, 1, IDCOLUMN + 1).getDisplayValues()[0];
      return rowCopy;
    } else {
      return new Array(IDCOLUMN + 1).fill("");
    }
  });
  profilesSheet.getRange(4, 3, outputArray.length, IDCOLUMN + 1).setValues(outputArray);
}






function findRowBySearchTerm(searchTerm, data) { // used by inject Order, 
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        //SpreadsheetApp.flush();
        return i + 1; // Return the row index
      }
    }
  }
  return -1; // If not found, return -1
}



function getNonEmptyRowsAsIntegers(input) {
  // SpreadsheetApp.flush();
  source = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = source.getSheetByName(input);
  var data = sheet.getRange(2, 1, sheet.getLastRow() + 1, sheet.getLastColumn()).getValues();
  var numRows = data.length;
  var nonEmptyRows = [];

  for (var i = 2; i < numRows; i++) {
    if (data[i][0] !== '') {
      nonEmptyRows.push(i + 1);
    }
  }
  return nonEmptyRows;
}

function getNonEmptyRowsValues(input, bool) {
  // SpreadsheetApp.flush();
  var source = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = source.getSheetByName(input);
  var data = sheet.getRange(3, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var numRows = data.length;
  var nonEmptyValues = [];

  for (var i = 0; i < numRows; i++) {
    if (data[i][0] !== '') {
      nonEmptyValues.push(data[i][0]);
    }
  }
  if (!bool) {
    return [nonEmptyValues];
  } else {
    return nonEmptyValues;
  }
}



function calculateTotalUnits(bool) {
  // SpreadsheetApp.flush();
  source = SpreadsheetApp.getActiveSpreadsheet();
  const smdSheet = source.getSheetByName(INVENTORYSHEET);

  const values = smdSheet
    .getRange(4, 2, smdSheet.getLastRow() - 3, 1)
    .getValues();

  var sum = values
    .filter(row => !isNaN(row[0])) // Filter out non-numeric values
    .reduce((acc, row) => acc + Number(row[0]), 0); // Calculate the sum of the numeric values

  var entries = values.filter(row => row[0] !== '').length; // Count non-empty cells

  if (bool) {
    return sum;
  } else {
    return entries;
  }
}



function getSheetEUR(sheet) { // add all unit costs from SMD sheet together to display on OVERVIEW sheet
  //  SpreadsheetApp.flush();
  source = SpreadsheetApp.getActiveSpreadsheet();
  const smdSheet = source.getSheetByName(sheet);

  const values = smdSheet
    .getRange(3, 1, smdSheet.getLastRow() + 1, 3)
    .getValues();

  var totalCost = values     // Use array functions to calculate the total cost
    // .slice(2)                // Exclude the first 3 rows (headers and empty rows)
    .filter(row => !isNaN(row[1]) && !isNaN(row[2])) // Filter out rows with non-numeric values
    .reduce((acc, row) => acc + row[1] * row[2], 0); // Calculate the sum of (units * price)

  return totalCost;
}



function getCostSection(input, sheet, select) {
  // SpreadsheetApp.flush();
  source = SpreadsheetApp.getActiveSpreadsheet();
  profilesSheet = source.getSheetByName(sheet);
  const data = profilesSheet.getRange(1, 1, profilesSheet.getLastRow() + 2, 3).getValues();

  let startRow = 0;
  let endRow = 0;
  let profileSum = 0.0;
  let qtySum = 0;

  data.some((row, index) => {
    if (startRow > 0 && row[1] === "") {
      endRow = index;
      return true;
    }
    if (input === row[0]) {
      startRow = index + 2;
    }
    if (row[0] === "!Error") {
      throw new Error("input data has error");
    }
    return false;
  });

  let relevantData = data.slice(startRow - 1, endRow);
  relevantData.forEach(row => {
    const quantity = parseInt(row[1]);
    const price = parseFloat(row[2]);

    if (isNaN(price) || price === "") {
      throw new Error("Not Found. Price empty \n Rows: 0:" + row[0] + ", 1:" + row[1] + ", 2: " + row[2]);
    }

    qtySum += quantity;
    profileSum += quantity * price;
  });

  if (profileSum > 0.0) {
    if (select === "quantity") {
      return qtySum;
    } else if (select === "entries") {
      return endRow - startRow + 1;
    }
    return profileSum;
  } else {
    return 0;
  }
}




function cleanArray(inputArray) {
  var cleanedArray = inputArray.filter(function (element) {
    return isNaN(element) && typeof element !== undefined && element !== "undefined" && element !== "" && element !== ' ';
  });

  return cleanedArray;
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



function getDate() {
  const temp = new Date().getTime();
  let date = new Date(temp);
  date = Utilities.formatDate(date, "CET", 'dd.MM.yy, HH:mm:ss')
  return date;
}



