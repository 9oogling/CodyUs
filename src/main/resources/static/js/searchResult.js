$(document).ready(function () {
    let currentPage = 1;
    const pageSize = 20; // 한 페이지에 표시할 게시물 수
    let loading = false; // 현재 로딩 중인지 여부를 나타내는 플래그
    let hasMorePosts = true; // 더 로드할 게시물이 있는지 여부

    // URL 쿼리 파라미터에서 검색 키워드와 타입을 가져오기
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword') || '';
    const typeParam = params.get('type') || 'TITLE';
    const type = typeParam.toUpperCase();
    const page = parseInt(params.get('page')) || 1;
    const size = parseInt(params.get('size')) || 10;

    // 검색 입력 필드와 검색 타입 셀렉트 박스의 초기 값을 설정
    $('.search-bar input').val(keyword);
    $('.search-type-select').val(type);

    // 검색 결과를 가져와서 표시
    fetchResults(keyword, type, page, size);

    function fetchResults(searchQuery, searchType, page = 1, size = 10, callback) {
        if (page < 1) {
            page = 1;
        }

        $.ajax({
            url: `/api/posts/search`,
            type: 'GET',
            data: {
                type: searchType,
                keyword: searchQuery,
                page: page,
                size: size,
                sortBy: 'id', // 기본 정렬 필드
                descending: false // 기본 정렬 방향
            },
            success: function (response) {
                $('#loading').hide(); // 로딩 메시지 숨기기
                console.log('서버 응답:', response); // 응답 데이터 확인
                if (response && response.data && Array.isArray(response.data.content)) {
                    console.log('응답이 정상입니다. displayPosts를 호출합니다.');
                    displayPosts(response.data.content);
                    if (callback) callback();
                } else {
                    console.error('응답 데이터가 올바르지 않습니다:', response);
                    $('#search-results').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#loading').hide(); // 로딩 메시지 숨기기
                console.error('게시물 로딩 중 오류 발생:', textStatus, errorThrown);
                $('#search-results').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
            }
        });
    }

    function displayPosts(posts) {
        console.log('displayPosts 함수 호출됨. posts:', posts);

        var postsContainer = $('#style-content');
        if (currentPage === 1) {
            postsContainer.empty(); // 첫 페이지 로드일 때만 기존 게시물 초기화
        }

        if (posts.length === 0 && currentPage === 1) {
            postsContainer.html('<p>표시할 게시물이 없습니다.</p>');
            hasMorePosts = false;
            return;
        }

        posts.forEach(function (post) {
            console.log('현재 처리 중인 게시물:', post);

            if (post.imageUrls && post.imageUrls.length > 0) {
                var postElement = $(`
                  <div class="card-box" data-post-id="${post.id}">
                    <div class="image-box">
                      <img src="${post.imageUrls[0]}" alt="Style Image" class="img-fluid" />
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
            ${post.hashtags ? post.hashtags.split(',').map(tag => {
                    const trimmedTag = tag.trim();
                    return `<span class="hashtag">${trimmedTag.startsWith('#') ? trimmedTag : `#${trimmedTag}`}</span>`;
                }).join(' ') : ''}
                      </div>
                    </div>
                  </div>
                `);

                postElement.click(function () {
                    var postId = $(this).data('post-id');
                    window.location.href = `/posts/postDetail/${postId}`;
                });

                postsContainer.append(postElement);

                // 각 게시물의 좋아요 개수 가져오기
                fetchLikeCount(post.id);
            }
        });
    }

    function fetchLikeCount(postId) {
        $.ajax({
            url: `/api/posts/${postId}/likes/count`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                const likeCount = response?.data ?? 0;
                $(`#like-section-${postId} .like-count`).text(`${likeCount} likes`);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`Failed to fetch like count for post ID: ${postId}`, textStatus, errorThrown);
                $(`#like-section-${postId} .like-count`).text('Failed to load likes');
            }
        });
    }

    // 검색 버튼 클릭 시 검색 수행
    $('.search-bar button').click(function () {
        const searchQuery = $('.search-bar input').val();
        let searchType = $('.search-type-select').val();
        searchType = searchType ? searchType.toUpperCase() : 'TITLE'; // 검색 타입을 대문자로 변환
        window.location.href = `/posts/search?keyword=${encodeURIComponent(searchQuery)}&type=${searchType}&page=1&size=10`;
    });

    // Enter 키 입력 시 검색 수행
    $('.search-bar input').keypress(function (e) {
        if (e.key === 'Enter') {
            const searchQuery = $(this).val();
            let searchType = $('.search-type-select').val();
            searchType = searchType ? searchType.toUpperCase() : 'TITLE'; // 검색 타입을 대문자로 변환
            window.location.href = `/posts/search?keyword=${encodeURIComponent(searchQuery)}&type=${searchType}&page=1&size=10`;
        }
    });

    // URL에서 쿼리 파라미터를 추출하는 함수
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    $(document).ready(function () {
        const searchType = getQueryParam('type');
        if (searchType) {
            $('.search-type-select').val(searchType.toLowerCase());
        }
    });

    // 스크롤 이벤트 처리
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            // 사용자가 페이지의 하단에 가까워지면 다음 페이지 로드
            if (!loading && hasMorePosts) {
                currentPage++;
                fetchResults(keyword, type, currentPage, size);
            }
        }
    });

    // 초기 로드 시 첫 페이지 로드 후 추가 작업 수행
    fetchResults(keyword, type, currentPage, size, function() {
        // 첫 페이지 게시물 로드 후 수행할 작업들
        console.log("게시물 로드 후 수행할 작업");
        // 여기서 추가 로드 작업을 수행할 수 있습니다.
    });
});