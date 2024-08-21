$(document).ready(function () {
    token = localStorage.getItem('Authorization');

    if (!token) {
        window.location.href = "/login";
    }

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

        const title =$('#title').val();
        const content =$('#content').val();
        const hashtags = $('#hashtagContainer .hashtag').map(function () {
            return $(this).text().replace('×', '').trim();
        }).get();

        if (title.length > 50) {
            alert('제목은 50자 이내로 입력해주세요.');
            return;
        }

        if (content.length > 300) {
            alert('내용은 300자 이내로 입력해주세요.');
            return;
        }

        if (hashtags.length > 20) {
            alert('해시태그는 20개 이내로 입력해주세요.');
            return false;
        }

        // 해시태그 글자수 제한 확인 (각 해시태그는 20자 이내)
        for (let i = 0; i < hashtags.length; i++) {
            if (hashtags[i].length > 20) {
                alert(`해시태그는 각 20자 이내로 입력해주세요: ${hashtags[i]}`);
                return;
            }
        }

        formData.append('request', new Blob([JSON.stringify({
            title: title,
            content: content,
            price: parseInt($('#price').val()),
            saleType: $('#saleType').val(),
            hashtags: hashtags.join(','),
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
