/* 
 * To fetch records from label and forward to particular mail
 * Output : It will fetch Mails from the label and forward it to user email
 */

function autoForward() {
  Logger.clear();
  var label = 'Files'; //user label
  var recipient = 'rahul.b@shivaami.com'; //user email
  var interval = 5;          //  if the script runs every 5 minutes; change otherwise
  var date = new Date();
  var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
  var threads = GmailApp.search('label:' + label + ' after:' + timeFrom);
  for (var i = 0; i < threads.length; i++) {
    threads[i].getMessages()[0].forward(recipient);  // only the 1st message
  }
}