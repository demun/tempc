/**
 * common.js
 * 사이트 전역에 사용되는 스크립트
 *
 */

$(document).ready(function() {

	// 메인메뉴
	showHide('#main-nav','.gnb-bot');

	// quick slider
	$('.bxslider-01').bxSlider({
		auto: true,		// 자동 실행 여부
		pager: false,	// 현재 위치 페이징 표시 여부 설정
		speed: 2000,	// 이동 속도를 설정
	});

	// header slider
	$('.bxslider-02').bxSlider({
		auto: true,		// 자동 실행 여부
		pager: false,	// 현재 위치 페이징 표시 여부 설정
		speed: 2000,	// 이동 속도를 설정
	});


    // sidebar
	showHideClick();
	


});




// 영카트 faq 에 소스에 아이콘 추가되는 부분 추가
$(function() {
    $(".closer_btn").on("click", function() {
        $(this).closest(".con_inner").slideToggle();
    });
});

function faq_open(el) {
    var $con = $(el).closest("li").find(".con_inner");
    var $icon = $(el).find("i");
    var $all = $(el).closest("ol").find("i");

    if ($con.is(":visible")) {
        $con.slideUp();
        $icon.removeClass('fa-angle-up').addClass('fa-angle-down');
        console.log('slideup');
    } else {
        $("#faq_con .con_inner:visible").css("display", "none");
        $all.removeClass('fa-angle-up').addClass('fa-angle-down');
        $icon.removeClass('fa-angle-down').addClass('fa-angle-up');
        console.log('none');

        $con.slideDown(
            function() {
                // 이미지 리사이즈
                $con.viewimageresize2();
            }
        );
    }

    return false;
}
