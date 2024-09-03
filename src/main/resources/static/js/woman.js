$(document).ready(function () {
  let currentPage = 1;
  const pageSize = 20; // 한 페이지에 표시할 게시물 수
  let loading = false; // 현재 로딩 중인지 여부를 나타내는 플래그
  let hasMorePosts = true; // 더 로드할 게시물이 있는지 여부

  function loadImages(page) {
    if (loading || !hasMorePosts) return; // 이미 로딩 중이거나 더 로드할 게시물이 없으면 리턴
    loading = true;

    console.log(`Loading page ${page}...`); // 디버깅용 로그

    $.ajax({
      url: `/api/posts/category/WOMAN?page=${page}&size=${pageSize}`,
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        console.log('Server response:', response); // 전체 응답을 로그로 출력
        let postsContainer = $('#style-content');
        if (response && Array.isArray(response.data.content)) {
          if (page === 1) {
            postsContainer.empty(); // 첫 페이지 로드일 때만 기존 게시물 초기화
          }

          if (response.data.content.length === 0 && page === 1) {
            postsContainer.html('<p>표시할 게시물이 없습니다.</p>');
            hasMorePosts = false;
          } else {
            response.data.content.forEach(post => {
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
                          <span class="like-count">${post.likes} Likes</span>
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

                postElement.click(function () {
                  var postId = $(this).data('post-id');
                  window.location.href = `/posts/postDetail/${postId}`;
                });

                postsContainer.append(postElement);
              }
            });

            // 이미지가 모두 로드된 후에 Masonry 레이아웃 적용 및 업데이트
            postsContainer.imagesLoaded(function () {
              postsContainer.masonry({
                itemSelector: '.card-box',
                columnWidth: '.card-box',
                gutter: 30
              });

              // 추가된 아이템들에 대해 레이아웃을 다시 계산
              postsContainer.masonry('reloadItems');
              postsContainer.masonry('layout');
            });

            // 더 이상 로드할 데이터가 없으면 플래그 업데이트
            console.log(`content length: ${response.data.content.length}`);
            console.log(`totalPages: ${response.data.totalPages}`);

            // 현재 페이지가 totalPages보다 작으면 다음 페이지를 로드할 수 있음
            if (currentPage < response.data.totalPages) {
              currentPage++;
            } else {
              console.log('No more posts to load.');
              hasMorePosts = false;
            }
          }
        } else {
          console.error('응답 데이터가 올바르지 않습니다. content 속성:', response.data.content, '전체 응답:', response);
          postsContainer.html('<p>이미지를 로드하는 중 오류가 발생했습니다.</p>');
          hasMorePosts = false;
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error fetching images:', jqXHR, textStatus, errorThrown);
        $('#style-content').html('<p>이미지를 로드하는 중 오류가 발생했습니다.</p>');
        hasMorePosts = false;
      },
      complete: function () {
        loading = false; // 로딩이 끝나면 플래그 해제
        console.log('Loading finished.'); // 디버깅용 로그
      }
    });
  }

  // 스크롤 이벤트 처리
  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      // 사용자가 페이지의 하단에 가까워지면 다음 페이지 로드
      loadImages(currentPage);
    }
  });

  // 초기 로드 시 첫 페이지 로드
  loadImages(currentPage);
});