/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function check(){
  var start_date = "2019-07-01";
  var end_date = "2019-07-31";
  var s_date = new Date(start_date);Logger.log(s_date);
  var e_date = new Date(end_date); Logger.log(e_date);
  var events = CalendarApp.getDefaultCalendar().getEvents(s_date, e_date);
  
  for (var i=0; i<events.length; i++){
    var id = events[i].getId();
    Logger.log("id is "+id);
    events[i].deleteEvent();
  }
  Logger.log('Number of events: ' + events.length);
}

