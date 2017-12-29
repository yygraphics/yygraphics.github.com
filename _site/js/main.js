// gnb에 커스텀 스크롤
new PerfectScrollbar("#gnb");


// 시간에 따른 사이트 변경
var day = new Date() 
var time = day.getHours() 

var bg = document.body;
var postInfo = document.getElementById("post-info")

var meetusEmoji; 

if (time >= 7 && time < 18) {
	bg.className = "positive";
	meetusEmoji = document.createTextNode("☕");	
	meetusMessage = "커피 한잔 고고고";
} else {
	document.getElementById("logo-img").src="../images/logo-light.svg"; //logo 변경
	bg.className = "negative";
	if (typeof(postInfo) != 'undefined' && postInfo != null) {
		document.getElementById("prev-icon").src="../images/left-angle-bracket-light.svg"; //icon 변경
		document.getElementById("next-icon").src="../images/right-angle-bracket-light.svg"; //icon 변경
		document.getElementById("index-icon").src="../images/grid-layout-light.svg"; //icon 변경
	}
	meetusEmoji = document.createTextNode("🍺");
	meetusMessage = "역시 저녁에는 맥주입니다";
}

document.getElementById("meetus").appendChild(meetusEmoji);

// meetus emoji 클릭하면 message + redirect to contact
function meetus() {
	location.href="../contact";
	alert(meetusMessage);
}


if (typeof(postInfo) != 'undefined' && postInfo != null) {
	// 화면 폭에 따라 gnb 지우기 
	var windowWidth = window.innerWidth;
	var gnb = document.getElementById("gnb")
	if (windowWidth <= 840) {
		gnb.style.display = "none";	
	} else {
		gnb.style.display = "block";	
	}
	window.onresize = function() {gnbRemove()} 
	function gnbRemove() {
		windowWidth = window.innerWidth;
		if (windowWidth <= 840) {
			gnb.style.display = "none";	
		} else {
			gnb.style.display = "block";	
		}
	}
	// 스크롤에 따른 글 제목 화면에 고정
	var postTitle = document.getElementById("post-title");
	var sticky = postTitle.offsetTop+4;
	window.onscroll = function() {stickyItem()};
	function stickyItem() {
		if (window.pageYOffset >= sticky && windowWidth <= 1450) {
		postTitle.classList.add("sticky");
		} else {
		postTitle.classList.remove("sticky");
		}
	}	
}


