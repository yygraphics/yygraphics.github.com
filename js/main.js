var day = new Date();
var time = day.getHours();

var bg = document.body;
var postInfo = document.getElementById("post-info");
var gnb = document.getElementById("gnb");
var postTitle = document.getElementById("post-title");
var altTitle = document.getElementById("post-alt-title");
var windowWidth = window.innerWidth;
var meetusEmoji; 
var colorMode;
var naviContainer = document.getElementById("navi-container");
var toggleOn = false;

// 시간에 따른 사이트 컬러 및 구성요소 변경
if (time >= 7 && time < 18) {
	colorMode = "positive";
	bg.className = colorMode;
	meetusEmoji = document.createTextNode("☕");	
	meetusMessage = "커피 한잔 고고고";
} else {
	colorMode = "negative";
	bg.className = colorMode;
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
document.getElementById("meetus").appendChild(meetusEmoji); //헤더에 이모지 붙이기

// gnb에 커스텀 스크롤
new PerfectScrollbar("#gnb");

// 모바일에서 네비게이션 토글 열고 닫기
function naviToggle() {
	if (toggleOn === false) {
		toggleOn = true;
		naviContainer.style.display = "block";
		gnb.style.height = "100%";
		gnb.classList.add(colorMode);
	} else {
		toggleOn = false;
		naviContainer.style.display = "none";
		gnb.style.height = "initial";
		gnb.classList.remove(colorMode);
	}
}

// post page layout control
if (typeof(postInfo) != 'undefined' && postInfo != null) {	
	var visiblePoint = postTitle.offsetTop+40; //알트헤더 등장시점 정의
	// 화면 로딩될 때 시점으로 gnb display 설정
	gnbRemove();
	// 스크롤에 따른 알트헤더 등장여부 설정
	window.onscroll = function() {showAltTitle()};	
}

// 화면 사이즈 변경될 때 레이아웃도 함께 갱신	
window.onresize = function() {windowResize()}; 

//포스트 페이지에서 rnb 지우는 함수
function gnbRemove() {
	if (windowWidth <= 840) {
		gnb.style.display = "none";	
	} else {
		gnb.style.display = "block";	
	}
}

//포스트 페이지 알트 헤더 보이게 만드는 함수
function showAltTitle() {
	if (window.pageYOffset >= visiblePoint && windowWidth <= 1450) {
		altTitle.style.display = "block";
		altTitle.classList.add("animation-downward");
	} else {
		altTitle.style.display = "none";
		altTitle.classList.remove("animation-downward");
	}
}

// meetus emoji 클릭하면 message + redirect to contact 띄우는 함수
function meetus() {
	location.href="../contact";
	alert(meetusMessage);
}

// 화면사이즈 변경되면 레이아웃 갱신하는 함수
function windowResize() {
	windowWidth = window.innerWidth;
	//포스트 페이지의 레이아웃 관련
	if (typeof(postInfo) != 'undefined' && postInfo != null) {	
		visiblePoint = postTitle.offsetTop+40;
		gnbRemove();
		showAltTitle();
	}
	//미디어 쿼리에 따른 gnb-navi 영역 컨트롤
	if (windowWidth > 840) {
		naviContainer.style.display = "block";
		gnb.style.height = "100%";
		toggleOn = false;
	} else if (windowWidth <= 840 && toggleOn === false) {
		naviContainer.style.display = "none";
		gnb.style.height = "initial";
	}
}
