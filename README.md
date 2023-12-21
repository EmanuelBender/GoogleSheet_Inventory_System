<h1 align="center">GoogleSheet SMD/PCB Inventory System</h1>

<p align="center"><em>by eBender</em></p>


<p align="center" font-size="10px">An automated inventory system for Google Sheets (Apps Script)<br>
<b>⚠️ WORK IN PROGRESS</b><br>
<!-- <a href="https://www.instagram.com/zen.diy/">Instagram</a><br> -->
</p>

<p align="center">
The goal is to have to use it as little as possible to make it work. I want to have as little hassle as possible maintaining it. <br>
Also, after setup everything should be handled from the Overview sheet.  <br>
Minimal external labelling is needed if used correctly. (organisation always helps ofc) <br>
I use it to organise my SMD items and PCB projects in conjunction with SMD containers, but it can be used for other things. <br>
</p>


### Key Features

<table>
  <tr>
    <th>Keyword Search</th>
  </tr>
  <tr>
    <td>
       The search box can act like a item search, but can also trigger profile mode and display other information. <br>
       Custom Search algo. Multiple, partial keywords will be found. <br>
       Entering a Profile will switch sheet into Profile Mode.
   </td>
  </tr>

  <tr>
    <th>Automatic Invoice Import</th>
  </tr>
  <tr>
    <td> Supports Mouser & LCSC invoices.  </td>
  </tr>

  <tr>
    <th>Profiles & Builds</th>
  </tr>
  <tr>
    <td>Building a profile means: it subtracts the Profile components from the INVENTORY sheet and shows us a report on profile cost, stats, and success.  </br>
        Then adds the Build to the BUILDS sheet and a Log entry to LOGS.  
  </tr>

    <th>Editing</th>
  </tr>
  <tr>
    <td>
      On the OVERVIEW sheet any row entry can be edited, and will update the INVENTORY sheet. <br> 
      I found this very intuitive. <br>
      On the PROFILES sheet only Amount and ID need to be filled in. (faster)
   </td>
  </tr>

  <tr>
     <th>Sidebar (Shopping list or Stats)</th>
  </tr>
  <tr>
    <td>Buttons on the nav bar will pull up the shopping list or the sheet stats sidebar.</td>
  </tr>
</table>

<br>

### Utility Features

<table>

  <tr>
     <th>Console Monitor</th>
  </tr>
  <tr>
    <td>Displays information, errors, and progress.  </td>
  </tr>

  <tr>
    <th>Stats</th>
  </tr>
  <tr>
    <td>Provides graphs and numbers of total components, items, build profile components, and items with total prices.</td>
  </tr>

  <tr>
     <th>Daily Logging for Sheet Stats</th>
  </tr>
  <tr>
    <td>Logged data includes time, type/descriptor, function/area, sources, values changed, and various sheet metrics.</td>
  </tr>

  <tr>
     <th>Toggle Groups</th>
  </tr>
  <tr>
    <td>There are groups on each sheet that can be expanded and closed with either a button on the OVERVIEW sheet or individually on the INVENTORY, BUILDS, etc. sheet.</td>
  </tr>
</table>

<br>

### Getting Started / How to

<table>
  <tr>
      <th>Step 1</th> <th>Step 2</th> <th>Step 3</th>
  </tr>
  <tr colspan="3">
      <th colspan="3">Copy sheet & enter Items</th>
  </tr>
  <tr>
    <td>Copy the <a href="https://docs.google.com/spreadsheets/d/1COGIPqjvaSmpCLZWWQLtgucSimMKeokUlRZeDGTBkdY">template Inventory Sheet</a> into your Google Drive.    </td>     
    <td>Add trigger: Open sheet, click Extensions -> AppsScript -> Add Trigger -> <br> Time: Time Driven daily <br>Function: logSheetsDaily()</td>
    <td>Enter your items into your INVENTORY sheet (all info). <br>
        Create profile -> Enter item ID and amount on PROFILES sheet. </td>
  </tr>

  <tr colspan="3">
      <th colspan="3">Enter Profiles</th>
  </tr>
  <tr>
    <td>Create a profile by adding a header (profile name) and entering only ID and amount of each item on the PROFILES sheet.  </td>
    <td>Enter your Profile name via the search bar. <br> The mode switches to Profile view. </td>
    <td>Click the BUILD PROFILE button and follow prompts. <br>
        Now build your your profile irl using the specified components. </td>
  </tr>

  <tr colspan="3">
     <th colspan="3">Import Invoice Items</th>
  </tr>
  <tr>
    <td>Create a folder in Google Drive, enter folder name in Main Functions.js, place invoices inside, and trigger via the Inject Order button. </td>  
    <td>Items have to exist in the INVENTORY sheet with the same ID as on the invoice to work. (Mouser: 'Mouser No:', LCSC: 'LCSC Part Number')   </td>
    <td>Click Inject Order button on OVERVIEW sheet.  </td> 
    </td>
  </tr>

  <tr colspan="3">
    <th colspan="3">Shopping List</th>
  </tr>
  <tr>
    <td>The list is created according to the following criteria: <br> Item amount, Low Inventory amount, Shopping tick box</td>  
    <td>Set shopping tick box and low inventory amount for each Item.  </td>  
    <td>Click Shopping List button. </td>  
  </tr>


  <tr colspan="3">
    <th colspan="3">Manual upkeep</th>
  </tr>
  <tr colspan="3">
    <td>put new invoice into Folder -> Invoice file rename: Invoice date -> click inject order </td>
    <td>use 'Build Profile' when building smtn that uses inventory components (for ex. a PCB)  </td>
    <td>remove individual items you use from Inventory, when not using 'Build Profile'  </td>
    </td>
  </tr>

</table>

<br>

---

### Contributing

<table align="center">
  <tr>
    <th>Guidelines</th>
  </tr>
  <tr>
    <td>tbc</td>
  </tr>
</table>

---

### DEV

<p>
OVERVIEW Sheet top right corner -> DEV overview (global variables, errors, settings) <br>
- fn:  <br>
- arm: sheet can be disarmed for testing ( all volatile actions deactivated ) <br>
- grp:  <br>
- errors: if cells have errors, they appear here <br>
<br>
<a href="https://docs.google.com/spreadsheets/d/1myUQEsA9oBNqigG8VdQnsoAnKoohFrl_wG5S7znHjAk/edit?usp=sharing">SheetSizeAuditTool</a>
</p>
<br>

### Future

<p>
- Auto detect and import Invoices from email  <br>
- Auto detect new file in Invoice folder > auto convert exel to csv   <br>
- Detect more stores (only works with stores that have const product IDs)  <br>
- create PCBway/Aisler/JLCPCB integration > auto create Profile from PCB manufacturer invoice and/or BOM > auto build profile <br>

</p>

---

### Disclaimer & Handicaps

<p>
Item = One Item with a unique ID (Mouser or LCSC item no)   <br>
Profile = a collection of Items   <br>
Build = a 'built' Profile (removes items + logs)  <br>
( Project = a collection of Profiles ) tbc   <br>
<br>
- if wanted: Daily logging trigger has to be added after copying template <br>
- SheetSizeAuditTool must be installed as a library in Apps Script (will be copied with template)  <br>
- user has to allow access <br>
- Invoice inject only works for LCSC and Mouser. <br>
- There are some extra functions for creating profiles, but it is not 100% bug-free yet and might be making it too complicated to use.
</p>




---

### License

<p>Open source, CC with attribution</p>
