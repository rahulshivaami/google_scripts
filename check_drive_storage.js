/* 
 * To check Drive storage and send mail when limit exceeds 90 percent.
 * Output: System will send a mail to user that Google drive limit is exceeded.
 */


function check_space() {
  var StorageLimit = DriveApp.getStorageLimit();
  Logger.log(StorageLimit);
  var StorageUsed = DriveApp.getStorageUsed();
  Logger.log(StorageUsed);
  var result = (StorageUsed/StorageLimit)*100;
  Logger.log(result);
  if(result > 90){
   GmailApp.sendEmail("rahul.b@shivaami.com", "Google Drive Limit", result); //add email id to whom you want to send a mail.
  }
}
