$(document).ready(function() {
    // URL에서 카테고리 이름 추출
    const urlPath = window.location.pathname;
    const categoryName = urlPath.split('/').pop(); // URL의 마지막 부분 추출

    // 카테고리별 게시물 로드
    if (categoryName) {
        fetchPostsByCategory(categoryName);
    } else {
        console.error('카테고리 이름을 추출할 수 없습니다.');
    }

    // 카테고리별 게시물을 가져오는 함수
    function fetchPostsByCategory(categoryName) {
        $('#loading').show(); // 로딩 메시지 표시

        let url;
        if (categoryName.toUpperCase() === 'RANKING') {
            url = '/api/posts/likes'; // 좋아요 순으로 게시물 조회
        } else {
            url = `/api/posts/category/${categoryName}`; // 카테고리별 게시물 조회
        }

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                $('#loading').hide(); // 로딩 메시지 숨기기
                console.log('서버 응답:', response);
                if (response && response.data && Array.isArray(response.data)) {
                    displayPosts(response.data); // 게시물 표시
                } else {
                    console.error('응답 데이터가 올바르지 않습니다:', response);
                    $('#posts-container').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#loading').hide(); // 로딩 메시지 숨기기
                console.error('게시물 로딩 중 오류 발생:', textStatus, errorThrown);
                $('#posts-container').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
            }
        });
    }

    // 게시물을 페이지에 표시하는 함수
    function displayPosts(posts) {
        var postsContainer = $('#posts-container');
        postsContainer.empty(); // 기존 게시물 초기화

        if (posts.length === 0) {
            postsContainer.html('<p>게시물이 없습니다.</p>');
            return;
        }

        posts.forEach(function(post) {
            var imageUrl = post.imageUrls && post.imageUrls.length > 0
                ? post.imageUrls[0] : 'default-image-url.jpg'; // 기본 이미지 사용

            var postElement = $(`
                <div class="card-box" data-post-id="${post.id}">
                    <div class="image-box">
                        <img src="${imageUrl}" alt="Post Image" class="img-fluid" />
                    </div>
                    <div class="card-detail">
                        <div class="card-header">
                            <div class="nickname">${post.nickname || 'Anonymous'}</div>
                            <div class="like-section" id="like-section-${post.id}">
                                <span class="like-count">Loading likes...</span>
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

            postElement.click(function() {
                var postId = $(this).data('post-id');
                window.location.href = `/posts/postDetail/${postId}`;
            });

            postsContainer.append(postElement);

            fetchLikeCount(post.id);
        });

        postsContainer.imagesLoaded(function() {
            postsContainer.masonry({
                itemSelector: '.card-box',
                columnWidth: '.card-box',
                gutter: 30
            });
        });
    }

    // 좋아요 개수 가져오는 함수
    function fetchLikeCount(postId) {
        $.ajax({
            url: `/api/posts/${postId}/likes/count`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const likeCount = response?.data ?? 0; // 데이터가 없으면 0으로 설정
                $(`#like-section-${postId} .like-count`).text(`${likeCount} likes`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(`Failed to fetch like count for post ID: ${postId}`, textStatus, errorThrown);
                $(`#like-section-${postId} .like-count`).text('Failed to load likes');
            }
        });
    }
});
