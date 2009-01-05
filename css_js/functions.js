/**
 * Questo file racchiude le funzioni JavaScript richiamate dalla pagina index
 */


function addZero(number) {
    if(number<=9)
     return "0"+number
    else
     return number
}

/* Ottiene e visualizza l'orario GMT */
function showUTC(){
    var date=new Date()
    var hours=date.getUTCHours()
    var minutes=date.getUTCMinutes()
    var seconds=date.getUTCSeconds()

    minutes=addZero(minutes)
    seconds=addZero(seconds)
  
    var div = document.getElementById("UTCTime")
    div.innerHTML="(GMT) +"+hours+":"+minutes+":"+seconds
    
    setTimeout("showUTC()",1000)
}

var startHours = 0;
var startMin = 0;
var startSec = 0;
var endHours = 1;
var endMin = 1;
var endSec = 3;

function showStart() {
   
    startSec = startSec + 1
    if (startSec==60){
        startMin = startMin+1
        startSec=0
    }
    if (startMin==60){
       startHours = startHours + 1
       startMin = 0
    }
    var stringSec=addZero(startSec)
    var stringMin=addZero(startMin)
    var stringHours=addZero(startHours)
    
    var start = document.getElementById("startTime")
    start.innerHTML="(SRT) +"+stringHours+":"+stringMin+":"+stringSec
    setTimeout("showStart()",1000)
}

function showEnd(){
    
    endSec = endSec-1
   if (endSec==-1) {
     endSec=59
     endMin = endMin-1
    }
    if (endMin==-1 && endHours>0) {
     endMin= 59
   endHours=endHours-1
    }
   
    var stringSec=addZero(endSec)
    var stringMin=addZero(endMin)
    var stringHours=addZero(endHours)
    
    var end = document.getElementById("endTime")
   end.innerHTML="(END)  -"+stringHours+":"+stringMin+":"+stringSec
    setTimeout("showEnd()",1000)
}


