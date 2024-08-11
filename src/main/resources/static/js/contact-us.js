// 글자 효과
const container = document.querySelector(".container");

document.body.addEventListener("mousemove", e => {
    const x = e.clientX;
    const y = e.clientY -240;
    gsap.to(container, {
        y: y
    });
    gsap.to(".menu-mask", {
        y: -y
    });
});


// 저장 눌렀을 때 알림
$('.save-btn').click(function () {
    $(this).toggleClass("on")

    alert("문의가 등록되었습니다.")

    // 입력 필드 초기화
    $('input[type="text"]').val('');   // 텍스트 입력 필드 초기화
    $('input[type="email"]').val('');  // 이메일 입력 필드 초기화
    $('textarea').val('');             // 텍스트 영역 초기화
    $('.save-btn').removeClass("on");  // 필요 시 추가된 클래스나 상태 제거
});
