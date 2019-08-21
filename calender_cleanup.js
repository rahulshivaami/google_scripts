/* 
 * To delete calendar events in particular range
 * Input : Starte date, End Date, Calendar Name
 * Output : It will delete calendar events.
 */


function delete_Events() {
    var start_date = "2019-04-01";   //start date
    var end_date = "2019-04-30";    //end date
    var name = "";  //name of the calender 1. keep name empty for default calendar
    var s_date = new Date(start_date);
    Logger.log(s_date);
    var e_date = new Date(end_date);
    Logger.log(e_date);
    if (name == "") {
        var cal = CalendarApp.getDefaultCalendar();
    } else {
        var cal = CalendarApp.getCalendarsByName(name)[0];
    }
    var events = cal.getEvents(s_date, e_date);

    for (var i = 0; i < events.length; i++) {
        var id = events[i].getId();
        Logger.log("id is " + id);
        events[i].deleteEvent();
    }
    Logger.log('Number of events: ' + events.length); //No of events deleted
}


