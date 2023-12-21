# GoogleSheet Inventory System
by eBender

**WORK IN PROGRESS**

An automatic inventory system for Google Sheets (Apps Script)  
  
This is how it works: Items are entered into the INVENTORY Sheet with a unique ID.  
This is the heart of the whole sheet.  
You can check status and console messages on the OVERVIEW sheet.  
The search box on the OVERVIEW sheet has multiple functions: Search, Profile Building.  
PROFILES: You can enter a collection of items as a Profile. This profile can then be found  
via the search bar and then be 'Built' via the Build button.  
'Building it' means the components get subtracted from the INVENTORY sheet,  
and we get notified about price, stats or if an item is empty or not found.  
Then the Build is saved on the BUILDS sheet.  
There are more fun features like stats, auto shopping list sidebar, auto invoice import and more.  
  

## Key Features
**Fast Keyword Search**
- The search box can act like a file search, but can also search profiles and other information.  
  
**Automatic Invoice Import:**
- Supports Mouser & LCSC platforms.
- Requirements: Create a folder in Google Drive (path in functions), place invoices inside, and trigger via the Inject Order button.
  
**Build Project (PROJECT sheet):**
- Create a project by adding items with unique IDs and amounts from the INVENTORY sheet.
- find your Profile via the search bar
- click the BUILD PROFILE button and follow prompts
- Building a profile means: it subtracts components from the INVENTORY sheet and shows us a report on project cost, stats and success.  
  
**Automatic Shopping List:**
- Generated via a button on the nav corner.  


  
## Utility Features
Stats for the Whole Sheet:  
Provides total components, items, build profile components, and items with total prices.  
  
**Console Monitor:**
- Displays information, errors, and progress. Non-interactive.
  
**Daily Logging for Sheet Stats:**
- Logged data includes various sheet metrics. Benefits include tracking changes and analyzing trends.
  
**Toggle Groups:**
- Groups on each sheet can be expanded or closed via buttons on the overview sheet or individually on inventory, builds, etc.
  
**Extra Configuration:**
- Extra functions for profiles (a collection of builds) are available but might be not bug-free.

  
  
## Getting Started
Installation:  
Copy the template Inventory System Sheet into your Google Drive.  
Enter items into your inventory sheet.  
Enter profiles on the PROFILES sheet.  
Create Invoice folder and add invoices into it.  
  
Start inventoring!  


## License
- Open source, CC with attribution.

## Disclaimer
- Invoice inject only works for LCSC and Mouser.
