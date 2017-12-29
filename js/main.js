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
	var windowWidth = window.innerWidth;
	var gnb = document.getElementById("gnb")
	var postTitle = document.getElementById("post-title");
	var sticky = postTitle.offsetTop+4;

	window.onresize = function() {headerRemove()};
	window.onscroll = function() {stickyItem()};

	// 스크린 크기에 따라 헤더 없애기
	function headerRemove() {
		windowWidth = window.innerWidth;
		console.log(windowWidth);
		if (windowWidth <= 840) {
			gnb.style.display = "none";	
		} else {
			gnb.style.display = "block";	
		}
	}

	// 글 제목 화면에 고정
	function stickyItem() {
		if (window.pageYOffset >= sticky && windowWidth <= 1450) {
		postTitle.classList.add("sticky");
		} else {
		postTitle.classList.remove("sticky");
		}
	}
}


