# GoogleSheet SMD/PCB Inventory System

**by eBender**

A simplified Google Sheets inventory system designed for Surface Mount Device (SMD) and Printed Circuit Board (PCB) projects.

⚠️ Work in Progress - Functional

## Overview  

**Locations**
- **OVERVIEW:** Perform most tasks from here.
- **INVENTORY:** Store all items.
- **PROFILES:** Store all profiles.
- **BUILDS:** Automatically stores built profiles.
- **LOGS:** Record changes and actions; can be triggered.
- **GoogleDrive/invoices_folder**

## Key Features

- **Keyword Search:**
  - Powerful search box for item lookup and mode selection.
  - Custom search algorithm supports multiple partial keywords.

- **Automatic Invoice Import:**
  - Supports Mouser & LCSC invoices as .csv files.
  - Sheet auto-detects store, date, existing items, and adds new items into the sheet.

- **Profiles & Builds:**
  - Profile building subtracts components from INVENTORY, providing a cost, stats, and report.
  - Adds the Build to the BUILDS with a corresponding Log entry in Logs.

- **Editing:**
  - On OVERVIEW, edit any row entry from a current search, instantly updating the INVENTORY.
  - PROFILES only requires entry of Amount and ID, speeding up the profile making process.

- **Sidebar (Shopping list or Stats):**
  - Shopping List: low or marked items.
  - Stats: Statistics and graphs for total items, costs, profiles, builds, ...

## Utility Features

- **Console Monitor:**
  - Displays information, errors, and progress. 
  - color indicators for arm and mode on top left corner of OVERVIEW.

- **Toggle Groups:**
  - Groups on each sheet can be expanded and closed with either a button on the Overview sheet or individually on the Inventory, Builds, etc. sheet.

- **Daily Logging:**
  - Logged data includes time, type/descriptor, function/area, sources, values changed, and various sheet metrics.



## Getting Started / How to:

### Steps:

1. **Copy Sheet & Enter Items:**
   - Copy the [template Inventory Sheet](https://docs.google.com/spreadsheets/d/1COGIPqjvaSmpCLZWWQLtgucSimMKeokUlRZeDGTBkdY) to your Google Drive.
   - Add daily time-driven trigger: Extensions > AppsScript > Add Trigger > logSheetsDaily().
   - Enter your items into your Inventory sheet, including all info. (only once)
   - Create profiles by entering item ID and amount on the Profiles sheet.

2. **Enter Profiles:**
   - Create a profile by adding a header (profile name) and entering only ID and amount of each item on the Profiles sheet.
   - On OVERVIEW enter your Profile name into the search bar to switch to Profile mode.
   - Click the BUILD PROFILE button, follow prompts. Ready to physically assemble your profile using specified components.

3. **Import Invoice Items:**
   - Create a folder in Google Drive > specify invoice folder name in 'Main Functions.gs'.
   - Place invoices inside > trigger via the Inject Order button.
   - Ensure items exist in the Inventory sheet with matching IDs as on the invoice (Mouser: 'Mouser No:', LCSC: 'LCSC Part Number').
   - Click the Inject Order button.

4. **Shopping List:**
   - Generate the list based on item amount, low inventory amount, and shopping tick box criteria.
   - Set shopping tick box and low inventory amount for each item.
   - Click the Shopping List button to view your shopping list.

### Manual Upkeep:

- Put a new invoice into the folder > click inject order.
- Manually remove individual item amounts via search when not using 'Build Profile'.
- Updating profiles.


## Disclaimer & Handicaps

- If wanted: Daily logging trigger has to be added after copying the template.
- SheetSizeAuditTool must be installed as a library in Apps Script (will be copied with the template).
- User has to allow access.
- Invoice inject only works for LCSC and Mouser.
- Some extra functions for creating profiles are not 100% bug-free yet and might be making it too complicated to use.


## DEV

- **Overview Sheet:** Top right corner > DEV overview (global variables, errors, settings).
  - fn:
  - arm: sheet can be disarmed for testing (all volatile actions deactivated).
  - grp: used by code.
  - errors: if cells have errors, they appear here.

- [SheetSizeAuditTool](https://docs.google.com/spreadsheets/d/1myUQEsA9oBNqigG8VdQnsoAnKoohFrl_wG5S7znHjAk/edit?usp=sharing)


## Future

- detect invoice number, log it and check when importing new invoice.
- Auto-detect and import Invoices from email.
- Auto-detect new files in the Invoice folder > auto-convert Excel to CSV.
- Detect more stores (only works with stores that have const product IDs).
- Create PCBway/Aisler/JLCPCB integration > auto-create Profile from PCB manufacturer invoice and/or BOM > auto-build profile.
- Auto-import and sort unknown new items. (from invoice?)
- Data entry helper > new unknown items data entry prompt, multiple items at once > update and sort when done.
- Projects: build a collection of Profiles (some parts already implemented, might take out).


## Contributing

- Guidelines: To be continued...


## License

Private Use. Share-alike with Attribution.
