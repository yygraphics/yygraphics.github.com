/* gnb에 커스텀 스크롤 */
new PerfectScrollbar("#gnb");



/*lazy loading*/



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