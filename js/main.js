/* gnb에 커스텀 스크롤 */
new PerfectScrollbar("#gnb");


/* 시간에 따라서 배경 색 바뀌게 */

var day = new Date() 
var time = day.getHours() 
var bg = document.body;

if (time >= 8 && time < 18) {
	bg.className = "positive";	
} else {
	bg.className = "negative";
}