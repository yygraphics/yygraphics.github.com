var bg = document.body;
var postInfo = document.getElementById("post-info");
var gnb = document.getElementById("gnb");
var postTitle = document.getElementById("post-title");
var altTitle = document.getElementById("post-alt-title");
var naviContainer = document.getElementById("navi-container");
var contentContainer = document.getElementById("content-container");
var indexContainer = document.getElementById("index-container");
var windowWidth = window.innerWidth; // 화면 넓이 정의
var meetusEmoji; // 로고 옆 이모지
var colorMode;  // 사이트 컬러모드 변경
var toggleOn = false;
var toggleIcon = document.getElementById("navi-toggle");
var ps; // 커스텀 스크롤바
var gnbBg = document.getElementById("gnb-bg"); //모바일 gnb 영역 bg
var gnbBgColor; //모바일 gnb 영역 bg의 컬러
var dim; // dim
var dimColor // dim의 컬러
var logo = document.getElementById("logo-svg"); // 로고
var logoColor; // 로고 컬러
var scrollTimer = -1; // 스크롤 되는동안 이펙트
var visiblePoint; // 알트헤더 등장시점

setColorMode(); // 시간에 따른 사이트 컬러 및 구성요소 변경
psToggle(); // gnb 영역 커스텀 스크롤 호출
layoutControler(); // 페이지에 따라 화면 요소 visibility 설정
window.onresize = function() {windowResize()}; // 화면 사이즈 변경될 때 레이아웃도 함께 갱신	
document.ontouchmove = function() {touchMove()}; // 모바일 gnb 열었을 때 body 스크롤 막기
removeIOSRubberEffect(document.querySelector("#gnb")); // 모바일 gnb 스크롤할 때 rubberband effect 없애기
document.getElementById("meetus").appendChild(meetusEmoji); //헤더에 이모지 붙이기

// 시간에 따라 사이트 색 모드 변경
function setColorMode() {
	var day = new Date(); //컬러모드 변경에 필요한 시간 
	var time = day.getHours(); //컬러모드 변경에 필요한 시간 

	if (time >= 7 && time < 18) {
		colorMode = "positive";
		bg.className = colorMode; // bg 색 변경
		logoColor = "rgb(17,17,17)";
		logo.style.fill = logoColor; //logo 색 변경
		meetusEmoji = document.createTextNode("☕");	
		meetusMessage = "커피 한잔 어때요?";
		dimColor = "positive-dim";
		gnbBgColor = "positive"
		toggleIcon.className = "positive-icon";
	} else {
		colorMode = "negative";
		bg.className = colorMode; //bg 색 변경
		logoColor = "rgb(230,230,230)";
		logo.style.fill = logoColor; //logo 색 변경
		
		if (typeof(postInfo) != 'undefined' && postInfo != null) {
			document.getElementById("prev-icon").style.fill="rgb(230,230,230)";
			document.getElementById("next-icon").style.fill="rgb(230,230,230)";
			document.getElementById("index-icon").style.fill="rgb(230,230,230)";
			document.getElementById("post-alt-title").style.borderTopColor="rgb(230,230,230)"; //알트헤더 보더 색 변경
		}
		meetusEmoji = document.createTextNode("🍺");
		meetusMessage = "역시 저녁에는 맥주입니다";
		dimColor = "negative-dim";
		gnbBgColor = "negative";
		toggleIcon.className = "negative-icon";
	}
}

// 화면에 따라 레이아웃이 바뀜
function layoutControler() {
	if (typeof(postInfo) != 'undefined' && postInfo != null) {	
		visiblePoint = postTitle.offsetTop+40; //알트헤더 등장시점 정의
		// 화면 로딩될 때 시점으로 gnb display 설정
		gnbRemove();
		// 스크롤에 따른 알트헤더 등장여부 설정
		window.onscroll = function() {showAltTitle()};	
	}
	else if (typeof(indexContainer) != 'undefined' && indexContainer != null) {
	// brick layer load
	var bricklayer = new Bricklayer(document.querySelector(".bricklayer"));
	// lazyload load
	var bLazy = new Blazy();
	}
}

//포스트 페이지에서 rnb 지우는 함수
function gnbRemove() {
	if (windowWidth <= 840) {
		gnb.style.display = "none";	
	} else {
		gnb.style.display = "block";	
	}
}

// gnb에 커스텀 스크롤 호출 함수
function psToggle() {
	if (windowWidth > 840) {
		if (ps) ps.destroy();
		ps = new PerfectScrollbar("#gnb");
	} else {
		if (ps) ps.destroy();
		ps = null;
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

	//커스텀 스크롤 관련
	psToggle();

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
		gnb.style.overflowY = "hidden"
		bg.style.overflowY = "initial";
		toggleOn = false;
		removeDim();
		removeGnbBg()
		naviContainer.classList.remove("animation-gnbcontent");
		toggleIcon.classList.remove("open");
	} else if (windowWidth <= 840 && toggleOn === false) {
		naviContainer.style.display = "none";
		gnb.style.height = "initial";
		gnb.style.overflowY = "hidden"
		bg.style.overflowY = "initial";
		removeDim();
		removeGnbBg()
		naviContainer.classList.remove("animation-gnbcontent");
		toggleIcon.classList.remove("open");
	}
}

// 모바일에서 네비게이션 토글 열고 닫기
function naviToggle() {
	if (toggleOn === false) {
		addDim();
		addGnbBg();
		gnb.style.height = "100%";
		gnb.style.overflowY = "scroll"
		bg.style.overflowY = "hidden";
		naviContainer.style.display = "block";
		naviContainer.classList.add("animation-gnbcontent");
		toggleIcon.classList.add("open");
		toggleOn = true;
	} else {
		removeDim();
		removeGnbBg();
		gnb.style.height = "initial";
		gnb.style.overflowY = "hidden"
		bg.style.overflowY = "initial";
		naviContainer.style.display = "none";
		naviContainer.classList.remove("animation-gnbcontent");
		toggleIcon.classList.remove("open");
		toggleOn = false;
	}
}

// 네비게이션 토글될 떄 gnb 백그라운드
function addGnbBg() {
	gnbBg.style.display = "block";
	gnbBg.classList.add(gnbBgColor);
	gnbBg.classList.add("animation-rightward");
}

function removeGnbBg() {
	gnbBg.classList.remove(gnbBgColor);
	gnbBg.classList.remove("animation-rightward");
	gnbBg.style.display = "none";
}

// 네비게이션 토글될 때 백그라운드 dim 처리
function addDim() {
	dim = document.createElement("div");
	dim.id = "dim";
	dim.classList.add(dimColor);
	contentContainer.insertBefore(dim, contentContainer.childNodes[0]);
}
function removeDim() {
	if (typeof(dim) != "undefined" && dim != null) {	
		contentContainer.removeChild(dim);
		dim = undefined;
	}
}

// 모바일에서 네비게이션 영역의 스크롤 문제(rubber band) 해결
function touchMove(event) {
	var isTouchMoveAllowed = true, target = event.target;
	while (target !== null) {
		if (target.classList && target.classList.contains("disable-scrolling")) {
			isTouchMoveAllowed = false;
			break;
		}
		target = target.parentNode;
	}
	if (!isTouchMoveAllowed) {
		event.preventDefault();
	}
}

function removeIOSRubberEffect(element) {
	element.addEventListener("touchstart", function () {
		var top = element.scrollTop, totalScroll = element.scrollHeight, currentScroll = top + element.offsetHeight;
		if (top === 0) {
			element.scrollTop = 1;
		} else if (currentScroll === totalScroll) {
			element.scrollTop = top - 1;
		}
	} );
}



/* 스크롤 할 때 텍스트에 이펙트 넣기
window.onscroll = function() {bodyScroll()};

function bodyScroll() {
    //SOMETHING WHEN SCROLL
    bg.classList.add("scroll-effect");
    logo.style.fill = "red";
    
    if (scrollTimer != -1)
	    clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout("scrollFinished()", 500);
}

function scrollFinished() {
    //SOMETHING SCROLL FINISHED
    logo.style.fill = logoColor;
    bg.classList.remove("scroll-effect");
}
*/






Barba.Pjax.start();
