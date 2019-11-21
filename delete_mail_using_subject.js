/* 
 * To delete mail permanentaly
 * In Resources > Advance Google Services > enable Gmail API
 * Put all subjects in google sheet
 * Output : It will delete mails before 7 days.
 */


function delete_mail_using_subject() {
  
  var mymail = "admin@dev.shivaami.in"; //put user email id
  do {
    var sht = SpreadsheetApp.getActiveSheet();
    var rng = sht.getRange( 1,1, 100,1)
    var rangeArray = rng.getValues();
    //Logger.log(rangeArray);return false;
    for(var i=0;i<rangeArray.length;i++){
      var sub = rangeArray[i];
      var pageToken;
      if(sub!=''){
      var threadList = Gmail.Users.Threads.list('me', {
        q: 'subject:'+ sub,
        pageToken: pageToken
      });
      Logger.log(threadList.threads.length);
      
      if (threadList.threads && threadList.threads.length > 0) {
        threadList.threads.forEach(function(thread) {
          Logger.log('id: %s snippet: %s', thread.id, thread.snippet);
          
          
          Gmail.Users.Threads.remove(mymail, thread.id);
          Logger.log('id: %s snippet: %s REMOVED', thread.id, thread.snippet);
          
          
        });
      }
      
      pageToken = threadList.nextPageToken;
      }
    }
  } while (pageToken);
}