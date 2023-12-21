


function checkEmailsForOrders() {
  var today = new Date();
  var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000); // Get yesterday's date
  var threads = GmailApp.search("from:munich@mouser.com after:" + formatDate(yesterday));
  let orderNumber = 0, content;

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var from = messages[j].getFrom();
      var subject = messages[j].getSubject();
      Logger.log("From: " + j + " " + from + ", Subject: " + subject);
      if (subject.match("Shipment Notification on Your Purchase Order")) {
        Logger.log("From: " + j + " Selected");
        orderNumber = Number(subject.slice(44, 53)).toFixed(1);
        content = messages[j].getPlainBody();
        // content = extractDataFromHTML(content);
        Logger.log(orderNumber);
        Logger.log(content);
      }
    }
  }
}

function extractDataFromHTML(html) {
  const document = XmlService.parse(html);
  const root = document.getRootElement();
  const tables = root.getChildren('table');

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const rows = table.getChildren('tr');
    for (let j = 0; j < rows.length; j++) {
      const row = rows[j];
      const cells = row.getChildren('td');
      for (let k = 0; k < cells.length; k++) {
        const cell = cells[k];
        const cellText = cell.getValue();
        Logger.log('Cell Text: ' + cellText);
      }
    }
  }
}

// Function to format date in YYYY/MM/DD format
function formatDate(date) {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  return yyyy + "/" + mm + "/" + dd;
}



function showSidebarWithShopping() {
  const shoppingList = createShoppingList(INVENTORYSHEET);

  const htmlList = `
    <table style="width:100% padding: 2px; margin: 2px;">
      <tr>
        <th> </th>
        <th> </th>
        <th>Price</th>
        <th>Value</th>
        <th>Descriptor_____________________________</th>
        <th>Volts_________</th>
        <th>Current_______</th>
        <th>Quie. Curr</th>
        <th>Package_______</th>
        <th>_</th>
        <th>_</th>
        <th>Power_________</th>
        <th>Temperature___</th>
        <th>Tolerance_____</th>
        <th>Speed,Data,Class_________</th>
      </tr>
      ${shoppingList
      .map((entry) => `<tr>${entry.map((item) => `<td>${item}</td>`).join('')}</tr>`).join('')}
    </table>
  `;

  const shoppingHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            background-color: #888888;
            padding: 0px;
            margin: 0px;
          }
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            padding: 0px; 
            margin: 2px;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 3px;
            margin: 2px;
            color: white;
          }
          th {
            background-color: #4F4F4F;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <h2>Shopping List</h2>
        ${htmlList}
      </body>
    </html>
  `;

  const sidebarHTML = HtmlService.createHtmlOutput(shoppingHTML).setTitle('Shopping List');
  SpreadsheetApp.getUi().showSidebar(sidebarHTML);
}






function showSidebarWithStats() {
  const startTime = new Date().getTime();
  source = SpreadsheetApp.getActiveSpreadsheet();
  updateProfileItemsByID();
  logAll("Monitor", "Loading", "Sidebar");
  const loggerSheet = source.getSheetByName(LOGGERSHEET);

  const graphData = loggerSheet.getDataRange().getValues();
  const mapGraphData = (row, indices) => indices.map(index => row[index]);

  const sheetCellGraphData = graphData.map(row => mapGraphData(row, [0, 16, 18])); // Time, Total Sheet Cells,	Total Cells w Data
  const totalInvenGraphData = graphData.map(row => mapGraphData(row, [0, 12, 13, 14, 15]));// Time, Total Owned,	Inventory Owned, Components, Inventory Entries
  const totalProfilesGraphData = graphData.map(row => mapGraphData(row, [0, 22, 23]));       // Time, Profiles,	Profiles €
  const totalBuildsGraphData = graphData.map(row => mapGraphData(row, [0, 20, 21]));        // Time, Builds,	Builds €,
  const eurusdGraphData = graphData.map(row => mapGraphData(row, [0, 26]));       // Time, Builds,	Builds €,	Profiles,	Profiles €


  const errors = checkforErrors();
  if (errors !== "") { const HTMLerrors = errors.join("<br>"); }
  const sheetInfo = getSheetInfo("all");
  const cells = getSheetInfo("cell");
  const dataCells = getSheetInfo("data");

  const totalOwned = getOwnedEUR().toFixed(2);
  const units = calculateTotalUnits(true);
  const entries = calculateTotalUnits(false);
  const categories = getNonEmptyRowsAsIntegers(INVENTORYSHEET).length;


  logAll("Monitor", "Compiling HTML...", "Sidebar");

  const template = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
  body {
    font-family: Arial, sans-serif;
    font-size: 12px;
    background-color: #888888;
    padding: 0px;
    margin: 0px;
  }
  h3 {
    font-size: 13px;
    text-align: left;
    padding: 1px;
  }
  th {
    text-align: left;
    font-size: 13px;
    background-color: #45818e;
    margin: 2px 0px;
    padding: 4px 1px;
  }
  td {
    border-bottom: 1px solid #D1D1D1;
    padding: 2px 2px;
    margin: 2px 0px;
  }
  .tablink {
    background-color: #888888;
    color: #ffffff;
    padding: 8px 10px;
    margin: 8px 1px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #D1D1D1; 
  }
  .tablink.active {
    background-color: #A1A1A1;
  }
  .tablink:focus {
    background-color: #A1A1A1;
    outline: none;
  }
  .tabcontent {
    display: none;
    padding: 0px;
    background-color: #888888;
    color: #ffffff;
  }
</style>

    </head>
    
    <body>
    <div class="tabs" style="text-align: center; margin-bottom: 20px;">
      <button class="tablink" onclick="openTab('SheetStats', this, '#45818e')" id="defaultOpen">Sheet</button>
      <button class="tablink" onclick="openTab('InventoryStats', this, '#45818e')">Inventory</button>
      <button class="tablink" onclick="openTab('Profiles', this, '#45818e')">Profiles</button>
      <button class="tablink" onclick="openTab('Builds', this, '#45818e')">Builds</button>
    </div>

    <div id="SheetStats" class="tabcontent" style="display:block; height: 650px; width: 300px">
      <table>
        <tr><th>Sheet Errors</th><td>${errors}</td>
        <tr><th>Total Cell Counter</th><td>${cells}</td>
        <tr><th>Total DataCell Counter</th><td>${dataCells}</td>
        <tr style="height: 14px;"></tr>
        ${sheetInfo}
        <tr style="height: 10px;"></tr>
        <div id="graph_div" style="width: 300px; height: 260px; margin-bottom: 15px"></div>
      </table>
    </div>

 <div id="InventoryStats" class="tabcontent" style="display:block; height: 650px; width: 300px">
  <table>
     <tr>
       <th>Total</th>
       <td>${totalOwned} €</td>
     </tr>
     <tr>
       <th>Units</th>
       <td>${units}</td>
     </tr>
     <tr>
       <th>Entries</th>
       <td>${entries}</td>
     </tr>
     <tr>
       <th>Categories</th>
       <td>${categories}</td>
     </tr>
  </table>
     <div id="inventory_graph_div" style="width: 300px; height: 260px; margin-bottom: 15px"></div>
     <div id="eurusd_graph_div" style="width: 300px; height: 260px; margin-bottom: 15px"></div>
 </div>

 <div id="Profiles" class="tabcontent" style="display:block; height: 650px; width: 300px">
   <table style="margin-bottom: 15px">
     <th>${PROFILESSHEET} Entries</th><td>${getNonEmptyRowsAsIntegers(PROFILESSHEET).length}</td>
   </table>
   <table style="; margin-bottom: 20px">
     <tr>
       <th>Row</th>
       <th>Cost</th>
       <th>Profiles</th>
       <th>Entries</th>
       <th>Units</th>
     </tr>
     ${getProfilesAsRows(getNonEmptyRowsValues(PROFILESSHEET), PROFILESSHEET)}
   </table>
    <div id="profiles_graph_div" style="width: 300px; height: 260px"></div>
 </div>

<div id="Builds" class="tabcontent" style="display:block; height: 650px; width: 300px">
   <table style="margin-bottom: 15px">
     <th>${BUILDSSHEET} Entries</th><td>${getNonEmptyRowsAsIntegers(BUILDSSHEET).length - 1}</td>
   </table>
   <table style="; margin-bottom: 20px">
     <tr>
       <th>Row</th>
       <th>Cost</th>
       <th>Builds</th>
       <th>Entries</th>
       <th>Units</th>
     </tr>
     ${getProfilesAsRows(getNonEmptyRowsValues(BUILDSSHEET), BUILDSSHEET)}
   </table>
    <div id="builds_graph_div" style="width: 300px; height: 260px; margin-bottom: 15px"></div>
 </div>

</div>

    </br><div>
    <input type="button" value="Close" onclick="google.script.host.close()" class="tablink" style="background-color: #888888; color: #ffffff; padding: 8px 16px; margin: 10px; cursor: pointer; font-size: 14px; ">
    </div>

    <script>
      function openTab(tabName, element, color) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "block";
        element.classList.add("active");
      }
    </script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js">
    </script>
    <script type="text/javascript">
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawCharts);


      function drawCharts() {
        drawSheetChart();
        drawInventoryChart();
        drawProfilesChart();
        drawEURChart();
      }


      function drawSheetChart() {
        var sheetData = google.visualization.arrayToDataTable(${JSON.stringify(sheetCellGraphData)});
        var options = {
          title: 'Cells & Cells /w Data',
          curveType: 'function',
          series: {
             0: { targetAxisIndex: 0 }, // Left axis (default)
             1: { targetAxisIndex: 1 }  // Right axis
          },
          chartArea: { left: 0, right: 0},
          colors: ['#ff7024', '#2caac4'],
          backgroundColor: 'transparent',
          titleTextStyle: { color: '#ffffff' },
          legend: { 
           position: 'none',
           textStyle: {color: '#ffffff'}
          },
          hAxis: {
            gridlines: { color: '#888888' },
            textStyle: { color: '#ffffff' }
          },
        vAxis: { textStyle: {color: '#ffffff'} }
        };
        var sheetChart = new google.visualization.LineChart(document.getElementById('graph_div'));
        sheetChart.draw(sheetData, options);
      }

      google.charts.setOnLoadCallback(drawInventoryChart);
      function drawInventoryChart() {
        var inventoryData = google.visualization.arrayToDataTable(${JSON.stringify(totalInvenGraphData)});
        var inventoryOptions = {
          title: 'Inventory',
          curveType: 'function',
          series: {
             0: { targetAxisIndex: 0 }, // Left axis (default)
             1: { targetAxisIndex: 0 },  
             2: { targetAxisIndex: 1 }, // Right axis
             3: { targetAxisIndex: 0 },
          },
          chartArea: { left: 0, right: 0 },
          colors: ['#ff7024', '#2caac4', '#ffd91b', '#cbef7f'],
          backgroundColor: 'transparent',
          titleTextStyle: { color: '#ffffff'},
          legend: { 
           position: 'none',
           textStyle: {color: '#ffffff'}
          },
          hAxis: {
            gridlines: { color: '#888888' },
            textStyle: { color: '#ffffff' }
          },
        vAxis: { textStyle: {color: '#ffffff'} }
        };
        var inventoryChart = new google.visualization.LineChart(document.getElementById('inventory_graph_div'));
        inventoryChart.draw(inventoryData, inventoryOptions);
      }


      google.charts.setOnLoadCallback(drawProfilesChart);
      function drawProfilesChart() {
        var profileData = google.visualization.arrayToDataTable(${JSON.stringify(totalProfilesGraphData)});
        var profileOptions = {
          title: 'Profiles',
          curveType: 'function',
          series: {
             0: { targetAxisIndex: 0 }, // Left axis (default)
             1: { targetAxisIndex: 1 }, // Right axis
             2: { targetAxisIndex: 0 },
             3: { targetAxisIndex: 1 },
          },
          chartArea: { left: 0, right: 0 },
          colors: ['#8cfb7a', '#1fa409' ],
          backgroundColor: 'transparent',
          titleTextStyle: { color: '#ffffff' },
          legend: { 
           position: 'none',
           textStyle: {color: '#ffffff'}
          },
          hAxis: {
            gridlines: { color: '#888888' },
            textStyle: { color: '#ffffff' }
          },
        vAxis: { textStyle: {color: '#ffffff'} }
        };
        var profilesChart = new google.visualization.LineChart(document.getElementById('profiles_graph_div'));
        profilesChart.draw(profileData, profileOptions);
      }


      google.charts.setOnLoadCallback(drawBuildsChart);
      function drawBuildsChart() {
        var buildsData = google.visualization.arrayToDataTable(${JSON.stringify(totalBuildsGraphData)});
        var buildsOptions = {
          title: 'Builds',
          curveType: 'function',
          series: {
             0: { targetAxisIndex: 0 }, // Left axis (default)
             1: { targetAxisIndex: 1 }, // Right axis
             2: { targetAxisIndex: 0 },
             3: { targetAxisIndex: 1 },
          },
          chartArea: { left: 0, right: 0 },
          colors: ['#89c2ff', '#1b77dc', '#8cfb7a', '#1fa409' ],
          backgroundColor: 'transparent',
          titleTextStyle: { color: '#ffffff' },
          legend: { 
           position: 'none',
           textStyle: {color: '#ffffff'}
          },
          hAxis: {
            gridlines: { color: '#888888' },
            textStyle: { color: '#ffffff' }
          },
        vAxis: { textStyle: {color: '#ffffff'} }
        };
        var buildsChart = new google.visualization.LineChart(document.getElementById('builds_graph_div'));
        buildsChart.draw(buildsData, buildsOptions);
      }

      google.charts.setOnLoadCallback(drawEURChart);
      function drawEURChart() {
        var eurData = google.visualization.arrayToDataTable(${JSON.stringify(eurusdGraphData)});
        var eurOptions = {
          title: 'EUR to USD',
          curveType: 'function',
          series: {
             0: { targetAxisIndex: 0 }, // Left axis (default)
             0: { targetAxisIndex: 0 }, // Left axis (default)
          },
          chartArea: { left: 0, right: 0 },
          colors: ['#ff4a4a'],
          backgroundColor: 'transparent',
          titleTextStyle: { color: '#ffffff'},
          legend: { 
           position: 'none',
           textStyle: {color: '#ffffff'}
          },
          hAxis: {
            gridlines: { color: '#888888' },
            textStyle: { color: '#ffffff' }
          },
         // vAxis: { textStyle: { color: '#ffffff' } }
        };
        var eurChart = new google.visualization.LineChart(document.getElementById('eurusd_graph_div'));
        eurChart.draw(eurData, eurOptions);
      }

    </script>
    </body>
    </html>
  `;
  logAll("Monitor", "HTML Loaded.", "Sidebar");

  const html = HtmlService.createHtmlOutput(template).setTitle(' ');             /*.setWidth(400) does not work on sidebar*/
  html.append(`<script>document.getElementById('SheetStats').style.display = "block";</script>`);    // Show the default tab on load
  html.append(`<script>document.getElementById('InventoryStats').style.display = "none";</script>`); // Hide other tabs on load
  html.append(`<script>document.getElementById('Profiles').style.display = "none";</script>`);  // Hide other tabs on load
  html.append(`<script>document.getElementById('Builds').style.display = "none";</script>`);  // Hide other tabs on load
  html.append(`<script>document.getElementById('defaultOpen').click();</script>`);                   // Simulate a click on the default button
  const time = (new Date().getTime() - startTime) / 1000;
  logAll("Monitor", "Sidebar Load.\nTime Elapsed: " + time.toFixed(2) + "sec");
  logAll("Sidebar", html);
}



function getProfilesAsRows(profileNamesArray, sheet) {
  const array = getNonEmptyRowsAsIntegers(sheet);
  let rowsHtml = '';
  let totalCost = 0;

  profileNamesArray[0].forEach((profileName, i) => {
    const cost = getCostSection(profileName, sheet).toFixed(2);
    const entries = getCostSection(profileName, sheet, "entries");
    const quantity = getCostSection(profileName, sheet, "quantity");
    totalCost += Number(cost);

    rowsHtml += `<tr>
      <td>${Number(array[i] + 1)}</td>
      <td>${cost} €</td>
      <td>${profileName}</td>
      <td>${entries}</td>
      <td>${quantity}</td>
    </tr>`;
  });

  rowsHtml += `
    <th>Total</th>
    <td>${totalCost.toFixed(2)} € </td>
  `;

  return rowsHtml;
}




function injectOrder() {
  source = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const startTime = new Date().getTime();
  const date = getDate();
  var logArray = [];

  overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  const currencyToEUR = overviewSheet.getRange(eurCell).getValue();

  const inventorySheet = source.getSheetByName(INVENTORYSHEET);
  const smdArray = inventorySheet.getDataRange().getValues();

  let orderSheetName = "", counter = 0, notFound = 0;

  let filenameResponse = ui.prompt("Order Inject", "- Convert .xls to .csv via import->export google sheet\n- Put .csv file into Drive/FINANCE/Orders folder\nEnter the name of the file to import: ", ui.ButtonSet.OK_CANCEL);
  if (filenameResponse.getSelectedButton() === ui.Button.CANCEL) {
    logAll("ALL", "Canceled.", "Inject Order"); // ALL, NoAlert, Monitor, Logger
    return;
  }
  let filename = filenameResponse.getResponseText();

  if (!filename) {
    logAll("ALL", `Canceled. File ${filename} not found.`, `Order Inject \n${date}`); // ALL, NoAlert, Monitor, Logger
    return;
  }
  filename = filename + ".csv";
  logArray.unshift("Injecting Order...\n" + filename);
  logAll("Monitor", logArray.join("\n"), "Inject Order");

  let injectReport = [];
  let injestArray = [];
  let searchTerm, newQTY, newPrice = 0.000, oldPrice = 0.000, oldQTY, targetRow, sumQuantity, costDiff = 0.000, store;

  const ARM = overviewSheet.getRange(armCell).getValue();

  // Import the file from Google Drive
  const folder = DriveApp.getFoldersByName("SMD Orders").next();
  const files = folder.getFilesByName(filename);

  if (files.length === 0) {
    logAll("ALL", "File not found in GDrive.", "Inject Order"); // ALL, NoAlert, Monitor, Logger
    return;
  } else if (files.length > 1) {
    logAll("ALL", "Multiple files with the same name found.", "Inject Order"); // ALL, NoAlert, Monitor, Logger
    return;
  }

  const file = files.next();   // Fetch the content of the file
  const data = file.getBlob().getDataAsString();
  if (data.includes("Mouser" || "MOUSER" || "Sales Order No:")) { store = "M"; } else if (data.includes("LCSC" || "lcsc" || "Package")) { store = "L"; }

  const rows = Utilities.parseCsv(data);   // Parse the CSV file
  let parsedData = [];

  rows.forEach(row => {
    parsedData.push(row.map(cell => {
      if (!isNaN(cell) && cell.trim() !== "") {
        const euroRegex = /([\d.,]+)\s*€/; // Updated Euro symbol regex
        const containsEuroSymbol = euroRegex.exec(cell);
        if (containsEuroSymbol) {
          const extractedNumber = containsEuroSymbol[1].replace(',', '.');          // Handle strings with decimals and € symbol
          const parsedNumber = parseFloat(extractedNumber);
          return !isNaN(parsedNumber) ? parsedNumber : cell;
        } else if (cell.includes(".") || cell.includes(",")) {
          const parsedNumber = parseFloat(cell.replace(',', '.'));          // Handle other strings with decimals
          return !isNaN(parsedNumber) ? parsedNumber : cell;
        } else {
          const parsedNumber = parseInt(cell, 10);          // Handle numerical strings without decimals
          return !isNaN(parsedNumber) ? parsedNumber : cell;
        }
      }
      return cell;
    }));
  });


  let arr = 0;
  let orderDate = "";

  for (let s = 1; s < parsedData.length; s++) {
    searchTerm = parsedData[s][store == "L" ? 0 : 6];

    if (searchTerm !== "") {
      newQTY = parseInt(parsedData[s][store == "L" ? 7 : 10]); // Quantity on order sheet: Lcsc : Mouser

      if (store == "M") {
        orderDate = parsedData[s][14];
        newPrice = parseFloat(parsedData[s][11].slice(0, 7).replace(",", "."));// Price on order sheet: Lcsc : Mouser
      } else if (store == "L") {
        orderDate = filename.slice(0, 8);
        newPrice = parseFloat(parsedData[s][9]);// Price 
        newPrice = parseFloat(newPrice * currencyToEUR); // convert USD to EUR
      }

      targetRow = findRowBySearchTerm(searchTerm, smdArray);

      if (targetRow > 0) {
        injestArray.push(inventorySheet.getRange(targetRow, 1, 1, 25).getValues()[0]);

        oldQTY = injestArray[arr][1];
        oldPrice = injestArray[arr][2];

        sumQuantity = Number(newQTY + oldQTY);
        costDiff = parseFloat((newPrice - oldPrice).toFixed(4));
        arr++;

        if (ARM) {
          inventorySheet.getRange(targetRow, 2).setValue(sumQuantity);
          inventorySheet.getRange(targetRow, IDCOLUMN + 1).setValue(getDate());

          // inventorySheet.getRange(targetRow, 5).setValue(parsedData[s][8]);// replace type / value with the one from store
          counter++;
          if (costDiff > 0.000) {
            inventorySheet.getRange(targetRow, 3).setValue(newPrice);

          }
        }
        logArray.unshift("Found     " + searchTerm);
        logAll("Monitor", logArray.join("\n"), "Injecting Order");
        // logAll("Monitor", "Found " + searchTerm, "Injecting Order");
        injectReport.push(`${sumQuantity}pcs,  ${searchTerm} Diff: ${costDiff} €, ${store == "L" ? ` ${parsedData[s][5]}` : ` ${parsedData[s][8]}`}`);
      } else {
        logArray.unshift("Not Found " + searchTerm);
        logAll("Monitor", logArray.join("\n"), "Injecting Order");
        // logAll("Monitor", "Not Found " + searchTerm, "Injecting Order");
        injectReport.push(`____> ${newQTY}pcs,  ${searchTerm}, ${store == "L" ? `${parsedData[s][5]}` : `${parsedData[s][8]}`}`);
        notFound++;
      }
    }
  }

  if (ARM) {
    updateProfileItemsByID();
    const time = (new Date().getTime() - startTime) / 1000;
    let reportString = `#######  ${store == "L" ? "LCSC" : "Mouser"} order from '${orderDate}' - ${filename} ${ARM == true ? " injected." : " not injected! Not Armed!"}  #######\n${date} Elapsed: ${time}sec\n${notFound} not Found.\n\n${injectReport.join("\n")}`;

    makeLoggerEntry(`${store == "L" ? "LCSC" : "Mouser"} order from '${orderDate}' - ${filename} ${ARM == true ? " injected." : " not injected! Not Armed!"}`, "injectOrder()", filename, orderSheetName, INVENTORYSHEET, counter, ARM, " ", " ", reportString, `Order Inject ${orderSheetName}`);
  }
  // logArray.unshift(reportString);
  logAll("Monitor", reportString, "Inject Order");

}








function buildProject() {
  source = SpreadsheetApp.getActiveSpreadsheet();
  overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  const projectSheet = source.getSheetByName(PROJECTSHEET);
  let searchProfile, iteration, status, response;
  let reportArray = [], counter;

  const ui = SpreadsheetApp.getUi();
  const ARM = overviewSheet.getRange(armCell).getValue();
  // let searchProfile = overviewSheet.getRange(INPUT_ROW - 3, INPUT_COLUMN + 2).getValue();
  // let iteration = overviewSheet.getRange(INPUT_ROW - 3, INPUT_COLUMN + 1).getValue();


  response = ui.prompt('Enter Build Project: \n\nie. "a11.3"', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    searchProfile = response.getResponseText();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    logAll("ALL", "Cancel.", "Build Project"); // ALL, NoAlert, Monitor, Logger
    return;
  }
  response = ui.prompt('Enter iteration: \n\nie. ' + getNonEmptyRowsValues(PROJECTSHEET).join("\n"), ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    iteration = response.getResponseText();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    logAll("ALL", "Cancel.", "Build Project"); // ALL, NoAlert, Monitor, Logger
    return;
  }


  // if (ARM) {
  // let projectRow = Number(getNonEmptyRowsAsIntegers(PROJECTSHEET)) + 1;


  let projectArray = projectSheet.getRange(1, 1, projectSheet.getLastRow(), 1).getValues();
  let projectRow = findRowBySearchTerm(iteration, projectArray);
  // projectArray.slice(projectRow + 1, projectSheet.getLastRow()); //  = projectSheet.getRange(projectRow + 1, 4, projectSheet.getLastRow(), 1)
  projectArray = projectSheet.getRange(projectRow + 1, 4, projectSheet.getLastRow(), 1).getValues();

  for (var x = 0; x < projectArray.length; x++) {
    if (projectArray[x][0] == "") { break; }

    status = buildPROFILE(projectArray[x][0]);
    if (status < 0) {
      reportArray[x] = projectArray[x][0] + " Not Found.";
      break;
    };
    reportArray[x] = projectArray[x][0];
    counter++;
  }


  makeLoggerEntry("Build " + searchProfile, "buildPROFILE()", PROFILESSHEET, INVENTORYSHEET, INVENTORYSHEET + ", " + BUILDSSHEET + ", " + PROJECTSHEET, counter, ARM, searchProfile, iteration, reportArray.join('\n'));
}





function buildPROFILE(bpInput) {
  const ui = SpreadsheetApp.getUi();
  source = SpreadsheetApp.getActiveSpreadsheet();
  overviewSheet = source.getSheetByName(OVERVIEWSHEET);
  profilesSheet = source.getSheetByName(PROFILESSHEET);
  const inventorySheet = source.getSheetByName(INVENTORYSHEET);
  const prototypeSheet = source.getSheetByName(BUILDSSHEET);
  const profilesLastRow = profilesSheet.getLastRow();
  const smdLastRow = inventorySheet.getLastRow();

  let counter = 0;
  let matchCount = 0;
  let costTotal = 0;
  let exit = false;
  const MAX_ROWS = 25;
  let VERSION = "";
  let startTime;
  const date = getDate();
  const ARM = overviewSheet.getRange(armCell).getValue();

  if (ARM === "" || ARM === undefined || ARM !== true && ARM !== false) {
    logAll("ALL", "ARM cell is empty");
    return;
  }

  let buildProfile = "";
  let foundLog = [];
  let emptyLog = [];
  let almostEmptyLog = [];
  let notUsedLog = [];
  let outputString = [];
  let tempRow = [];
  let inputIDs = [];
  let profilePrice = 0;


  if (bpInput !== undefined) {
    buildProfile = bpInput;
    VERSION = "projectBuild";

  } else {

    response = ui.prompt('Enter Version: \n\nie. "[0001], [0002]"', ui.ButtonSet.OK_CANCEL);
    if (response.getSelectedButton() == ui.Button.OK) {
      VERSION = response.getResponseText();
    } else if (response.getSelectedButton() == ui.Button.CANCEL) {
      logAll("NoAlert", "Cancel.", "Build Profile"); // ALL, NoAlert, Monitor, Logger
      return;
    }
    startTime = new Date().getTime();

    let profileIndex = 0;
    let searchPrompt = overviewSheet.getRange(SEARCHINPUT).getValue().toString();
    if (searchPrompt === "") {
      logAll("NoAlert", "Canceled.", "Build Profile");
      return;
    }
    logAll("NoAlert", "Searching...", "Building          " + searchPrompt);
    inputIDs = profilesSheet.getRange(1, 1, profilesLastRow, profilesSheet.getLastColumn()).getValues();
    profileIndex = findRowBySearchTerm(searchPrompt, inputIDs);
    let profileLastRow;

    if (profileIndex > 0) {
      buildProfile = searchPrompt;
    } else {
      logAll("All", "Not in build mode.\nEnter build profile.", "Build Profile");
      return;
    }

    for (let p = profileIndex + 1; p <= profilesLastRow; p++) {
      if (inputIDs[p][2] === "") {
        profileLastRow = p;
        break;
      }
    }

    inputIDs = inputIDs.slice(profileIndex, profileLastRow);
    const destinationArray = inventorySheet.getRange(1, 1, smdLastRow, inventorySheet.getLastColumn()).getValues();

    for (let j = 0; j < inputIDs.length; j++) {
      const id = inputIDs[j];
      const inventoryIndex = findRowBySearchTerm(id[21], destinationArray);
      tempRow = inventorySheet.getRange(inventoryIndex, 1, 1, inventorySheet.getLastColumn()).getValues()[0];

      if (id[1] !== 0) {
        matchCount++;

        if (inventoryIndex > 0) {
          let profileQty = id[1];
          profilePrice = id[2];
          let cost = parseFloat(profileQty * profilePrice);
          costTotal += cost;

          cost = cost.toFixed(2);
          profilePrice = profilePrice.toFixed(2);

          let invQty = tempRow[1];
          let lowNoti = tempRow[19];
          let newQty = invQty - profileQty;

          if (newQty == 0) {
            emptyLog.push(`${profilePrice}€ |  ${newQty}: ${tempRow[3]} | ${tempRow[4]} | ${tempRow[IDCOLUMN - 2]}  ||  ${tempRow[IDCOLUMN + 3]}`);
          } else if (lowNoti > newQty) {
            almostEmptyLog.push(`${profilePrice}€ |  ${newQty}: ${tempRow[3]} | ${tempRow[4]} | ${tempRow[IDCOLUMN - 2]}  ||  ${tempRow[IDCOLUMN + 3]}`);
          }
          if (newQty <= -1) {
            inventorySheet.setCurrentCell(inventorySheet.getRange(inventoryIndex, 4));
            logAll("ALL", `Canceled.\nCan't build board. \n\n${tempRow} \n\nis empty.\n`, "Building       " + buildProfile);
            return exit = true;
          } else {
            foundLog.push(`${profilePrice}€ |  ${profileQty}: ${tempRow[3]} | ${tempRow[4]} | ${tempRow[IDCOLUMN - 2]}  ||  ${tempRow[IDCOLUMN + 3]}`);
          }

          if (ARM) {
            counter++;
            inventorySheet.getRange(inventoryIndex, 2, 1, 1).setValue(newQty);
          }
        } else {
          logAll("All", "Component doesn't exist on Inventory: \n\n" + id);
          return;
        }
      } else {
        notUsedLog.push(`${tempRow[2]}€ | ${tempRow[3]} | ${tempRow[4]} | ${tempRow[IDCOLUMN - 2]}  ||  ${tempRow[IDCOLUMN + 3]}`);
      }
    }
    if (exit) return;
  }

  if (ARM) {
    const prototypesLastRow = prototypeSheet.getLastRow();
    const prototypeProfiles = prototypeSheet.getRange(1, 1, prototypesLastRow, 1).getDisplayValues();
    let i = 0;
    for (i = 0; i <= prototypesLastRow; i++) {
      if (prototypeProfiles[i] == '[]') {
        i++;
        break;
      } else if (i == prototypesLastRow) {
        logAll("All", "No empty slot on prototype sheet found", "Building          " + buildProfile);
        return;
      }
    }

    rangeToCopy = prototypeSheet.getRange(i, 1, 8, MAX_ROWS);
    prototypeSheet.insertRowsAfter(i + 8, 8);
    rangeToCopy.copyTo(prototypeSheet.getRange(i + 8, 1, 8, MAX_ROWS));

    logAll("Monitor", "Adding to Prototype Sheet...", "Building          " + buildProfile);
    prototypeSheet.insertRowsAfter(i + 1, inputIDs.length - 2);
    prototypeSheet.getRange(i, 1).setValue(buildProfile);
    prototypeSheet.getRange(i, 3).setValue(VERSION);
    prototypeSheet.getRange(i, 4).setValue(date);

    for (let j = 0; j < inputIDs.length; j++) {
      counter++;
      prototypeSheet.getRange(i + j + 1, 1, 1, inputIDs[0].length).setValues([inputIDs[j]]);
    }
  }

  const foundLength = foundLog.length;
  const emptyLength = emptyLog.length;
  const almostemptyLength = almostEmptyLog.length;
  const notUsedLogLength = notUsedLog.length;

  for (let i = 0; i <= foundLength + emptyLength + almostemptyLength + 9; i++) {
    outputString.push([]);
  }

  let arrayIndex = 0;
  const time = (new Date().getTime() - startTime) / 1000;

  outputString[arrayIndex++] = "Build Profile: " + buildProfile + "\n"; // make table headline
  outputString[arrayIndex++] = "Executed: " + ARM + "\n";
  outputString[arrayIndex++] = time + "sec elapsed \n";
  outputString[arrayIndex++] = "Total: " + costTotal.toFixed(2) + " € ";
  outputString[arrayIndex] = matchCount + " Components matched";

  if (ARM) {
    outputString[arrayIndex++] += "& updated:";
  } else {
    outputString[arrayIndex++] += ", not removed:";
  }

  for (let x = arrayIndex; x < foundLength + arrayIndex; x++) {
    outputString[x] += foundLog[x - arrayIndex];
  }

  arrayIndex += foundLength + 1;

  if (almostemptyLength > 0) {
    outputString[arrayIndex++] = almostemptyLength + " Almost empty:";
    for (let x = arrayIndex; x < almostemptyLength + arrayIndex; x++) {
      outputString[x] += almostEmptyLog[x - arrayIndex];
    }
  }

  arrayIndex += almostemptyLength + 1;

  if (emptyLength > 0) {
    outputString[arrayIndex++] = emptyLength + " Now empty:";
    for (let x = arrayIndex; x < emptyLength + arrayIndex; x++) {
      outputString[x] += emptyLog[x - arrayIndex];
    }
  }

  arrayIndex += emptyLength + 1;

  if (notUsedLogLength > 0) {
    outputString[arrayIndex++] = notUsedLogLength + " Not used:";
    for (let x = arrayIndex; x < notUsedLogLength + arrayIndex; x++) {
      outputString[x] += notUsedLog[x - arrayIndex];
    }
  }


  let htmlOutput = `<html><head><style>
                    table {
                      font-family: Arial, sans-serif;
                      border-collapse: collapse;
                      width: 100%;
                    }
                    th, td {
                      border: 1px solid #dddddd;
                      text-align: left;
                      padding: 3px, 10px;
                    }
                    th {
                      background-color: #45818e;
                      color: white;
                      font-size: 18px;
                      padding: 4px;
                    }
                    body {
                      width: 700px; 
                    }
                    </style></head><body><table>`;

  htmlOutput += `<tr><th colspan="3">Build Profile: ${buildProfile}</th></tr>`;
  htmlOutput += `<tr><td>Executed: ${ARM}</td><td colspan="2">${time} sec elapsed</td></tr>`;
  htmlOutput += `<tr style="height:20px;"></tr>`;
  htmlOutput += `<tr><td>Total: ${costTotal.toFixed(2)} €</td><td>Version: ${VERSION}    </td></tr>`;
  // htmlOutput += ``;
  htmlOutput += `<tr style="height:20px;"></tr>`;
  htmlOutput += `<tr><td colspan="3"><b>${matchCount} Components matched ${ARM ? '& updated' : ', not removed'}</b></td></tr>`;

  for (let x = 0; x < foundLength; x++) {
    htmlOutput += `<tr><td colspan="3">${foundLog[x]}</td></tr>`;
  }

  htmlOutput += `<tr style="height:20px;"></tr>`;

  if (almostemptyLength > 0) {
    htmlOutput += `<tr><th colspan="3">${almostemptyLength} Almost empty:</th></tr>`;
    for (let x = 0; x < almostemptyLength; x++) {
      htmlOutput += `<tr><td colspan="3">${almostEmptyLog[x]}</td></tr>`;
    }
  }
  htmlOutput += `<tr style="height:20px;"></tr>`;

  if (emptyLength > 0) {
    htmlOutput += `<tr><th colspan="3">${emptyLength} Now empty:</th></tr>`;
    for (let x = 0; x < emptyLength; x++) {
      htmlOutput += `<tr><td colspan="3">${emptyLog[x]}</td></tr>`;
    }
  }
  htmlOutput += `<tr style="height:20px;"></tr>`;

  if (notUsedLogLength > 0) {
    htmlOutput += `<tr><th colspan="3">${notUsedLogLength} Not used:</th></tr>`;
    for (let x = 0; x < notUsedLogLength; x++) {
      htmlOutput += `<tr><td colspan="3">${notUsedLog[x]}</td></tr>`;
    }
  }
  htmlOutput += `</table></body></html>`;


  if (ARM) {
    makeLoggerEntry("Build " + buildProfile, "buildPROFILE()", PROFILESSHEET, INVENTORYSHEET, INVENTORYSHEET + ", " + BUILDSSHEET, counter, ARM, buildProfile, VERSION, outputString.join('\n'));
    logAll("Monitor", date + "\n" + time + "sec elapsed\n" + buildProfile + " Executed", "Build Profile " + buildProfile);
  } else {
    logAll("Monitor", date + "\n" + time + "sec elapsed\n" + buildProfile + " NOT Executed", "Build Profile " + buildProfile);
  }

  htmlOutput = HtmlService.createHtmlOutput(htmlOutput)
    .setWidth(710)
    .setHeight(850);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "PCB built.");
}



