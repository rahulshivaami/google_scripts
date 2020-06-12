/* 
 * To delete mail permanentaly
 * In Resources > Advance Google Services > enable Gmail API
 * Output : It will delete mails before 7 days.
 */


function removeMyTest() {
  var mymail = "admin@dev.shivaami.in"; //put user email id
  
  var permanentlyRemoveMyLabel = false;
  var d = new Date();
  d.setDate(d.getDate() - 7); //can change number of days
  var start_date = formatDate(d);
  var pageToken;
  Logger.clear();
  do {
    var threadList = Gmail.Users.Threads.list('me', {
      q: 'before:' + start_date,
      pageToken: pageToken
    });
    //Logger.log(threadList.threads.length);
    if (threadList.threads && threadList.threads.length > 0) {
      threadList.threads.forEach(function(thread) {
        Logger.log('id: %s snippet: %s', thread.id, thread.snippet);
        
       
          Gmail.Users.Threads.remove(mymail, thread.id);
          Logger.log('id: %s snippet: %s REMOVED', thread.id, thread.snippet);
       
        
      });
    }
    pageToken = threadList.nextPageToken;
  } while (pageToken);
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