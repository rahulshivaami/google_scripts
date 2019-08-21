/* 
 * To get CC and BCC list out of the the domain.
 * Output : It will display CC and BCC list from each mail if receiver is outside of domain.
 */



function cleanup_filter(){
  var sd = "2018-05-01"; //yyyy-mm-dd
  var ed = "2019-06-28"; //yyyy-mm-dd
  
  var search = " after:" + sd + " before:" + ed;
  Logger.clear();
  
  try {
      var sheet = SpreadsheetApp.getActiveSheet();
      sheet.clear();
      var threads = GmailApp.search(search);
      //Logger.log(threads.length);return false;
      for (var i=0; i<threads.length; i++){
         var messages = GmailApp.getMessagesForThread(threads[i]);
         for (var j=0; j<messages.length; j++){
             var email = messages[j];
             var subject = email.getSubject();
             var toMail = email.getTo();
             var ccMail = email.getCc();
             var bccMail = email.getBcc();
          
             if ((toMail.indexOf("dev.shivaami.in")!== -1)||(ccMail.indexOf("dev.shivaami.in")!== -1)||(bccMail.indexOf("dev.shivaami.in")!== -1)) {
         
             }else{
            
                //Logger.log("To:"+email.getTo()+", CC:"+email.getCc()+", BCC:"+email.getBcc());
                sheet.appendRow(["Subject:"+subject ,"To:"+toMail , "CC:"+ccMail, "BCC:"+bccMail]);
                //Logger.log("To:"+toMail+", CC:"+ccMail+", BCC:"+bccMail);
            
             }
          }
      }
   } catch (e) {}
}
