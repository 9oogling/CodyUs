$(document).ready(function () {
  // 모달 관련 변수
  var modal = $('#myModal');
  var span = $('.close');

  // 모달 메시지를 설정하고 표시하는 함수
  function showModal(message) {
    $('#modalMessage').text(message);
    modal.show();
  }

  // 닫기 버튼 클릭 시 모달 숨김
  span.click(function () {
    modal.hide();
  });

  // 모달 영역 외 클릭 시 모달 숨김
  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });

  // 탭 전환 처리
  $('.tabs div').click(function () {
    var tab_id = $(this).attr('id');

    $('.tabs div').removeClass('active');
    $('.tab-content > div').removeClass('active');

    $(this).addClass('active');
    $('#content-' + tab_id.split('-')[1]).addClass('active');
  });

  // 이메일 확인 폼 제출 처리
  $('#emailForm').submit(function (event) {
    event.preventDefault();

    const email = $('#emailForm input[type="email"]').val();

    $.ajax({
      url: '/api/users/exists-by-email',
      method: 'GET',
      data: { email: email },
      success: function (response) {
        if (response.data) {
          showModal('이메일이 존재합니다.');
        } else {
          showModal('이메일이 존재하지 않습니다.');
        }
      },
      error: function () {
        showModal('이메일 확인 중 오류가 발생했습니다.');
      }
    });
  });

  // 휴대폰 번호로 이메일 찾기 폼 제출 처리
  $('#phoneForm').submit(function (event) {
    event.preventDefault();

    const phoneNumber = $('#phoneForm input[type="text"]').val();

    $.ajax({
      url: '/api/users/email/find-by-phone',
      method: 'GET',
      data: { phoneNumber: phoneNumber },
      success: function (response) {
        if (response.data && response.data.email) {
          showModal('이메일: ' + response.data.email);
        } else {
          showModal('해당 번호로 등록된 이메일이 없습니다.');
        }
      },
      error: function (xhr) {
        const responseJson = xhr.responseJSON;
        const errorMessage = responseJson && responseJson.message ? responseJson.message : '이메일 찾기 중 오류가 발생했습니다.';
        showModal(errorMessage);
      }
    });
  });
});