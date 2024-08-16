const host = 'http://' + window.location.host;

function getToken() {
  const token = Cookies.get('Authorization');
  if (token) {
    return 'Bearer ' + token;
  }
  return undefined;
}

$(document).ready(function () {

  const auth = getToken();

  if (auth !== undefined && auth !== '') {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('Authorization', auth);
      console.log("Authorization:", auth);
    });
  }

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
  });
});
