<h1 align="center">GoogleSheet Inventory System</h1>

<p align="center"><em>by eBender</em></p>


<p align="center" font-size="10px">An automated inventory system for Google Sheets (Apps Script)<br>
<b>⚠️ WORK IN PROGRESS</b><br>
<a href="https://www.instagram.com/zen.diy/">Instagram</a><br>
</p>
---

### Key Features

<table>
  <tr>
    <th>Fast Keyword Search</th>
  </tr>
  <tr>
    <td>
The search box can act like a file search, but can also search profiles and other information.
   </td>
  </tr>

  <tr>
    <th>Automatic Invoice Import</th>
  </tr>
  <tr>
    <td> Supports Mouser & LCSC invoices.  </td>
  </tr>

  <tr>
    <th>Build Profile (PROFILES sheet)</th>
  </tr>
  <tr>
    <td>Building a profile means: it subtracts the components from the INVENTORY sheet and shows us a report on profile cost, stats, and success.  
  Then adds the Build to the BUILDS sheet and a Log entry to LOGS.  </td>
  </tr>

  <tr>
    <th>Sidebar: Shopping list / Stats</th>
  </tr>
  <tr>
    <td>A button on the nav bar will pull up the shopping list or the sheet stats sidebar.</td>
  </tr>
</table>

---

### Utility Features

<table>
  <tr>
    <th>Stats for the Whole Sheet</th>
  </tr>
  <tr>
    <td>Provides total components, items, build profile components, and items with total prices.</td>
  </tr>

  <tr>
    <th>Console Monitor</th>
  </tr>
  <tr>
    <td>Displays information, errors, and progress. Non-interactive.  </td>
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
    <td>There are groups on each sheet that can be expanded and closed with either a button on the overview sheet or individually on the inventory, builds, etc. sheet.</td>
  </tr>
</table>

---

### Getting Started

<table>
  <tr>
    <th>Installation</th>
  </tr>
  <tr>
    <td>Copy the template Inventory System Sheet into your Google Drive. (>>WIP, will paste here)  <br>
  Enter items into your INVENTORY sheet (all info).  </td>
  </tr>

  <tr>
    <th>Build Profile</th>
  </tr>
  <tr>
    <td>Create a profile by adding a header and entering ID and amount of each item on the PROFILES sheet.  <br>
  Find your Profile via the search bar.  <br>
  Click the BUILD PROFILE button and follow prompts.  
    </td>
  </tr>

   <th>Inject Invoice</th>
  </tr>
  <tr>
    <td>Create a folder in Google Drive, enter folder name in Main Functions.js, place invoices inside, and trigger via the Inject Order button. <br>  
  Items have to exist in the INVENTORY sheet with the same ID as on the invoice to work. (Mouser: 'Mouser No:', LCSC: 'LCSC Part Number')   <br>
  Click inject Invoice on OVERVIEW sheet.   
    </td>
  </tr>

   <th>Shopping List</th>
  </tr>
  <tr>
    <td>The list is created according to the following criteria:  <br>
  Shopping list tick box and low inventory amount on each Item row.   <br>
  This is why we need to track our Builds and invoices, to have an accurate and automatic representation of the actual real-world items in our inventory.  <br>
    </td>
  </tr>


  <tr>
    <th>Everyday Usage</th>
  </tr>
  <tr>
    <td>Keeping sheet updated:  <br>
        put new invoices into Folder, trigger  <br>
        use 'Build Profile' when building (for ex. a PCB)  <br>
        remove individual items you use daily from Inventory, when not using 'Build Profile'  <br>
    </td>
  </tr>

</table>

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

### Future

<p>
- Auto detect and import Invoices from email  <br>


</p>


---

### Disclaimer & Handicaps

<p>
Item = One Item with a unique ID (Mouser or LCSC item no)   <br>
Profile = a collection of Items   <br>
Build = a 'built' Profile   <br>
( Project = a collection of Profiles ) tbc   <br>
SheetSizeAuditTool must be installed as a library in Apps Script  <br>
Invoice inject only works for LCSC and Mouser. <br>
There are some extra functions for creating profiles, but it is not 100% bug-free yet and might be making it too complicated to use.
</p>

---

### License

<p>Open source, CC with attribution</p>
