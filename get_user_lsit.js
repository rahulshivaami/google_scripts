/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getDomainUsersList() {
  
  var users = [];
  var options = {
    domain: "dev.shivaami.in",     // Google Apps domain name
    customer: "my_customer",
    //maxResults: 100,
    projection: "basic",      // Fetch basic details of users
    viewType: "domain_public",
    orderBy: "email"          // Sort results by users
  }
  
  do {
    var response = AdminDirectory.Users.list(options);
    
    //Logger.log(response);return false;
    response.users.forEach(function(user) {
      users.push([user.name.fullName, user.primaryEmail,user.id]);
      //var profile = GmailApp.Users.getProfile(options);
      Logger.log(user.id);
    });
    //return false;
    // For domains with many users, the results are paged
    if (response.nextPageToken) {
      options.pageToken = response.nextPageToken;
    }
  } while (response.nextPageToken);
  
  // Insert data in a spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheet = ss.getSheetByName("Users") || ss.insertSheet("Users", 1);
  sheet.clear();
  sheet.getRange(1,1,users.length, users[0].length).setValues(users);
  
};

/*function newtest ()
{
  // Get the active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();  
 
  // Label to search
  //var userInputSheet = ss.getSheets()[0];
 
  //var labelName = userInputSheet.getRange("B2").getValue();
 
  // Create / empty the target sheet
  //var sheetName = "Label: " + labelName;
  //var sheet = ss.getSheetByName (sheetName) || ss.insertSheet (sheetName, ss.getSheets().length);
  //sheet.clear();
 
  // Get all messages in a nested array (threads -> messages)
  //var addressesOnly = [];
  //var messageData = [];
 
  //var startIndex = 0;
  //var pageSize = 100;
  //while (1)
  //{
    // Search in pages of 100
   // var threads = GmailApp.search ("to:rahul.b@shivaami.com");
    //Logger.log(threads.length);return false;
    /*
    if (threads.length == 0)
      break;
    else
     // startIndex += pageSize;
 
    // Get all messages for the current batch of threads
    var messages = GmailApp.getMessagesForThreads (threads);
 
    // Loop over all messages
    for (var i = 0; i < messages.length ; i++)
    {
      // Loop over all messages in this thread
      for (var j = 0; j < messages[i].length; j++)
      {
        var mailFrom = messages[i][j].getFrom ();
        var mailDate = messages[i][j].getDate ();
 
        // mailFrom format may be either one of these:
        // name@domain.com
        // any text <name@domain.com>
        // "any text" <name@domain.com>
 
        var name = "";
        var email = "";
        var matches = mailFrom.match (/\s*"?([^"]*)"?\s+<(.+)>/);
        if (matches)
        {
          name = matches[1];
          email = matches[2];
        }
        else
        {
          email = mailFrom;
        }
        // Check if (and where) we have this already
        var index = addressesOnly.indexOf (mailFrom);
        if (index > -1)
        {
          // We already have this address -> remove it (so that the result is ordered by data from new to old)
          addressesOnly.splice(index, 1);
          messageData.splice(index, 1);
        }
 
        // Add the data
        addressesOnly.push (mailFrom);
        messageData.push ([name, email, mailDate]);
      }
    }
  }*/
 
  // Add data to corresponding sheet
 // sheet.getRange (1, 1, messageData.length, 3).setValues (messageData);
//}


/*

function getDomainUsersList() {
  
  var users = [];
  var options = {
    domain: "dev.shivaami.in",     // Google Apps domain name
    customer: "my_customer",
    maxResults: 100,
    projection: "basic",      // Fetch basic details of users
    viewType: "domain_public",
    orderBy: "email"          // Sort results by users
  }
  
  do {
    var response = AdminDirectory.Users.list(options);
    response.users.forEach(function(user) {
      users.push([user.name.fullName, user.primaryEmail]);
      Logger.log(user.primaryEmail);
    });
    return false;
    // For domains with many users, the results are paged
    if (response.nextPageToken) {
      options.pageToken = response.nextPageToken;
    }
  } while (response.nextPageToken);
  
  // Insert data in a spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Users") || ss.insertSheet("Users", 1);
  sheet.getRange(1,1,users.length, users[0].length).setValues(users);
  
};

/*new code
function GetAddresses ()
{
  // Get the active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();  
 
  // Label to search
  var userInputSheet = ss.getSheets()[0];
 
  var labelName = userInputSheet.getRange("B2").getValue();
 
  // Create / empty the target sheet
  var sheetName = "Label: " + labelName;
  var sheet = ss.getSheetByName (sheetName) || ss.insertSheet (sheetName, ss.getSheets().length);
  sheet.clear();
 
  // Get all messages in a nested array (threads -> messages)
  var addressesOnly = [];
  var messageData = [];
 
  var startIndex = 0;
  var pageSize = 100;
  while (1)
  {
    // Search in pages of 100
    var threads = GmailApp.search ("label:" + labelName, startIndex, pageSize);
    if (threads.length == 0)
      break;
    else
      startIndex += pageSize;
 
    // Get all messages for the current batch of threads
    var messages = GmailApp.getMessagesForThreads (threads);
 
    // Loop over all messages
    for (var i = 0; i < messages.length ; i++)
    {
      // Loop over all messages in this thread
      for (var j = 0; j < messages[i].length; j++)
      {
        var mailFrom = messages[i][j].getFrom ();
        var mailDate = messages[i][j].getDate ();
 
        // mailFrom format may be either one of these:
        // name@domain.com
        // any text <name@domain.com>
        // "any text" <name@domain.com>
 
        var name = "";
        var email = "";
        var matches = mailFrom.match (/\s*"?([^"]*)"?\s+<(.+)>/);
        if (matches)
        {
          name = matches[1];
          email = matches[2];
        }
        else
        {
          email = mailFrom;
        }
        // Check if (and where) we have this already
        var index = addressesOnly.indexOf (mailFrom);
        if (index > -1)
        {
          // We already have this address -> remove it (so that the result is ordered by data from new to old)
          addressesOnly.splice(index, 1);
          messageData.splice(index, 1);
        }
 
        // Add the data
        addressesOnly.push (mailFrom);
        messageData.push ([name, email, mailDate]);
      }
    }
  }
 
  // Add data to corresponding sheet
  sheet.getRange (1, 1, messageData.length, 3).setValues (messageData);
}
 
 
//
// Adds a menu to easily call the script
//
function onOpen ()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet ();
 
  var menu = [ 
    {name: "Extract email addresses",functionName: "GetAddresses"}
  ];  
 
  sheet.addMenu ("HK Scripts", menu);    
}*/
