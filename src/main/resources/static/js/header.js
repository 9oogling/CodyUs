$(document).ready(function() {
  const token = Cookies.get('Authorization');
  console.log('Authorization token:', token);

  if (token) {
    $('#login-logout-link').text('로그아웃').attr('onclick', 'logout()');
  } else {
    $('#login-logout-link').text('로그인').attr('onclick', "location.href='login-page'");
  }

  // Logout function
  window.logout = function() {
    Cookies.remove('Authorization', { path: '/' });
    alert('로그아웃 되었습니다.');
    location.href = '/login-page';
  };

  // Search functionality
  document.querySelector('.search-bar button').addEventListener('click', function() {
    const searchQuery = document.querySelector('.search-bar input').value;
    const searchType = document.querySelector('.search-type-select').value;
    alert(`Searching for: "${searchQuery}" in ${searchType}`);
    // Here you would typically send the search query and type to a server
  });

  document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const searchQuery = this.value;
      const searchType = document.querySelector('.search-type-select').value;
      alert(`Searching for: "${searchQuery}" in ${searchType}`);
      // Here you would typically send the search query and type to a server
    }
  });

  // Add hover effect to main category links
  const mainCategoryLinks = document.querySelectorAll('.main-categories a');
  mainCategoryLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.color = '#4CAF50';
    });
    link.addEventListener('mouseout', function() {
      this.style.color = '#333';
    });
  });
});