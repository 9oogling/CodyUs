$(document).ready(function () {
  // URL에서 "token" 쿼리 파라미터를 가져옵니다.
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    console.log("JWT 토큰 감지, 로컬 스토리지에 저장...");
    localStorage.setItem('Authorization', 'Bearer ' + token);

    // 홈 페이지로 리다이렉트 (URL 파라미터 제거)
    window.location.href = '/home';
    return;
  }

  const auth = localStorage.getItem('Authorization');
  if (auth) {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('Authorization', auth);
      console.log("Authorization 헤더에 추가:", auth);
    });

    // 사용자 정보를 가져와서 페이지에 반영합니다.
    $.ajax({
      type: 'GET',
      url: `/api/user-info`,
      contentType: 'application/json',
    })
    .done(function (res, status, xhr) {
      const nickname = res.data.nickName;
      const isAdmin = res.data.admin;

      if (!nickname) {
        window.location.href = '/login';
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.error("User info retrieval failed:", textStatus);
      window.location.href = '/login';
    });
  } else {
    console.log("로컬 스토리지에서 Authorization 토큰을 찾을 수 없습니다.");
    window.location.href = '/login'; // 토큰이 없으면 로그인 페이지로 리다이렉트
  }
});