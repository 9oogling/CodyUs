$(document).ready(function () {
  function loadImagesForTab(tabId) {
    $.ajax({
      url: '/api/posts/category/RANKING',
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        if (response && Array.isArray(response.data)) {
          let postsContainer = tabId === 'style-tab' ? $('#style-content') : $('#product-content');
          postsContainer.empty(); // 기존 게시물 초기화

          response.data.forEach(post => {
            if (post.imageUrls && post.imageUrls.length > 0) {
              var postElement;

              if (tabId === 'style-tab') {
                postElement = $(`
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
                        ${post.hashtags ? post.hashtags.split(',').map(tag => `<span class="hashtag">#${tag.trim()}</span>`).join(' ') : ''}
                      </div>
                    </div>
                  </div>
                `);
                fetchLikeCount(post.id);
              } else if (tabId === 'product-tab') {
                postElement = $(`
                  <div class="product-card-box" data-post-id="${post.id}">
                    <div class="product-image-box">
                      <img src="${post.imageUrls[1]}" alt="Product Image" class="img-fluid" />
                    </div>
                    <div class="product-card-detail">
                      <div class="product-nickname">${post.nickname || 'Anonymous'}</div>
                      <div class="product-content">
                        <p>${post.content || ''}</p>
                      </div>
                      <div class="product-price">
                        <span>${post.price.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                `);
              }

              postElement.click(function () {
                var postId = $(this).data('post-id');
                window.location.href = `/posts/postDetail/${postId}`;
              });

              postsContainer.append(postElement);
            }
          });

          if (tabId === 'style-tab') {
            applyMasonryLayout('#style-content');
          }

        } else {
          console.error('응답 데이터가 올바르지 않습니다:', response);
          postsContainer.html('<p>이미지를 로드하는 중 오류가 발생했습니다.</p>');
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error fetching images:', jqXHR, textStatus, errorThrown);
        let postsContainer = tabId === 'style-tab' ? $('#style-content') : $('#product-content');
        postsContainer.html('<p>이미지를 로드하는 중 오류가 발생했습니다.</p>');
      }
    });
  }

  function applyMasonryLayout(containerSelector) {
    const $container = $(containerSelector);

    $container.imagesLoaded(function () {
      $container.masonry({
        itemSelector: '.card-box',
        columnWidth: '.card-box',
        gutter: 30
      });
    });
  }

  $('.tabs .tab').click(function () {
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');

    if ($(this).attr('id') === 'style-tab') {
      $('#product-content').hide();
      $('#style-content').show();
      loadImagesForTab('style-tab');
    } else if ($(this).attr('id') === 'product-tab') {
      $('#style-content').hide();
      $('#product-content').show();
      loadImagesForTab('product-tab');
    }

  });

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

  loadImagesForTab('style-tab');
});