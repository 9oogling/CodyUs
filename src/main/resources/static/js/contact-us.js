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
});
