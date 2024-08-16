$(document).ready(function () {
  // 페이지 로드 시 기존 토큰 삭제
  console.log("페이지 로드: 기존 토큰 삭제 시도.");
  Cookies.remove('Authorization', { path: '/' });

  // URL에서 "code" 쿼리 파라미터를 가져옵니다. (카카오 로그인 이후 리다이렉트 시)
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  console.log("URL에서 code 파라미터 확인:", code);

  if (code) {
    console.log("카카오 로그인 코드 감지, 서버 처리 중...");
    // 서버에서 이미 처리되었으므로, 추가적인 AJAX 요청은 필요하지 않습니다.
    window.location.href = host + '/home'; // 홈 페이지로 리다이렉트
  }

  // Bearer 추가 및 새 쿠키 설정
  const token = Cookies.get('Authorization');
  console.log("쿠키에서 가져온 Authorization 토큰:", token);  // 디버깅 로그 추가
  if (token) {
    const bearerToken = 'Bearer ' + token;
    Cookies.set('AuthorizationBearer', bearerToken, { path: '/' });
    console.log("AuthorizationBearer 쿠키에 저장:", bearerToken);
  } else {
    console.log("쿠키에서 Authorization 토큰을 찾을 수 없습니다.");
  }
});

// $.ajaxPrefilter를 사용하여 모든 AJAX 요청에 헤더를 추가합니다.
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  const bearerToken = Cookies.get('AuthorizationBearer');
  console.log("AJAX 요청에 Bearer 토큰 추가 시도:", bearerToken);

  if (bearerToken) {
    jqXHR.setRequestHeader('Authorization', bearerToken);
    console.log("Authorization 헤더에 추가된 Bearer 토큰:", bearerToken);
  } else {
    console.log("AuthorizationBearer 쿠키가 존재하지 않습니다.");
  }
});

const host = 'http://' + window.location.host;

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
      // 토큰을 쿠키에 저장합니다.
      Cookies.set('Authorization', token, { path: '/' });
      console.log("Token stored successfully!");

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