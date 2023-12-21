<h1 align="center">GoogleSheet Inventory System</h1>

<p align="center"><em>by Manu</em></p>

<p align="center"><b>WORK IN PROGRESS</b><br>
An automatic inventory system for Google Sheets (Apps Script)</p>

---

### Key Features

<table align="center">
  <tr>
    <th>Fast Keyword Search</th>
  </tr>
  <tr>
    <td>The search box can act like a file search, but can also search profiles and other information. Almost like the file search on the computer. There is a special mode when a build profile is entered as the search term, it is detected and will show a message in the console, the components in the profile, and make the BUILD PROFILE button active so the selected profile can be built. Building a profile means you can select and 'build' any profile from the profiles sheet, which means the components needed to build it will be subtracted from the inventory list and you get a short report of how expensive the project is, components, and if the build was successful.</td>
  </tr>

  <tr>
    <th>Automatic Invoice Import</th>
  </tr>
  <tr>
    <td>Triggered via the Inject Order button. Requirements: a folder has to be created in your Google Drive, and a new Mouser or LCSC invoice has to be downloaded. The store will be automatically detected (Mouser, LCSC).</td>
  </tr>

  <tr>
    <th>Build Project (Builds sheet)</th>
  </tr>
  <tr>
    <td>Each item has a unique ID and an amount. A build project can easily be created by adding new items by entering the ID and the amount of the item, and all info for that item will be gathered and filled in automatically from the INVENTORY sheet.</td>
  </tr>

  <tr>
    <th>Automatic Shopping List</th>
  </tr>
  <tr>
    <td>A button on the nav bar will pull up the shopping list or the sheet stats sidebar.</td>
  </tr>
</table>

---

### Utility Features

<table align="center">
  <tr>
    <th>Stats for the Whole Sheet</th>
  </tr>
  <tr>
    <td>Provides stats for total components and items, build profile components and items, with total prices.</td>
  </tr>

  <tr>
    <th>Console Monitor</th>
  </tr>
  <tr>
    <td>The console is just a display. Any information, error, or progress of the sheet will be shown in the monitor. I.e., error messages and help messages for importing invoices and other automatic functions.</td>
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

<table align="center">
  <tr>
    <th>Installation</th>
  </tr>
  <tr>
    <td>Copy the template Inventory System Sheet into your Google Drive. With Inventory open, create a new Apps script, create the 4 files, and copy functions inside the corresponding files. Enter items into your inventory sheet. Enter profiles on the build profiles sheet. Start inventoring!</td>
  </tr>

  <tr>
    <th>Usage</th>
  </tr>
  <tr>
    <td>Basic instructions on how to use the system.</td>
  </tr>

  <tr>
    <th>Configuration</th>
  </tr>
  <tr>
    <td>There are some extra functions for profiles which are a collection of builds, but it is not 100% bug-free yet and might be making it too complicated to use.</td>
  </tr>
</table>

---

### Contributing

<table align="center">
  <tr>
    <th>Guidelines</th>
  </tr>
  <tr>
    <td>Not sure, can you help out? What is the usual here? I want only serious people to be allowed to work on it.</td>
  </tr>
</table>

---

### License

<p align="center">Open source, CC with attribution</p>

---

### Disclaimer

<p align="center">Invoice inject only works for LCSC and Mouser.</p>
