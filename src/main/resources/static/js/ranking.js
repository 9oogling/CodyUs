$(document).ready(function () {
  function loadImagesForTab(tabId) {
    $.ajax({
      url: '/api/posts/category/RANKING',
      method: 'GET',
      success: function (response) {
        if (response && response.data && response.data.length > 0) {
          let imagesHtml = '';
          response.data.forEach(post => {
            if (post.imageUrls && post.imageUrls.length > 0) {
              if (tabId === 'style-tab') {
                imagesHtml += `<img src="${post.imageUrls[0]}" alt="Style Image">`; // 스타일 이미지 (첫번째 이미지)
              } else if (tabId === 'product-tab' && post.imageUrls.length > 1) {
                imagesHtml += `<img src="${post.imageUrls[1]}" alt="Product Image">`; // 상품 이미지 (두번째 이미지)
              }
            }
          });
          if (tabId === 'style-tab') {
            $('#style-content').html(imagesHtml);
          } else if (tabId === 'product-tab') {
            $('#product-content').html(imagesHtml);
          }
        }
      },
      error: function (error) {
        console.log("Error fetching images:", error);
      }
    });
  }

  // 처음 페이지 로드 시 스타일 탭 이미지를 로드
  loadImagesForTab('style-tab');

  // 탭 클릭 시 컨텐츠 변경
  $('.tabs .tab').click(function () {
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');

    if ($(this).attr('id') === 'style-tab') {
      $('#product-content').hide();
      $('#style-content').show();
      loadImagesForTab('style-tab'); // 스타일 탭에 맞는 이미지 로드
    } else if ($(this).attr('id') === 'product-tab') {
      $('#style-content').hide();
      $('#product-content').show();
      loadImagesForTab('product-tab'); // 상품 탭에 맞는 이미지 로드
    }
  });
});