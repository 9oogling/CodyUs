$(document).ready(function() {
  $('#categoryForm').on('submit', function(event) {
    event.preventDefault();

    const categoryName = $('#categoryName').val();

    const requestData = {
      categoryName: categoryName
    };

    $.ajax({
      url: '/api/admin/category',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function(data) {
        $('#responseMessage').text('Category created successfully!').css('color', 'green');
        $('#categoryForm')[0].reset();
      },
      error: function(xhr, status, error) {
        $('#responseMessage').text('Error creating category.').css('color', 'red');
        console.error('There was a problem with the AJAX operation:', error);
      }
    });
  });
});