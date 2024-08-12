$(document).ready(function () {
  // 폼 제출 이벤트 핸들러
  $('#signup-form').on('submit', function (event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 폼 데이터 수집
    var formData = {
      email: $('#email').val(),
      password: $('#password').val(),
      checkPassword: $('#checkPassword').val(),
      nickname: $('#nickname').val()
    };

    // 비밀번호 확인
    if (formData.password !== formData.checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // AJAX 요청
    $.ajax({
      type: 'POST',
      url: '/api/users/signup', // 서버의 회원가입 처리 엔드포인트
      contentType: 'application/json', // JSON 데이터 전송
      data: JSON.stringify(formData),
      success: function (response) {
        alert('회원가입이 완료되었습니다!');
        window.location.href = '/login'; // 회원가입 성공 후 로그인 페이지로 이동
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : '회원가입에 실패했습니다.';
        alert(errorMessage);
      }
    });
  });
});