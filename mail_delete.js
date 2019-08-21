/* 
 * To move mail to trash
 * Output : It will move days of last 7 days in trash.
 */


function cleanup_filter(){
  var d = new Date();
  d.setDate(d.getDate() - 7);
  var start_date = formatDate(d);
  //Logger.log(demo);return false;
  
  var search = " before:" + start_date;
  try {
      
      var threads = GmailApp.search(search);
      //Logger.log(threads.length);return false;
      //var demo = threads.length;
      for (var i=0; i<threads.length; i++){
        var messages = GmailApp.getMessagesForThread(threads[i]);
        for (var j=0; j<messages.length; j++){
          var email = messages[j];
          //Logger.log(email.getDate());
          if (email.getDate() < d) {
            email.moveToTrash();
            Logger.log(email.getDate());
          }
        }
      }
   } catch (e) {}
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}