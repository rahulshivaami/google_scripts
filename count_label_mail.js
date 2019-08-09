/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CountEmail()  //function start
{
  var labels = GmailApp.getUserLabels();
  var sheet = SpreadsheetApp.getActiveSheet(); //initialise sheet in variable
  sheet.clear();
  sheet.appendRow( ['name', 'date', 'count'] ); //append heading row
  for (var i = 0; i < labels.length; i++) {
     var lab = labels[i].getName();
     var label = GmailApp.getUserLabelByName(lab);
     var labelname = label.getName();
     //Logger.log(lab);
     var mails = label.getThreads();     
     var date = new Date();
     sheet.appendRow([labelname,date,mails.length]); //apend normal row
  }
}; //function end

 /* Core code found */
  /*  
  var label = GmailApp.getUserLabelByName("LabelName");
  var labelname = label.getName();
  var mails = label.getThreads();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var date = new Date();
  sheet.appendRow([labelname,date,mails.length]);
  */
function onOpen ()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet ();
 
  var menu = [ 
    {name: "Get email count in label",functionName: "CountEmail"}
  ];  
 
  sheet.addMenu ("Mail Count", menu);    
}