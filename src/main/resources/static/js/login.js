$(document).ready(function () {
  // 페이지 로드 시 기존 토큰 삭제
  console.log("페이지 로드: 기존 토큰 삭제 시도.");
  localStorage.removeItem('Authorization');
  localStorage.removeItem('loginProvider'); // 이전 로그인 제공자 정보도 삭제

  const host = 'http://' + window.location.host;

  // URL에서 "token" 쿼리 파라미터를 가져옵니다.
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    console.log("JWT 토큰 감지, 로컬 스토리지에 저장...");
    localStorage.setItem('Authorization', 'Bearer ' + token);

    // 토큰에서 loginProvider 정보 추출 및 저장
    const payload = parseJwt(token);
    if (payload && payload.loginProvider) {
      localStorage.setItem('loginProvider', payload.loginProvider);
    }

    return;
  }

  // 일반 로그인 처리
  $('#login-form').on('submit', function (event) {
    event.preventDefault();  // 폼 제출 기본 동작 막기

    const email = $('#email').val();
    const password = $('#password').val();

    console.log("일반 로그인 시도:", email, password);

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const loginData = {
      email: email,
      password: password
    };

    $.ajax({
      url: '/api/users/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(loginData)
    })
    .done(function (res, status, xhr) {
      console.log("로그인 성공. 응답 상태:", status);

      const token = xhr.getResponseHeader('Authorization');
      console.log("받은 토큰:", token);

      if (token) {
        // 토큰을 로컬 스토리지에 저장합니다.
        localStorage.setItem('Authorization', token);
        console.log("Token stored successfully!");

        // 토큰에서 loginProvider 정보 추출 및 저장
        const payload = parseJwt(token.split(' ')[1]);
        if (payload && payload.loginProvider) {
          localStorage.setItem('loginProvider', payload.loginProvider);
        }

        alert("로그인에 성공했습니다.");

        // 홈 페이지로 리다이렉션합니다.
        window.location.href = host + '/home';
      } else {
        alert("토큰을 받지 못했습니다.");
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.error("로그인 실패:", textStatus);
      alert("Login Fail");
    });
  });
});

// JWT 토큰의 payload 부분을 파싱하여 loginProvider를 추출
function parseJwt(token) {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("토큰 파싱 중 오류 발생:", e);
    return null;
  }
}