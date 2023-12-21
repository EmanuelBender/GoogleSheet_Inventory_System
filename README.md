<h1 align="center">GoogleSheet SMD/PCB Inventory System</h1>

<p align="center"><em>by eBender</em></p>


<p align="center" font-size="10px">An automated inventory system for Google Sheets (Apps Script)<br>
<b>⚠️ WORK IN PROGRESS - Functional ⚠️</b><br>
<!-- <a href="https://www.instagram.com/zen.diy/">Instagram</a><br> -->
</p>


<span>
This project is designed with simplicity and minimal maintenance in mind. <br>
The primary goal is to streamline usage, allowing you to interact with it as little as possible. <br>
Once the initial setup is complete, all management tasks are efficiently handled through the Overview sheet.<br>
<br>
I personally employ this system for organizing Surface Mount Device (SMD) items and Printed Circuit Board (PCB) projects,
especially in conjunction with SMD containers. However, the flexibility of the structure 
allows adaptation for various applications beyond this scope.<br>
<br>
Feel free to customize and explore how this project can best serve your organizational needs. <br>
The intention is to provide a hassle-free and adaptable solution for efficient inventory management.
</span>

<br>

<p align="center">
<a href="https://docs.google.com/spreadsheets/d/1COGIPqjvaSmpCLZWWQLtgucSimMKeokUlRZeDGTBkdY">Template Inventory Sheet</a>
</p>

### Key Features

<table>
  <tr>
    <th>Keyword Search</th>
  </tr>
  <tr>
    <td>
       Powerful search box for item lookup, triggering profile mode, and displaying relevant information. <br>
       Custom search algorithm supports multiple partial keywords for comprehensive results. </br>
   </td>
  </tr>

  <tr>
    <th>Automatic Invoice Import</th>
  </tr>
  <tr>
    <td> Supports Mouser & LCSC invoices as .csv files. <br>
         Sheet auto detects store, date, existing items and adds new Items into sheet.  </br>
    </td>
  </tr>

  <tr>
    <th>Profiles & Builds</th>
  </tr>
  <tr>
    <td>Profile building subtracts components from the INVENTORY sheet, providing a cost, stats, and success report.  </br>
        Adds the Build to the BUILDS sheet with a corresponding Log entry in LOGS.   </br>
  </tr>

  <tr>
    <th>Editing</th>
  </tr>
  <tr>
    <td>
      On the OVERVIEW sheet, edit any row entry from a current search, instantly updating the INVENTORY sheet. <br>
      PROFILES sheet requires only Amount and ID, speeding up the editing process. <br>
      New items entered manually once on the INVENTORY sheet can be efficiently updated via builds or invoices.  </br>
   </td>
  </tr>

  <tr>
     <th>Sidebar (Shopping list or Stats)</th>
  </tr>
  <tr>
    <td>Shopping List: low or marked items. <br>
        Stats: Statistics and graphs for total items, costs, profiles, builds, ... </br>
</td>
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
     <th>Toggle Groups</th>
  </tr>
  <tr>
    <td>There are groups on each sheet that can be expanded and closed with either a button on the OVERVIEW sheet or individually on the INVENTORY, BUILDS, etc. sheet.</td>
  </tr>

  <tr>
     <th>Daily Logging</th>
  </tr>
  <tr>
    <td>Logged data includes time, type/descriptor, function/area, sources, values changed, and various sheet metrics.</td>
  </tr>

</table>

<br>

### Getting Started / How to:


<table>
  <tr colspan="3">
      <th colspan="3">1. Copy sheet & enter Items</th>
  </tr>
  <tr>
    <td>Copy the <a href="https://docs.google.com/spreadsheets/d/1COGIPqjvaSmpCLZWWQLtgucSimMKeokUlRZeDGTBkdY">template Inventory Sheet</a> to your Google Drive.    </td>     
    <td>Add dayily time-driven trigger: Extensions -> AppsScript -> Add Trigger -> logSheetsDaily()<br> 
    <td>Enter your items into your INVENTORY sheet incl. all info.
        Create profiles by entering item ID and amount on the PROFILES sheet. </td>
  </tr>

  <tr colspan="3">
      <th colspan="3">2. Enter Profiles</th>
  </tr>
  <tr>
    <td>Create a profile by adding a header (profile name) and entering only ID and amount of each item on the PROFILES sheet.  </td>
    <td>Enter your Profile name via the search bar to switch to Profile mode. </td>
    <td> Click the BUILD PROFILE button, follow prompts, and physically assemble your profile using specified components. </td>
  </tr>

  <tr colspan="3">
     <th colspan="3">3. Import Invoice Items</th>
  </tr>
  <tr>
    <td>Create a folder in Google Drive, specify folder name in 'Main Functions.gs'. Place invoices inside, and trigger via the Inject Order button. </td>  
    <td>Ensure items exist in the INVENTORY sheet with matching IDs as on the invoice (Mouser: 'Mouser No:', LCSC: 'LCSC Part Number').   </td>
    </td>
  </tr>

  <tr colspan="3">
    <th colspan="3">4. Shopping List</th>
  </tr>
  <tr>
    <td>Generate the list based on item amount, low inventory amount, and shopping tick box criteria. </td>  
    <td>Set shopping tick box and low inventory amount for each item.  </td>  
    <td>Click the Shopping List button to view your shopping list. </td>  
  </tr>
</table>

<br>

<table>
  <tr colspan="3">
    <th colspan="3">Manual upkeep</th>
  </tr>
  <tr colspan="3">
    <td>put new invoice into Folder -> click inject order </td>
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
- arm:     sheet can be disarmed for testing ( all volatile actions deactivated ) <br>
- grp:     used by code<br>
- errors:  if cells have errors, they appear here <br>
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
- auto import and sort unknown new items. (from invoice?) <br>
- data entry helper - new unknown items data entry prompt, multiple items at once - update and sort when done

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
