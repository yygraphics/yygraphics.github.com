/* gnb에 커스텀 스크롤 */
new PerfectScrollbar("#gnb");



/*lazy loading*/
/*
var imgEl = document.getElementsByTagName('img');

for (var i=0; i<imgEl.length; i++) {
    if(imgEl[i].getAttribute('src')) {
       imgEl[i].setAttribute('data-src',imgEl[i].getAttribute('src'));
       imgEl[i].removeAttribute('src');
       imgEl[i].classList.add( 'lazyload' );
    }
}


$("img").addClass('lazyload');
$("img").each(function() {
    $(this).attr("data-src",$(this).attr("src"));
    $(this).removeAttr("src");
    console.log($(this)[0].outerHTML);
});*/


/* 화면전환 트렌지션*/
/*
$(document).ready(function() {
	$("a").click (function(event) {
		event.preventDefault();
		var href = $(this).attr("href");
				 
		$.ajax({
			type: "GET",
			url: href,
			dataType: "html",
			success: function(data) {
				var content = $(data).find(".ajax").html();
				console.log(content);
			}
		});
	});
});
*/