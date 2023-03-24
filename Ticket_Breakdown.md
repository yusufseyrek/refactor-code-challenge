# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
---

### Ticket 1: Implement custom ID feature for Facilities

**Description:**
Facilities should be able to save their own custom ID for each Agent they work with. This ID should be used in the reports generated for them.

**Acceptance Criteria:**

- Facilities can save a custom ID for each Agent they work with
- The custom ID is used in the reports generated for the Facility
- The custom ID is displayed in the reports instead of the internal database ID


**Implementation Details:**

- Add a new column to the Agents table to store the custom ID
- Modify the function `getShiftsByFacility` to include the custom ID of the Agent
- Modify the function `generateReport` to use the custom ID instead of the internal database ID


**<em>Effort Estimate: 4-6 hours</em>**

---
### Ticket 2: Update existing reports with custom IDs

**Description:**
Existing reports should be updated to include the custom ID instead of the internal database ID.

**Acceptance Criteria:**

- Existing reports include the custom ID instead of the internal database ID

**Implementation Details:**

- Update the existing PDF templates to include the custom ID
- Modify the function `generateReport` to use the custom ID in the existing PDF templates

**<em>Effort Estimate: 2-4 hours</em>**

---
### Ticket 3: Allow Facilities to edit custom IDs

**Description:**
Facilities should be able to edit the custom ID for each Agent they work with.

**Acceptance Criteria:**

- Facilities can edit the custom ID for each Agent they work with
  
**Implementation Details:**

- Add a new API endpoint for Facilities to edit the custom ID of an Agent
- Modify the function `generateReport` to use the updated custom ID in the reports

**<em>Effort Estimate: 4-6 hours</em>**

---
### Ticket 4: Ensure uniqueness of custom IDs

**Description:**
Custom IDs should be unique for each Agent within a Facility.

**Acceptance Criteria:**

- Facilities cannot save or edit a custom ID that is already in use for another Agent within the Facility

**Implementation Details:**

- Add a uniqueness constraint on the custom ID column of the Agents table
- Modify the API endpoint for editing custom IDs to check for uniqueness before saving changes

**<em>Effort Estimate: 2-4 hours</em>**

---
### Ticket 5: Add custom ID to exportable Shift data

**Description:**
The custom ID should be included in the exportable Shift data.

**Acceptance Criteria:**

- The custom ID is included in the exportable Shift data

**Implementation Details:**

- Modify the function `getShiftsByFacility` to include the custom ID in the exportable Shift data

**<em>Effort Estimate: 2-4 hours</em>**