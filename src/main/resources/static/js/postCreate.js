$(document).ready(function () {
    function getToken() {
        return Cookies.get('Authorization');
    }
    const auth = getToken();

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('Authorization', auth);
    });

    $('#createPostForm').on('submit', function (e) {
        e.preventDefault(); // 기본 폼 제출 방지

        var formData = new FormData();
        var seasons = [];
        $('input[name="season"]:checked').each(function () {
            seasons.push($(this).val());
        });
        var gender = $('input[name="gender"]:checked').val();
        var categories = [];
        $('input[name="category"]:checked').each(function () {
            categories.push($(this).val());
        });
        var categoryName = [];
        if (gender) {
            categoryName.push(gender);
        }
        categoryName = categoryName.concat(seasons).concat(categories);

        formData.append('request', new Blob([JSON.stringify({
            title: $('#title').val(),
            content: $('#content').val(),
            price: parseInt($('#price').val()),
            saleType: $('#saleType').val(),
            hashtags: $('#hashtagContainer .hashtag').map(function () {
                return $(this).text().replace('×', '').trim();
            }).get().join(','),
            categoryName: categoryName // 카테고리 리스트로 전달
        })], {type: "application/json"}));

        var imageFiles = $('#image')[0].files;
        for (var i = 0; i < imageFiles.length; i++) {
            formData.append('image', imageFiles[i]);
        }

        var productImageFiles = $('#productImage')[0].files;
        for (var i = 0; i < productImageFiles.length; i++) {
            formData.append('productImage', productImageFiles[i]);
        }

        $.ajax({
            url: '/api/posts',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert('게시물이 성공적으로 작성되었습니다.');
                console.log(response);
                window.location.href = '/posts';
            },
            error: function (xhr, status, error) {
                alert('게시물 생성에 실패했습니다.');
                console.error(xhr, status, error);
            }
        });
    });

    // 해시태그 처리
    const hashtagsInput = document.getElementById('hashtags');
    const hashtagContainer = document.getElementById('hashtagContainer');

    hashtagsInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
            event.preventDefault(); // 기본 동작 방지
            const hashtagText = hashtagsInput.value.trim();
            if (hashtagText) {
                createHashtag(hashtagText);
                hashtagsInput.value = ''; // 입력 필드 초기화
            }
        }
    });

    function createHashtag(text) {
        const hashtagElement = document.createElement('div');
        hashtagElement.className = 'hashtag';
        hashtagElement.textContent = text;

        const removeButton = document.createElement('span');
        removeButton.textContent = '×'; // 삭제 버튼에 × 기호 추가
        removeButton.addEventListener('click', () => {
            hashtagContainer.removeChild(hashtagElement);
        });

        hashtagElement.appendChild(removeButton);
        hashtagContainer.appendChild(hashtagElement);
    }

    // 이미지 미리보기
    function previewImage(event, previewElementId) {
        const file = event.target.files[0];
        const previewContainer = document.getElementById(previewElementId);
        previewContainer.innerHTML = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.marginTop = '10px';
                previewContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }

    document.getElementById('image').addEventListener('change', function (e) {
        previewImage(e, 'imagePreview');
    });

    document.getElementById('productImage').addEventListener('change', function (e) {
        previewImage(e, 'productImagePreview');
    });
});
