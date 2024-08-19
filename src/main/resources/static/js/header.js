let headerAuth;
let headerStompClient = null;
let userEmail = null;
let unReadCount = 0;
$(document).ready(function() {
  // 페이지 로드 시 검색창 텍스트 초기화

    const inputField = $('.search input');
  inputField.val(''); // 페이지 로드 시 입력된 텍스트를 지움

  // 페이지가 뒤로 가기로 돌아왔을 때 검색 텍스트 초기화
  window.onpageshow = function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
      inputField.val(''); // 뒤로 가기 시 텍스트 초기화
    }
  };

  const token = localStorage.getItem('Authorization');  // 쿠키에서 로컬 스토리지로 변경
    // 로그인 상태에 따라 링크 텍스트 및 기능 설정
  if (token) {
    $('#login-logout-link').text('로그아웃').attr('onclick', 'logout()');
  } else {
    $('#login-logout-link').text('로그인').attr('onclick', "location.href='login-page'");
  }

  // 로그아웃 함수
  window.logout = function() {
    localStorage.removeItem('Authorization');  // 쿠키에서 로컬 스토리지로 변경
    alert('로그아웃 되었습니다.');
    location.href = '/home';
  };

  // 검색 기능
  function performSearch() {
    const searchQuery = $('.search input').val().trim();
    let searchType = $('.search-options select').val().toUpperCase() || 'TITLE';

    if (searchQuery === '') {
      alert('검색어를 입력해 주세요.');
      return;
    }

    window.location.href = `/posts/search?type=${searchType}&keyword=${encodeURIComponent(searchQuery)}&page=1&size=10`;
  }

  // 돋보기를 클릭했을 때 검색창이 확장되고 돋보기는 사라지도록 설정
  $('.search input, .search-icon').click(function(event) {
    event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
    const inputField = $('.search input');
    const searchSvg = $('.search input + div svg');

    inputField.addClass('expanded');
    searchSvg.css('opacity', '1'); // 돋보기를 클릭했을 때 선이 보이도록 설정
  });

  // 페이지 외 다른 부분 클릭 시 검색창 및 돋보기 아이콘 상태 복원
  $(document).click(function(event) {
    const inputField = $('.search input');
    const searchSvg = $('.search input + div svg');

    // 클릭한 요소가 검색창이나 드롭다운 메뉴가 아닐 때 검색창을 닫음
    if (!$(event.target).closest('.all-search').length) {
      inputField.removeClass('expanded');
      inputField.val(''); // 입력된 텍스트를 지움
      searchSvg.css('opacity', '1'); // 검색창을 닫을 때 돋보기가 다시 나타나도록 설정
    }
  });

  // 텍스트 입력 시 선이 계속 보이도록 설정
  $('.search input').on('input', function() {
    const searchSvg = $('.search input + div svg');
    searchSvg.css('opacity', '1');
  });

  // 검색 버튼 클릭 및 Enter 키 입력 시 검색 수행
  $('.search-bar button').click(performSearch);
  $('.search input').keypress(function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // 페이지 변경 시 URL 업데이트 함수
  function changePage(newPage) {
    const searchQuery = $('.search input').val().trim();
    let searchType = $('.search-options select').val().toUpperCase() || 'TITLE';
    window.location.href = `/posts/search?keyword=${encodeURIComponent(searchQuery)}&type=${searchType}&page=${newPage}&size=10`;
  }

  // 메인 카테고리 링크에 호버 효과 추가
  $('.main-categories a').hover(
      function() {
        $(this).css('color', '#4CAF50');
      },
      function() {
        $(this).css('color', '#333');
      }
  );

  // 왼쪽 메뉴바 토글
  $('#toggle').click(function(event) {
    event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
    $('#toggle .bar').toggleClass('animate');
    $('#page').toggleClass('overlay');
  });

  // 오버레이의 nav 외부를 클릭했을 때 토글 닫기
  $('#overlay').click(function(event) {
    if (!$(event.target).closest('nav').length) {
      $('#toggle .bar').removeClass('animate');
      $('#page').removeClass('overlay');
    }
  });

});

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadLibraries(callback) {
  let loadedCount = 0;
  const scripts = [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js', name: 'SockJS' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js', name: 'Stomp' }
  ];

  function onLoad() {
    loadedCount++;
    if (loadedCount === scripts.length) {
      callback();
    }
  }

  for (const script of scripts) {
    loadScript(script.src, onLoad);
  }
}

window.onload = function () {
  loadLibraries(function() {
    const url = new URL(window.location.href);
    headerAuth =  localStorage.getItem('Authorization');
    if (!headerAuth || headerStompClient || url.pathname === '/chat') {
      return;
    }
    userInfo(headerAuth);
    UnReadChatCount();
    const socket = new SockJS('/chatting', null, { transports: ["websocket", "xhr-streaming", "xhr-polling"] });
    headerStompClient = Stomp.over(socket);

    let headers = { Authorization: headerAuth };

    headerStompClient.connect(headers, (frame) => {
      headerStompClient.subscribe('/topic/user/' + userEmail, (message) => {
        const msg = JSON.parse(message.body);
        if (msg.message) {
          unReadCount++;
          updateUnReadChatCount(unReadCount);
        }
      });
    }, (error) => {
      console.error("소켓 연결 에러", error);
    });
  });
}

function UnReadChatCount() {
    if(!headerAuth) {
        return;
    }
    fetch('/api/chat/unreadcount', {
      method: 'GET',
      headers: {
        'Authorization': headerAuth
      }
    })
        .then(response => {
          if (!response.ok) {
            throw new Error("unread Network Error");
          }
          return response.json();
        })
        .then(data => {
          updateUnReadChatCount(data.data.unReadCount);
        })
        .catch(error => console.error('Error unread chat count', error));
  }

  function userInfo(headerAuth) {
  fetch('/api/user-info', {
    method: 'GET',
    headers: {
      'Authorization': headerAuth
    }
  })
      .then(response => {
        if(!response.ok) {
          throw new Error("user info Error");
        }
        return response.json();
      })
      .then(data => {
        userEmail = data.data.username;
      })
      .catch(error => console.error('Error userInfo'));
}

function updateUnReadChatCount(count) {
    unReadCount = count;
    const unreadCountElement = document.getElementById('unread-count');

    if (unReadCount > 0) {
      unreadCountElement.textContent = `${unReadCount}`;
      unreadCountElement.style.display ='block';
    } else {
      unreadCountElement.textContent = ''; // Hide if count is 0
      unreadCountElement.style.display ='none';
    }
}


$(document).ready(function() {
  const currentPath = window.location.pathname;

  // 모든 링크의 기본 스타일 초기화
  $('.center-bar a').each(function() {
    $(this).removeClass('bold');
  });

  // 각 페이지별로 굵게 할 링크를 조건에 따라 지정
  if (currentPath === '/home') {
    $('.center-bar a').eq(0).addClass('bold'); // 첫 번째 링크 굵게
  } else if (currentPath === '/posts') {
    $('.center-bar a').eq(1).addClass('bold'); // 두 번째 링크 굵게
  } else if (currentPath === '/shop') {
    $('.center-bar a').eq(2).addClass('bold'); // 세 번째 링크 굵게
  }
});