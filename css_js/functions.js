/**
 * Questo file racchiude le funzioni JavaScript richiamate dalla pagina index
 */

/* Ottiene e visualizza l'orario GMT */
function showUTC(){
var date=new Date()
var hours=date.getUTCHours()
var minutes=date.getUTCMinutes()
var seconds=date.getUTCSeconds()
//var dn="AM"
//if (hours>12){
//dn="PM"
//hours=hours-12
//}
//if (hours==0)
//hours=12
if (minutes<=9)
minutes="0"+minutes
if (seconds<=9)
seconds="0"+seconds
var e = document.getElementById("UTCTime")
e.innerHTML="(GMT) +"+hours+":"+minutes+":"
+seconds
setTimeout("showUTC()",1000)
}
