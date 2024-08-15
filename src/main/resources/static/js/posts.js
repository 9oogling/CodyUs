let page = 0; // 현재 페이지 번호
const size = 20; // 한 페이지당 불러올 게시물 수
let isLoading = false; // 데이터 로딩 중 여부
let hasMorePosts = true; // 추가 게시물이 있는지 여부

// 게시물을 가져오는 함수
function fetchPosts() {
  if (isLoading || !hasMorePosts) return;

  isLoading = true;
  $('#loading').show(); // 로딩 메시지 표시
  console.log(`게시물 가져오는 중... 현재 페이지: ${page}`);

  $.ajax({
    url: '/api/posts',
    method: 'GET',
    dataType: 'json',
    data: {
      page: page,
      size: size
    },
    success: function (response) {
      $('#loading').hide(); // 로딩 메시지 숨기기
      isLoading = false;

      console.log('서버 응답:', response);

      if (response && response.data && Array.isArray(response.data.content)) {
        // 새로운 게시물만 추가
        displayPosts(response.data.content);

        // 더 이상 게시물이 없는 경우
        if (response.data.content.length < size) {
          hasMorePosts = false;
          console.log('더 이상 불러올 게시물이 없습니다.');
        }

        // 페이지 번호 증가
        page++;

      } else {
        console.error('응답 데이터가 올바르지 않습니다:', response);
        $('#posts-container').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#loading').hide(); // 로딩 메시지 숨기기
      isLoading = false;
      console.error('게시물 로딩 중 오류 발생:', textStatus, errorThrown);
      $('#posts-container').html('<p>게시물 로딩 중 오류가 발생했습니다.</p>');
    }
  });
}

// 게시물을 페이지에 표시하는 함수
function displayPosts(posts) {
  const postsContainer = $('#posts-container');

  // 새로운 게시물만 추가
  posts.forEach(function (post) {
    const imageUrl = post.imageUrls && post.imageUrls.length > 0
        ? post.imageUrls[0] : 'default-image-url.jpg';

    const postElement = $(`
        <div class="card-box" data-post-id="${post.id}">
            <div class="image-box">
                <img src="${imageUrl}" alt="Post Image" class="img-fluid" />
            </div>
            <div class="card-detail">
                <div class="card-header">
                    <div class="nickname">${post.nickname || '익명'}</div>
                    <div class="like-section" id="like-section-${post.id}">
                        <span class="like-count">좋아요 로딩 중...</span>
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
      const postId = $(this).data('post-id');
      window.location.href = `/posts/postDetail/${postId}`;
    });

    // 게시물 컨테이너에 추가
    postsContainer.append(postElement);

    fetchLikeCount(post.id);
  });

  // Masonry 레이아웃 적용
  postsContainer.imagesLoaded(function () {
    postsContainer.masonry('layout'); // 레이아웃을 다시 적용
  });
}

// 좋아요 개수 가져오는 함수
function fetchLikeCount(postId) {
  $.ajax({
    url: `/api/posts/${postId}/likes/count`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      const likeCount = response?.data ?? 0;
      $(`#like-section-${postId} .like-count`).text(`${likeCount} Likes`);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(`게시물 ID: ${postId}의 좋아요 개수 가져오기 실패`, textStatus, errorThrown);
      $(`#like-section-${postId} .like-count`).text('좋아요 로딩 실패');
    }
  });
}

// 페이지 로드 시 게시물 불러오기
$(document).ready(function () {
  fetchPosts();
});

// 스크롤 이벤트 핸들러
function onScroll() {
  const scrollTop = $(window).scrollTop();
  const scrollHeight = $(document).height();
  const windowHeight = $(window).height();

  console.log('스크롤 이벤트 발생.');

  if (scrollTop + windowHeight >= scrollHeight - 50 && hasMorePosts && !isLoading) {
    console.log('페이지 하단에 도달했습니다. 추가 게시물을 불러오는 중...');
    fetchPosts();
  }
}
$(window).on('scroll', onScroll);
