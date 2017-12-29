// gnb에 커스텀 스크롤
new PerfectScrollbar("#gnb");


// 시간에 따른 사이트 변경
var day = new Date() 
var time = day.getHours() 

var bg = document.body;
var postInfo = document.getElementById("post-info")

var meetusEmoji; 

if (time >= 7 && time < 12) {
	bg.className = "positive";
	meetusEmoji = document.createTextNode("☕");	
	meetusMessage = "커피 한잔 고고고";
} else {
	bg.className = "negative";
	document.getElementById("logo-svg").style.fill="rgb(230,230,230)"; //logo 색 변경
	
	if (typeof(postInfo) != 'undefined' && postInfo != null) {
		document.getElementById("prev-icon").src="../images/left-angle-bracket-light.svg"; //icon 변경
		document.getElementById("next-icon").src="../images/right-angle-bracket-light.svg"; //icon 변경
		document.getElementById("index-icon").src="../images/grid-layout-light.svg"; //icon 변경
		document.getElementById("post-alt-title").style.borderTopColor="rgb(230,230,230)"; //알트헤더 보더 색 변경
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

// post page layout control
if (typeof(postInfo) != 'undefined' && postInfo != null) {
	// 변경할 화면요소 가져오기
	var gnb = document.getElementById("gnb")
	var postTitle = document.getElementById("post-title");
	var altTitle = document.getElementById("post-alt-title");

	var windowWidth = window.innerWidth; //화면넓이 정의
	var visiblePoint = postTitle.offsetTop+40; //알트헤더 등장시점 정의

	// 화면 로딩될 때 시점으로 gnb display 설정
	gnbRemove();
	function gnbRemove() {
		if (windowWidth <= 840) {
			gnb.style.display = "none";	
		} else {
			gnb.style.display = "block";	
		}
	}

	// 스크롤에 따른 알트헤더 등장여부 설정
	window.onscroll = function() {showAltTitle()};
	function showAltTitle() {
		if (window.pageYOffset >= visiblePoint && windowWidth <= 1450) {
			altTitle.style.display = "block";
			altTitle.classList.add("animation-downward");
		} else {
			altTitle.style.display = "none";
			altTitle.classList.remove("animation-downward");
		}
	}

	// 화면 사이즈 변경될 때 레이아웃도 함께 갱신	
	window.onresize = function() {windowResize()}; 
	function windowResize() {
		windowWidth = window.innerWidth;
		visiblePoint = postTitle.offsetTop+40;
		gnbRemove();
		showAltTitle();
	}
}



