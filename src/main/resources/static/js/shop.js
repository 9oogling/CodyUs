const currentPage = {
  TOPS: 1,
  BOTTOMS: 1,
  DRESS: 1,
  FOOTWEAR: 1,
  BAGS: 1,
  HAT: 1,
  SUNGLASSES: 1,
  JEWELRY: 1,
  WATCH: 1,
  WALLETS: 1
};
const totalPagesByCategory = {
  TOPS: 1,
  BOTTOMS: 1,
  DRESS: 1,
  FOOTWEAR: 1,
  BAGS: 1,
  HAT: 1,
  SUNGLASSES: 1,
  JEWELRY: 1,
  WATCH: 1,
  WALLETS: 1
};

const pageSize = 10;

function fetchPostsByCategory(categoryName, page, size, sortBy, descending) {
  $.ajax({
    url: `/api/posts/category/${categoryName}`,
    method: 'GET',
    data: {page: page, size, sort: sortBy, desc: descending},
    dataType: 'json',
    success: function (response) {
      console.log('API Response:', response);
      renderProduct(categoryName, response.data.content);
      totalPagesByCategory[categoryName] = response.data.totalPages; // totalPages 업데이트
      renderPagination(categoryName, response.data.totalPages, page);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error fetching posts:', textStatus, errorThrown);
    }
  });
}

function renderProduct(categoryName, data) {
  const container = $(`#${categoryName}`);
  container.empty();
  data.forEach(product => {
    const productItem = `
            <div class="product-item" data-post-id="${product.id}">
                <img src="${product.imageUrls[1]}" alt="${product.title}" class="product-image" data-post-id="${product.id}" />
                <div class="product-name">${product.title}</div>
                <div class="product-price-likes">
                    <span class="product-price">${product.price.toLocaleString()}원</span>
                    <span class="product-likes" id="like-section-${product.id}">
                        <img src="/images/redHeart.png" alt="likes" class="likes-icon" data-post-id="${product.id}"/>
                        <span class="like-count">Loading likes...</span>
                    </span>
                </div>
                <div class="hashtags">
                    ${product.hashtags ? product.hashtags.split(',').slice(0, 5).map(tag => {
      const trimmedTag = tag.trim();
      return `<span class="hashtag">${trimmedTag.startsWith('#') ? trimmedTag : `#${trimmedTag}`}</span>`;
    }).join(' ') : ''}
                </div>
            </div>
        `;
    container.append(productItem);

    fetchLikeCount(product.id);
  });
  container.find('img').click(function () {
    const postId = $(this).data('post-id');
    handleImageClick(postId);
  });
}

function fetchLikeCount(postId) {
  $.ajax({
    url: `/api/posts/${postId}/likes/count`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      const likeCount = response?.data ?? 0;
      $(`#like-section-${postId} .like-count`).text(`${likeCount}`);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(`Failed to fetch like count for post ID: ${postId}`, textStatus, errorThrown);
      $(`#like-section-${postId} .like-count`).text('Failed to load likes');
    }
  });
}

function handleImageClick(postId) {
  window.location.href = `/posts/postDetail/${postId}`;
}

function renderPagination(categoryName, totalPages, currentPageNumber) {
  const paginationContainer = $(`#${categoryName}-pagination`);
  paginationContainer.empty();

  // Previous button
  const prevButton = $('<button>')
  .html('&#9001')
  .addClass('prev-page')
  .prop('disabled', currentPageNumber === 1)
  .click(function () {
    changePage(categoryName, currentPageNumber - 1);
  });
  paginationContainer.append(prevButton);

  // Page numbers
  const maxPageButtons = 10; // 최대 페이지 버튼 수 설정
  let startPage, endPage;

  if (totalPages <= maxPageButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfMaxPageButtons = Math.floor(maxPageButtons / 2);
    if (currentPageNumber <= halfMaxPageButtons) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPageNumber + halfMaxPageButtons >= totalPages) {
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPageNumber - halfMaxPageButtons;
      endPage = currentPageNumber + halfMaxPageButtons;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = $('<button>')
    .text(i)
    .addClass('page-number')
    .toggleClass('active', i === currentPageNumber)
    .click(function () {
      changePage(categoryName, i);
    });
    paginationContainer.append(pageButton);
  }

  // Next button
  const nextButton = $('<button>')
  .html('&#9002')
  .addClass('next-page')
  .prop('disabled', currentPageNumber === totalPages)
  .click(function () {
    changePage(categoryName, currentPageNumber + 1);
  });
  paginationContainer.append(nextButton);
}

function changePage(categoryName, page) {
  const totalPages = totalPagesByCategory[categoryName];

  if (page >= 1 && page <= totalPages) {
    currentPage[categoryName] = page;
    fetchPostsByCategory(categoryName, page, pageSize, 'createdAt', true); // 서버에는 0 기반 인덱스 전달
  }
}

$(document).ready(function () {
  // 초기 데이터 로드
  fetchPostsByCategory('TOPS', currentPage['TOPS'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('BOTTOMS', currentPage['BOTTOMS'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('DRESS', currentPage['DRESS'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('FOOTWEAR', currentPage['FOOTWEAR'], pageSize,
      'createdAt', true);
  fetchPostsByCategory('BAGS', currentPage['BAGS'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('HAT', currentPage['HAT'], pageSize, 'createdAt', true);
  fetchPostsByCategory('SUNGLASSES', currentPage['SUNGLASSES'], pageSize,
      'createdAt', true);
  fetchPostsByCategory('JEWELRY', currentPage['JEWELRY'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('WATCH', currentPage['WATCH'], pageSize, 'createdAt',
      true);
  fetchPostsByCategory('WALLETS', currentPage['WALLETS'], pageSize, 'createdAt',
      true);
});
