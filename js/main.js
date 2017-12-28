/* gnb에 커스텀 스크롤 */
new PerfectScrollbar("#gnb");


/* 시간에 따른 사이트 변경 */

var day = new Date() 
var time = day.getHours() 

var bg = document.body;
var postInfo = document.getElementById("post-info")

if (time >= 7 && time < 18) {
	bg.className = "positive";
	meetusEmoji = document.createTextNode("☕");	
	meetusMessage = "커피 한잔 고고고";
	if (typeof(postInfo) != 'undefined' && postInfo != null) {
		document.getElementById("prev-icon").src="../images/right-angle-bracket-dark.svg";
		document.getElementById("next-icon").src="../images/left-angle-bracket-dark.svg";
		document.getElementById("index-icon").src="../images/grid-layout-dark.svg";
	}
} else {
	bg.className = "negative";
	meetusEmoji = document.createTextNode("🍺");
	meetusMessage = "역시 저녁에는 맥주입니다";
	if (typeof(postInfo) != 'undefined' && postInfo != null) {
		document.getElementById("prev-icon").src="../images/right-angle-bracket-light.svg";
		document.getElementById("next-icon").src="../images/left-angle-bracket-light.svg";
		document.getElementById("index-icon").src="../images/grid-layout-light.svg";
	}
}


var meetusEmoji;
document.getElementById("meetus").appendChild(meetusEmoji);
function meetus() {
	location.href="../contact";
	alert(meetusMessage);
	//document.getElementById("meetus-message").appendChild();
}