$(document).ready(function () {
    // 로컬 스토리지에서 토큰 가져오기
    function getToken() {
        return localStorage.getItem('Authorization');
    }

    const auth = getToken();

    // 모든 AJAX 요청에 Authorization 헤더 추가
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (auth) {
            jqXHR.setRequestHeader('Authorization', auth);
        }
    });

    const pageSize = 9; // 페이지당 게시물 수
    let currentPage = 0; // 현재 페이지 번호 (0부터 시작)

    // 페이지 로드 시 좋아요한 게시물 목록을 가져와서 표시
    function fetchPosts(page=0) {
        $.ajax({
            url: `/api/posts/likes/my?page=${page}&size=${pageSize}`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': auth
            },
            success: function (response) {
                console.log("Authorization Header Sent: ", auth);
                const likedPosts = response.data.content;
                const $container = $('#liked-posts-container');
                $container.empty();

                likedPosts.forEach(function (post) {
                    // 첫 번째 이미지 URL만 사용
                    const imageUrl = post.imageUrls && post.imageUrls.length > 0
                        ? post.imageUrls[0] : 'default-image-url.jpg'; // 이미지 URL이 없을 경우 기본 이미지 사용

                    // 게시물 요소 생성
                    const postElement = $(`
                    <div class="card-box" data-post-id="${post.id}" style="cursor: pointer;">
                        <div class="image-box">
                            <img src="${imageUrl}" alt="Post Image" class="img-fluid" />
                        </div>
                        <div class="card-detail">
                            <div class="card-header">
                                <div class="title">${post.title || 'No Title'}</div>
                                <div class="like-section">
                                     <div class="boxList">
                                         <div class="box ${post.liked ? 'off' : ''}" data-post-id="${post.id}"></div>
                                     </div>                                  
                                </div>
                            </div>
                            <div class="content">
                                <p>${post.content || ''}</p>
                            </div>
                            <div class="hashtags">
                                ${post.hashtags ? post.hashtags.split(',').map(tag => `<span class="hashtag">#${tag.trim()}</span>`).join(' ') : ''}
                            </div>
                        </div>
                    </div>
                `);
                    $container.append(postElement);

                    // 게시물 클릭 시 postDetail 페이지로 이동
                    postElement.on('click', function (e) {
                        // 좋아요 버튼을 클릭했을 경우에는 페이지 이동을 방지
                        if ($(e.target).closest('.box').length === 0) {
                            const postId = $(this).data('post-id');
                            window.location.href = `/posts/postDetail/${postId}`;
                        }
                    });
                });
                // 페이지네이션 버튼 업데이트
                currentPage = response.data.number;
                const totalPages = response.data.totalPages;

                $('#current-page').text(currentPage + 1);
                $('#total-pages').text(totalPages);

                $('#prev-page').prop('disabled', currentPage === 0);
                $('#next-page').prop('disabled', currentPage === totalPages - 1);
            },
            error: function (xhr) {
                console.error("Error response: ", xhr);
                alert("관심 상품을 불러오지 못했습니다.");
            }
        });
    }
    // 처음 로드할 때 첫 번째 페이지를 로드
    fetchPosts(currentPage);

    // 이전 페이지 버튼 클릭
    $('#prev-page').on('click', function () {
        if (currentPage > 0) {
            fetchPosts(currentPage - 1);
        }
    });

    // 다음 페이지 버튼 클릭
    $('#next-page').on('click', function () {
        fetchPosts(currentPage + 1);
    });

    // 좋아요 버튼 클릭 이벤트 처리
    $(document).on('click', '.box', function () {
        const $box = $(this);
        const $post = $box.closest('.card-box');
        const postId = $post.data('post-id'); // 게시물 ID

       /* const $likeCount = $box.closest('.like-section').find('.like-count');
        let currentCount = parseInt($likeCount.text(), 10);
*/
        $box.toggleClass("off");

        if ($box.hasClass("off")) {
            // 좋아요 취소
            $.ajax({
                url: `/api/posts/${postId}/likes`,
                type: 'DELETE',
                success: function () {
                    alert("관심 상품에서 삭제되었습니다.");
                    // $likeCount.text(currentCount - 1);
                    // $post.remove(); // 게시물 DOM에서 제거
                    location.reload();  // 페이지 새로고침
                },
                error: function () {
                    alert("좋아요 취소에 실패했습니다.");
                    $box.removeClass("off"); // 실패 시 원상태로 복구
                }
            });
        } else {
            // 좋아요 등록
            $.ajax({
                url: `/api/posts/${postId}/likes`,
                type: 'POST',
                success: function () {
                    alert("관심 상품으로 등록되었습니다.");
                },
                error: function () {
                    alert("좋아요 등록에 실패했습니다.");
                    $box.addClass("off"); // 실패 시 원상태로 복구
                }
            });
        }
    });

    // 카드 클릭 시 페이지 상단으로 이동 방지
    $(document).on('click', '.product', function (e) {
        e.preventDefault();  // 기본 동작(페이지 이동) 방지
    });
});
