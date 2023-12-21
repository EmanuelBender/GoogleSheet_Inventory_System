### GoogleSheet Inventory System

#### by eBender

An automatic inventory system for Google Sheets (Apps Script)  
⚠️ WORK IN PROGRESS  
[Instagram](https://www.instagram.com/zen.diy)

---

#### Key Features

- **Fast Keyword Search**
  - The search box can act like a file search, but can also search profiles and other information.

- **Automatic Invoice Import**
  - Supports Mouser & LCSC invoices.

- **Build Profile (PROFILES sheet)**
  - Building a profile means: it subtracts the components from the INVENTORY sheet and shows us a report on profile cost, stats, and success. Then adds the Build to the BUILDS sheet and a Log entry to LOGS.

- **Sidebar: Shopping list / Stats**
  - A button on the nav bar will pull up the shopping list or the sheet stats sidebar.

---

#### Utility Features

- **Stats for the Whole Sheet**
  - Provides total components, items, build profile components, and items with total prices.

- **Console Monitor**
  - Displays information, errors, and progress. Non-interactive.

- **Daily Logging for Sheet Stats**
  - Logged data includes time, type/descriptor, function/area, sources, values changed, and various sheet metrics.

- **Toggle Groups**
  - There are groups on each sheet that can be expanded and closed with either a button on the overview sheet or individually on the inventory, builds, etc. sheet.

---

#### Getting Started

- **Installation**
  - Copy the template Inventory System Sheet into your Google Drive. (>>WIP, will paste here)
  - Enter items into your INVENTORY sheet (all info).

- **Build Profile**
  - Create a profile by adding a header and entering ID and amount of each item on the PROFILES sheet.
  - Find your Profile via the search bar.
  - Click the BUILD PROFILE button and follow prompts.

- **Inject Invoice**
  - Create a folder in Google Drive, enter folder name in Main Functions.js, place invoices inside, and trigger via the Inject Order button.
  - Items have to exist in the INVENTORY sheet with the same ID as on the invoice to work. (Mouser: 'Mouser No:', LCSC: 'LCSC Part Number')
  - Click inject Invoice on OVERVIEW sheet.

- **Shopping List**
  - The list is created according to the following criteria:
    - Shopping list tick box and low inventory amount on each Item row.
  - This is why we need to track our Builds and invoices, to have an accurate and automatic representation of the actual real-world items in our inventory.

- **Everyday Usage**
  - Keeping sheet updated:
    - put new invoices into Folder, trigger
    - use 'Build Profile' when building (for ex. a PCB)
    - remove individual items you use daily from Inventory, when not using 'Build Profile'

---

#### Contributing

- **Guidelines**
  - tbc

---

#### Future

- Auto detect and import Invoices from email

---

#### Disclaimer & Handicaps

- Item = One Item with a unique ID (Mouser or LCSC item no)
- Profile = a collection of Items
- Build = a 'built' Profile
- (Project = a collection of Profiles) tbc
- SheetSizeAuditTool must be installed as a library in Apps Script
- Invoice inject only works for LCSC and Mouser.
- There are some extra functions for creating profiles, but it is not 100% bug-free yet and might be making it too complicated to use.

---

#### License

Open source, CC with attribution
