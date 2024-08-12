// 좋아요 눌렀을 때 취소했을 때 알림창 구분
$(document).ready(function () {
    $('.box').click(function () {
        $(this).toggleClass("off");

        if ($(this).hasClass("off")) {
            alert("관심 상품에서 삭제되었습니다.");
        } else {
            alert("관심 상품으로 등록되었습니다.");
        }
    });
});

// 카드 눌렀을 때 페이지 상단으로 이동 X
$('.product').click(function (e) {
    e.preventDefault();  // 기본 동작(페이지 이동) 방지
});