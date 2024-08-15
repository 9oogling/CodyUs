// 글자 효과
const container = document.querySelector(".container");

document.body.addEventListener("mousemove", e => {
    const x = e.clientX;
    const y = e.clientY -160;
    gsap.to(container, {
        y: y
    });
    gsap.to(".menu-mask", {
        y: -y
    });
});

$(document).ready(function() {

    const token = getToken();

    if(!token) {
        window.location.href ='/login'
    }
    $('#submitBtn').click(function(e) {
        e.preventDefault(); // 기본 폼 제출 방지

        // 입력 값 가져오기
        const name = $('#userName').val();
        const email = $('#userEmail').val();
        const inquiry = $('#userInquiry').val();

        // 데이터 유효성 검사 (예: 빈 필드 확인)
        const maxLengthName = 50; // 이름 최대 길이
        const maxLengthEmail = 100; // 이메일 최대 길이
        const maxLengthInquiry = 500; // 문의 내용 최대 길이

        if (name.length > maxLengthName) {
            alert(`이름은 ${maxLengthName}자 이하로 입력해 주세요.`);
            return;
        }

        if (email.length > maxLengthEmail) {
            alert(`이메일은 ${maxLengthEmail}자 이하로 입력해 주세요.`);
            return;
        }

        if (inquiry.length > maxLengthInquiry) {
            alert(`문의 내용은 ${maxLengthInquiry}자 이하로 입력해 주세요.`);
            return;
        }

        // AJAX 요청
        $.ajax({
            type: 'POST',
            url: '/api/help', // 요청을 보낼 URL (서버 API)
            contentType: 'application/json',
            headers:{
                'Authorization': token
            },
            data: JSON.stringify({
                name: name,
                email: email,
                question: inquiry
            }),
            success: function(response) {
                // 성공적으로 요청이 완료되었을 때의 처리
                alert('문의가 등록되었습니다.');
                // 폼 초기화
                $('#userName').val('');
                $('#userEmail').val('');
                $('#userInquiry').val('');
            },
            error: function(xhr, status, error) {
                // 요청이 실패했을 때의 처리
                alert('문의 등록에 실패했습니다. 다시 시도해 주세요.');
            }
        });
    });

    $('#cancelBtn').click(function(e) {
        e.preventDefault(); // 기본 폼 제출 방지
        $('#userName').val('');   // 이름 필드 초기화
        $('#userEmail').val('');  // 이메일 필드 초기화
        $('#userInquiry').val(''); // 문의 내용 필드 초기화
    });
});

$(document).ready(function() {
    const maxLength = 500;

    $('#userInquiry').on('input', function() {
        const currentLength = $(this).val().length;
        $('#charCount').text(`${currentLength} / ${maxLength}자`);

        // 글자 수 초과 시, 알림 표시 또는 다른 처리를 할 수 있습니다.
        if (currentLength > maxLength) {
            alert('최대 500자까지 입력할 수 있습니다.');
            $(this).val($(this).val().substring(0, maxLength)); // 최대 길이로 자르기
        }
    });
});
