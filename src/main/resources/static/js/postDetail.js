$(document).ready(function () {
  function getToken() {
    return localStorage.getItem('Authorization'); // 쿠키 대신 로컬 스토리지에서 토큰을 가져옵니다.
  }

  const auth = getToken();

  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    jqXHR.setRequestHeader('Authorization', auth);
  });

  // URL의 경로에서 ID 가져오기
  const pathSegments = window.location.pathname.split('/');
  const postId = pathSegments[pathSegments.length - 1]; // URL의 마지막 부분을 postId로 사용

  // 점 3개 메뉴 클릭 시 수정/삭제 메뉴 표시/숨기기
  $('#options-button').on('click', function (event) {
    event.stopPropagation(); // 이벤트 전파 방지
    $('#options-menu').toggle(); // 수정/삭제 메뉴 표시/숨기기
  });

  // 외부를 클릭하면 메뉴 숨기기
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.post-options').length) {
      $('#options-menu').hide();
    }
  });

  // 게시물 정보 요청
  $.ajax({
    url: `/api/posts/${postId}`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      if (response && response.data) {
        const {
          title,
          imageUrls,
          nickname,
          content,
          hashtags,
          likes,
          price
        } = response.data;
        // 서버 응답 데이터 확인 (디버깅 목적)
        console.log('서버 응답 데이터:', response.data);

        // 첫 번째 이미지 URL만 사용
        const imageUrl = imageUrls.length > 0 ? imageUrls[0]
            : 'default-image-url.jpg'; // 이미지 URL이 없을 경우 기본 이미지 사용

        // 게시물 정보 업데이트
        $('#post-detail').html(`
                        <h1>${title}</h1> <div class="post-username">작성자 : ${nickname}</div>
                    `);
        $('#post-image').html(`
                        <div class="image-container">
                            <img src="${imageUrl}" alt="${title}" class="img-fluid" />
                        </div>
                    `);
        let hashtagsArray = Array.isArray(hashtags) ? hashtags
            : hashtags.split(',');
        $('#post-caption').html(`
                        <div class="post-header">
                            <div class="post-content" style="display: inline-block; margin-left: 10px;">${content}</div>
                        </div>
                        <div class="post-hashtag">
    ${hashtagsArray.map(tag => {
          const trimmedTag = tag.trim();
          return `<span class="hashtag">${trimmedTag.startsWith('#')
              ? trimmedTag : `#${trimmedTag}`}</span>`;
        }).join(' ')}
    </div>
                    `);

        // 두 번째 이미지 URL이 있으면 상품 이미지로 사용
        const productImageUrl = imageUrls.length > 1 ? imageUrls[1]
            : 'default-image-url.jpg'; // 두 번째 이미지 URL이 없을 경우 기본 이미지 사용

        // 상품 이미지 추가
        $('.product-gallery').html(`
                        <div class="product-item">
                            <img src="${productImageUrl}" alt="상품 이미지" />
                            <div class="product-name">상품 이름</div>
                           <div class="product-price">${price}원</div> <!-- 가격 표시 -->
                        </div>
                    `);

        // 해시태그 클릭 이벤트 추가
        $('.post-hashtag .hashtag').click(function () {
          const searchType = "HASHTAGS"; // searchType을 HASHTAGS로 고정
          const hashtagText = $(this).text();
          window.location.href = `/posts/search?type=${searchType}&keyword=${encodeURIComponent(
              hashtagText)}&page=1&size=10`;
        });

        //좋아요 수 요청
        $.ajax({
          url: `/api/posts/${postId}/likes/count`,
          method: 'GET',
          dataType: 'json',
          success: function (likeResponse) {
            const likeCount = likeResponse?.data ?? '좋아요 수를 불러올 수 없습니다';
            $('#like-button').html(
                '<img src="/images/whiteHeart.png" alt="white heart">');
            $('#post-likes').text(`${likeCount}`);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $('#post-likes').text('좋아요 수 조회 중 오류 발생.');
            console.error('좋아요 수 조회 중 오류 발생:', textStatus, errorThrown);
          }
        });

        // 사용자 좋아요 상태 요청
        $.ajax({
          url: `/api/posts/${postId}/likes/status`,
          method: 'GET',
          dataType: 'json',
          success: function (statusResponse) {
            const isLiked = statusResponse?.data ?? false;
            $('#like-button').html(
                isLiked ? '<img src="/images/redHeart.png" alt="red heart">️'
                    : '<img src="/images/whiteHeart.png" alt="white heart">');
            $('#like-button').toggleClass('liked', isLiked);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('좋아요 상태 조회 중 오류가 발생했습니다.', textStatus, errorThrown);
          }
        });
      } else {
        $('#post-detail').html('<p>게시물 정보 로딩 중 오류가 발생했습니다.</p>');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#post-detail').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
      console.error('게시물 로딩 중 오류가 발생했습니다.', textStatus, errorThrown);
    }
  });

  // 수정 버튼 클릭 이벤트
  $('#edit-option').on('click', function () {
    // 게시물 ID를 URL 파라미터로 전달하기 위해 문자열로 변환
    const postId = window.location.pathname.split('/').pop();
    console.log('Extracted postId:', postId); // postId 확인
    window.location.href = `/posts/postUpdate/${postId}`;
  });

  // 삭제 버튼 클릭 이벤트
  $('#delete-option').on('click', function () {
    if (!confirm('게시물을 삭제하시겠습니까?')) {
      return;
    }

    // 게시물 삭제 API 호출
    $.ajax({
      url: `/api/posts/${postId}`,
      method: 'DELETE',
      headers: {
        'Authorization': auth,
      },
      success: function () {
        alert('게시물이 삭제되었습니다.');
        window.location.href = '/posts'; // 삭제 후 게시물 목록으로 이동
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert('게시물 삭제 중 오류가 발생했습니다.');
        console.error('삭제 오류:', textStatus, errorThrown);
        console.error('서버 응답:', jqXHR.responseText); // 서버에서 반환한 응답 내용 출력
      }
    });
  });

  $('#chat-button').on('click', function () {
    if(!auth) {
      alert('로그인 페이지 이동합니다.');
      window.location.href="/login";
      return;
    }
    // API 호출
    $.ajax({
      url: `/api/posts/${postId}/chattingrooms`,
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      success: function (data) {
        console.log('채팅방 생성 API 응답:', data);
        console.log(auth);
        const chatRoomId = data.data.chattingRoomId;
        window.location.href = `/chat?roomId=${chatRoomId}`;
      },
      error: function (xhr, status, error) {
        let errorMessage = '채팅방 생성 중 오류가 발생했습니다.';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          const serverMessage = xhr.responseJSON.message;
          if (serverMessage === '게시물 작성자와 사용자가 동일합니다.') {
            errorMessage = '게시물 작성자와 사용자가 동일합니다.';
          } else if (serverMessage.includes('이미 채팅방이 존재합니다.')) {
            const parts = serverMessage.split(' ');
            const chatRoomId = parts[0]; // ID 부분 추출
            alert(`채팅방이 존재합니다. 채팅방으로 이동합니다.`);
            window.location.href = `/chat?roomId=${chatRoomId}`; // 채팅방 ID를 포함하여 리다이렉트
            return;
          }
        }
        alert(errorMessage);
      }
    });
  });

  // 좋아요 버튼 클릭 처리
  $('#like-button').click(function () {
    const isLiked = $(this).hasClass('liked');
    $.ajax({
      url: `/api/posts/${postId}/likes`,
      method: isLiked ? 'DELETE' : 'POST',
      success: function () {
        let currentLikesText = $('#post-likes').text();
        let likes = parseInt(currentLikesText.split(' ')[0], 10) || 0;
        $('#post-likes').text(`${likes + (isLiked ? -1 : 1)} `);
        $('#like-button').html(
            isLiked ? '<img src="/images/whiteHeart.png" alt="white heart">'
                : '<img src="/images/redHeart.png" alt="red heart">');
        $('#like-button').toggleClass('liked', !isLiked);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("오류: " + jqXHR.responseJSON.message)
      }
    });
  });
});