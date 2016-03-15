/**
 * 마우스 오버시 보여주고, 감쳐주는 함수
 * item: 마우스가 올라가고 내려가는 엘리먼트
 * itemShowHide: 보여주고 감쳐주는 엘리먼트
 *
 * 호출
 * showHide('컨테이너 엘리먼트','보이고 감추는 엘리먼트');
 * 
 */


function showHide(showItem, hideItem) {
	var item = $(showItem);
	var itemShowHide = $(hideItem);

	item.on('mouseenter', function() {
		itemShowHide.addClass('on');
	});
	item.on('mouseleave', function() {
		itemShowHide.removeClass('on');
	});
}




