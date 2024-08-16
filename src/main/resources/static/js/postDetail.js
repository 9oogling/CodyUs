$(document).ready(function () {
    function getToken() {
        return localStorage.getItem('Authorization'); // 쿠키 대신 로컬 스토리지에서 토큰을 가져옵니다.
    }
    const auth = getToken();

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('Authorization', auth);
    });

$(document).ready(function() {
    // URL의 경로에서 ID 가져오기
    const pathSegments = window.location.pathname.split('/');
    const postId = pathSegments[pathSegments.length - 1]; // URL의 마지막 부분을 postId로 사용


    // 게시물 정보 요청
    $.ajax({
        url: `/api/posts/${postId}`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response && response.data) {
                const {title, imageUrls, nickname, content, hashtags, likes, price} = response.data;
                // 서버 응답 데이터 확인 (디버깅 목적)
                console.log('서버 응답 데이터:', response.data);

                // 첫 번째 이미지 URL만 사용
                const imageUrl = imageUrls.length > 0 ? imageUrls[0] : 'default-image-url.jpg'; // 이미지 URL이 없을 경우 기본 이미지 사용

                // 게시물 정보 업데이트
                $('#post-detail').html(`
                        <h1>${title}</h1> <div class="post-username">작성자 : ${nickname}</div>
                    `);
                $('#post-image').html(`
                        <div class="image-container">
                            <img src="${imageUrl}" alt="${title}" class="img-fluid" />
                        </div>
                    `);
                let hashtagsArray = Array.isArray(hashtags) ? hashtags : hashtags.split(',');
                $('#post-caption').html(`
                        <div class="post-header">
                            <div class="post-content" style="display: inline-block; margin-left: 10px;">${content}</div>
                        </div>
                        <div class="post-hashtag">
                        ${hashtagsArray.map(tag => `<span class="hashtag">${tag.trim()}</span>`).join(' ')}
                        </div>
                    `);

                // 두 번째 이미지 URL이 있으면 상품 이미지로 사용
                const productImageUrl = imageUrls.length > 1 ? imageUrls[1] : 'default-image-url.jpg'; // 두 번째 이미지 URL이 없을 경우 기본 이미지 사용

                // 상품 이미지 추가
                $('.product-gallery').html(`
                        <div class="product-item">
                            <img src="${productImageUrl}" alt="상품 이미지" />
                            <div class="product-name">상품 이름</div>
                           <div class="product-price">$${price}</div> <!-- 가격 표시 -->
                        </div>
                    `);

                // 해시태그 클릭 이벤트 추가
                $('.post-hashtag .hashtag').click(function () {
                    const searchType = "HASHTAGS"; // searchType을 HASHTAGS로 고정
                    const hashtagText = $(this).text();
                    window.location.href = `/posts/search?type=${searchType}&keyword=${encodeURIComponent(hashtagText)}&page=1&size=10`;
                });

                //좋아요 수 요청
                $.ajax({
                    url: `/api/posts/${postId}/likes/count`,
                    method: 'GET',
                    dataType: 'json',
                    success: function (likeResponse) {
                        const likeCount = likeResponse?.data ?? '좋아요 수를 불러올 수 없습니다';
                        $('#like-button').html('<img src="/images/whiteHeart.png" alt="white heart">');
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
                        $('#like-button').html(isLiked ? '<img src="/images/redHeart.png" alt="red heart">️' : '<img src="/images/whiteHeart.png" alt="white heart">');
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

    $('#chat-button').on('click', function () {
        // API 호출
        $.ajax({
            url: `/api/posts/${postId}/chattingrooms`,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            success: function(data) {
                console.log('채팅방 생성 API 응답:', data);
                console.log(auth);
                const chatRoomId = data.data.chattingRoomId;
                window.location.href = `/chat?roomId=${chatRoomId}`;
            },
            error: function(xhr, status, error) {
                console.error('API 호출 오류:', error);
                alert('채팅방 생성 중 오류가 발생했습니다.');
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
                $('#like-button').html(isLiked ? '<img src="/images/whiteHeart.png" alt="white heart">' : '<img src="/images/redHeart.png" alt="red heart">');
                $('#like-button').toggleClass('liked', !isLiked);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("오류: " + jqXHR.responseJSON.message)
            }
        });
    });
})
});