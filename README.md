<h1 align="center">GoogleSheet Inventory System</h1>

<p align="center"><em>by Manu</em></p>

<p align="center"><b>WORK IN PROGRESS</b><br>
An automatic inventory system for Google Sheets (Apps Script)</p>

<p align="center">
  Key Features:
</p>

<ul align="center">
  <li><b>Fast Keyword Search:</b><br>
    The search box can act like a file search, but can also search profiles and other information. Almost like the file search on the computer. There is a special mode when a build profile is entered as the search term, it is detected and will show a message in the console, the components in the profile, and make the BUILD PROFILE button active so the selected profile can be built. Building a profile means you can select and 'build' any profile from the profiles sheet, which means the components needed to build it will be subtracted from the inventory list and you get a short report of how expensive the project is, components, and if the build was successful.</li>

  <li><b>Automatic Invoice Import:</b><br>
    Triggered via the Inject Order button. Requirements: a folder has to be created in your Google Drive, and a new Mouser or LCSC invoice has to be downloaded. The store will be automatically detected (Mouser, LCSC).</li>

  <li><b>Build Project (Builds sheet):</b><br>
    Each item has a unique ID and an amount. A build project can easily be created by adding new items by entering the ID and the amount of the item, and all info for that item will be gathered and filled in automatically from the INVENTORY sheet.</li>

  <li><b>Automatic Shopping List:</b><br>
    A button on the nav bar will pull up the shopping list or the sheet stats sidebar.</li>
</ul>

<p align="center">
  Utility Features:
</p>

<ul align="center">
  <li><b>Stats for the Whole Sheet:</b><br>
    Provides stats for total components and items, build profile components and items, with total prices.</li>

  <li><b>Console Monitor:</b><br>
    The console is just a display. Any information, error, or progress of the sheet will be shown in the monitor. I.e., error messages and help messages for importing invoices and other automatic functions.</li>

  <li><b>Daily Logging for Sheet Stats:</b><br>
    Logged data includes time, type/descriptor, function/area, sources, values changed, and various sheet metrics.</li>

  <li><b>Toggle Groups:</b><br>
    There are groups on each sheet that can be expanded and closed with either a button on the overview sheet or individually on the inventory, builds, etc. sheet.</li>
</ul>

<p align="center">
  Getting Started:
</p>

<ul align="center">
  <li><b>Installation:</b><br>
    Copy the template Inventory System Sheet into your Google Drive. With Inventory open, create a new Apps script, create the 4 files, and copy functions inside the corresponding files. Enter items into your inventory sheet. Enter profiles on the build profiles sheet. Start inventoring!</li>

  <li><b>Usage:</b><br>
    Basic instructions on how to use the system.</li>

  <li><b>Configuration:</b><br>
    There are some extra functions for profiles which are a collection of builds, but it is not 100% bug-free yet and might be making it too complicated to use.</li>
</ul>

<p align="center">
  Contributing:
</p>

<ul align="center">
  <li><b>Guidelines:</b><br>
    Not sure, can you help out? What is the usual here? I want only serious people to be allowed to work on it.</li>
</ul>

<p align="center">
  License:<br>
  Open source, CC with attribution
</p>

<p align="center">
  Disclaimer:<br>
  Invoice inject only works for LCSC and Mouser.
</p>
