/* 
 * To count email in particular label.
 * Output: It will display number of emails in the label.
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

//This function will add new menu in menu header bar.
function onOpen ()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet ();
 
  var menu = [ 
    {name: "Get email count in label",functionName: "CountEmail"}
  ];  
 
  sheet.addMenu ("Mail Count", menu);    
}