/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function get_contact(){
  var contacts = ContactsApp.getContacts();
  var sheet = SpreadsheetApp.getActiveSheet(); //initialise sheet in variable
  sheet.clear();
  sheet.appendRow( ['Name', 'Email', 'Phone'] ); //append heading row
  for(var i=0;i<contacts.length;i++){
     var name = contacts[i].getFullName();
     var emails = contacts[i].getEmails();
     var e = "";
     var p = "";
     for (var j in emails) {
       Logger.log(emails[j].getAddress());
       e = e + emails[j].getAddress() + ", "
     }
     var phones = contacts[i].getPhones(); 
     for (var j in phones) {
       Logger.log(phones[j].getPhoneNumber());
       p = p + phones[j].getPhoneNumber() + ", "
     }
     sheet.appendRow([name,e,p]); //apend normal row
  }
  Logger.log(contacts.length);
}
