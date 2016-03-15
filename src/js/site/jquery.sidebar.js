
/**
 * 버튼을 클릭하면 사이드바가 나오고 들어가는 로직
 * item:  클릭하는 버튼
 * quick: 나오고 들어가는 사이드바
 * wrap: 늘어나고 줄어드는 전체페이지
 * 
 */


function showHideClick() {
	var item = $('#quick-open');
	var quick = $('.quick-wrap');
	var wrap = $('.page-wrap');
	

	item.on('click', function() {
		var value = quick.css('right');

		if ( value === '0px' ) {
			quick.animate({'right': '-190px'}, 500, 'easeInOutCirc');
			wrap.animate({'margin-right': '0'}, 500, 'easeInOutCirc');
		} else {
			quick.animate({'right': '0'}, 500, 'easeInOutCirc');
			wrap.animate({'margin-right': '190px'}, 500, 'easeInOutCirc');
		}
	});
}