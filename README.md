# GoogleSheet Inventory System
by eBender

**WORK IN PROGRESS**

An automatic inventory system for Google Sheets (Apps Script)  

Item = One Item with a unique ID (Mouser or LCSC item no)  
Profile = a collection of Items  
Build = a 'built' Profile  
( Project = a collection of Profiles ) tbc  

---

## Key Features

**Fast Keyword Search**  
The search box can act like a file search, but can also search profiles and other information.  

**Semi-Automatic Invoice Import:**  
Supports Mouser & LCSC invoices.  

**Build Profile (PROFILES sheet):**  
Building a profile means: it subtracts the components from the INVENTORY sheet and shows us a report on profile cost, stats, and success.  
Then adds the Build to the BUILDS sheet and a Log entry to LOGS.  

**Automatic Shopping List:**  
Generated via a button on the nav corner. Almost empty items are detected (enter your low inventory number on item row)  

**Stats:**  
Costs, Amounts, Graphs, etc .. Generated via a button on the nav corner.  

---

## Utility Features

**Stats for the Whole Sheet:**  
Provides total components, items, build profile components, and items with total prices.  

**Console Monitor:**  
Displays information, errors, and progress. Non-interactive.  

**Daily Logging for Sheet Stats:**  
Logged data includes various sheet metrics. Benefits include tracking changes and analyzing trends.  

**Toggle Groups:**  
Groups on each sheet can be expanded or closed via buttons on the overview sheet or individually on the sheet.  

**Misc:**  
Multiples of the same item are possible with unique IDs (for similar items with different stores, qty, or config)  
Feature: build Projects is available but might not be bug-free.  
Feature: Check emails for orders, then import that order/invoice automatically once it has been received. (work in progress)  

---

## Getting Started

**1. Installation:**  
Copy the template Inventory System Sheet into your Google Drive. (>>WIP, will paste here)  
Enter items into your INVENTORY sheet (all info).  

**2. Build Profile:**  
Create a profile by adding a header and entering ID and amount of each item on the PROFILES sheet.  
Find your Profile via the search bar.  
Click the BUILD PROFILE button and follow prompts.  

**3. Inject Invoice:**  
Create a folder in Google Drive, enter folder name in Main Functions.js  
Download invoices as csv ! (LCSC uses exel > solution: import into empty sheet > export as .csv)  
Place invoices inside, and trigger via the Inject Order button.  
Items have to exist in the INVENTORY sheet with the same ID as on the invoice to work.  
(Mouser: 'Mouser No:', LCSC: 'LCSC Part Number')  


**4. Shopping List:**  
The list is created according to the following criteria:  
Shopping list tick box and low inventory amount on each Item row.  
This is why we need to track our Builds and invoices, to have an accurate and automatic representation of the actual real-world items in our inventory.  

Happy inventoring!  

---

## License
- Open source, CC with attribution.

---

## Disclaimer
- Invoice inject only works for LCSC and Mouser.
- SheetSizeAuditTool must be installed (?)
