/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
