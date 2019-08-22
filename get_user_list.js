/* 
 * To get user list of the domain.
 * Output : It will display user list in sheet.
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
  
}
