/* 
 * To make copy of the file. We can set trigger and take auto backup of the file at requred time
 * Output: It will make a copy the file and store to destination folder
 */


function makeCopy() {
    var folder_id = "XXXXX"; //put destination folder id
    var file_id = "XXXX"; //put file id

// generates the timestamp and stores in variable formattedDate as year-month-date hour-minute-second
    var formattedDate = Utilities.formatDate(new Date(), "IST", "yyyy-MM-dd' 'HH:mm:ss");

// gets the name of the original file and appends the word "copy" followed by the timestamp stored in formattedDate
    var name = SpreadsheetApp.getActiveSpreadsheet().getName() + " Copy " + formattedDate;

// gets the destination folder by their ID. REPLACE xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx with your folder's ID that you can get by opening the folder in Google Drive and checking the URL in the browser's address bar
    var destination = DriveApp.getFolderById(folder_id);

// gets the current Google Sheet file
    var file = DriveApp.getFileById(file_id)

// makes copy of "file" with "name" at the "destination"
    file.makeCopy(name, destination);
}