# Updating the Elite Wrestling weekly schedule

The **Weekly schedule** section of the website reads from a Google Sheet.
Edit the sheet, and the website shows the change the next time someone opens it.
You don't need to touch any code after the one-time setup below.

## One-time setup (about 5 minutes)

1. Go to [sheets.google.com](https://sheets.google.com) and create a blank spreadsheet.
   Name it something like "Elite Weekly Schedule".
2. Choose **File → Import → Upload** and upload `schedule-template.csv` from this folder.
   Pick **Replace current sheet**. You'll get the current schedule, ready to edit.
3. Choose **File → Share → Publish to web**.
   - Under **Link**, choose the sheet tab (usually "Sheet1"), then change "Web page" to **Comma-separated values (.csv)**.
   - Click **Publish** and copy the link it gives you. It ends in `output=csv`.
4. In `index.html`, find this line (search for `SCHEDULE_SHEET_CSV`):

   ```js
   var SCHEDULE_SHEET_CSV = "";
   ```

   Paste the link between the quotes, save, and re-upload the site. This is the only code change ever needed.

## Editing the schedule

One row is one class. Keep the first row (the column names) exactly as it is.

| Column | What to put | Example |
|---|---|---|
| **Day** | Day of the week (`Mon`, `Tuesday`…) **or** a date for a one-time notice (`2026-11-26` or `11/26/2026`) | `Wed` |
| **Start** | Start time | `5:30 PM` |
| **End** | End time (optional) | `6:45 PM` |
| **Class** | Class name as parents should see it | `Future Champs (Beginners)` |
| **Group** | Color tag (optional): `youth`, `hs`, `girls`, `new` (beginners), `group` (small groups), `all`. Leave it blank and the site guesses from the class name. | `new` |
| **Note** | Short extra line (optional) | `Pre-K to 4th grade` |

**Common changes**

- **Move a class:** change its Start/End times.
- **Add a class:** add a new row. The site sorts each day by time.
- **Remove a class:** delete its row.
- **Holiday or closed day:** add a row with the date in **Day** and the message in **Class**, for example `2026-12-24`, blank, blank, `No practice: Christmas Eve`.
  It shows in a red "Heads up" box for 45 days before that date, and disappears once the date has passed.

Changes usually show on the website within a few minutes, because Google refreshes published sheets on its own schedule.

## If something looks wrong

- **The site shows the old built-in schedule:** check that the sheet is still published (File → Share → Publish to web) and that the link in `index.html` ends in `output=csv`.
- **A class is missing:** check that its **Day** is spelled as a weekday and its **Start** time looks like `5:30 PM` or `17:30`.
