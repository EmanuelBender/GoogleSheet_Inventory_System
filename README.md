# GoogleSheet Inventory System

**WORK IN PROGRESS**

An automatic inventory system for Google Sheets (Apps Script)

## Key Features
- **Fast Keyword Search:**
  - The search box functions like a file search, displaying relevant inventory items.
  - Special mode: When a build profile is entered, it activates the BUILD PROFILE button and provides a report after subtracting components.

- **Automatic Invoice Import:**
  - Supports Mouser & LCSC platforms.
  - Requirements: Create a folder in Google Drive, download invoices, and trigger via the Inject Order button.

- **Build Project (Builds sheet):**
  - Create a project by adding items with unique IDs and amounts from the INVENTORY sheet.
  - Building subtracts components from the inventory with a report on project cost and success.

- **Automatic Shopping List:**
  - Generated via a button on the nav bar or sheet stats sidebar.

## Utility Features
- **Stats for the Whole Sheet:**
  - Provides total components, items, build profile components, and items with total prices.

- **Console Monitor:**
  - Displays information, errors, and progress. Non-interactive.

- **Daily Logging for Sheet Stats:**
  - Logged data includes various sheet metrics. Benefits include tracking changes and analyzing trends.

- **Toggle Groups:**
  - Groups on each sheet can be expanded or closed via buttons on the overview sheet or individually on inventory, builds, etc.

## Getting Started
- **Installation:**
  - Copy the template Inventory System Sheet into your Google Drive.
  - With Inventory open, create a new Apps script and copy functions into corresponding files.
  - Enter items into your inventory sheet.
  - Enter profiles on the build profiles sheet.
  - Start inventoring!

- **Usage:**
  - Basic instructions on how to use the system.

- **Configuration:**
  - Extra functions for profiles are available but might be complex and not bug-free.

## Contributing
- Guidelines for contributing to the project are not specified. Consider clarifying expectations and criteria for contributors.

## License
- Open source, CC with attribution.

## Disclaimer
- Invoice inject only works for LCSC and Mouser.
