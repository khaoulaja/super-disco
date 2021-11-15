//var currentTime=13; //test only
var eventArr =[];
var currentTime = moment().hour();
var today = moment().format("dddd, MMMM Do");

//display today's date
$("#currentDay").text(today);

//check time whether it's in the past present or future
var checkTime = function(){
    $(".time-bloc").each( function(index){
        var time =parseInt($(this).attr("data-time"));

        if(time === currentTime){
            $(this).find("textarea").addClass("present");//red
        }
        else if(currentTime <time){
            $(this).find("textarea").addClass("future"); //green
        }
        else if(currentTime > time){
            $(this).find("textarea").addClass("past");//gray
        }
    });
};
//get events from local storage
var loadEvents = function(){
    eventArr = JSON.parse(localStorage.getItem("events"));
     if (!eventArr) {
         eventArr =[];
    }
    
    for (let i = 0; i < eventArr.length; i++) {
     console.log(eventArr[i]);
     var el =".time-bloc[data-time='"+eventArr[i].time+"']";
     var value=eventArr[i].text;
     $(el).find("textarea").val(value);
    }
    console.log(eventArr);
}

loadEvents();
var sortEvents = function(a, b){
        var aTime = a.time;
        var bTime = b.time; 
        return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
      }

var saveEvents = function(){
    localStorage.setItem("events", JSON.stringify(eventArr));
}

$(".saveBtn").on("click",function () { 
    var eventTime = parseInt($(this).closest(".time-bloc").attr("data-time"));
    var eventText = $(this).closest(".time-bloc").find("textarea").val();
    if (!eventArr.find(o => o.time === eventTime)) {

        var event ={
            time: eventTime,
            text: eventText
            }
            eventArr.push(event);
    }
    else{
        for (var i = 0; i < eventArr.length; i++) {
            if (eventArr[i].time === eventTime) {
                console.log("arr:", eventArr[i].time,"el:", eventTime);
                eventArr[i].text = eventText;    
                saveEvents();                    
            }
    }
    }
  eventArr.sort(sortEvents);
 saveEvents();
});

checkTime();
setInterval(function(){
    checkTime();
},5000*60*30);
$("#clear-schedule").on("click",function () {
    localStorage.clear();
    $("textarea").val("");
})