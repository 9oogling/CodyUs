$(document).ready(function () {
    const pathSegments = window.location.pathname.split('/');
    const postId = pathSegments[pathSegments.length - 1];

    function getToken() {
        return localStorage.getItem('Authorization'); // 로컬 스토리지에서 토큰을 가져옵니다.
    }

    const auth = getToken();

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('Authorization', auth);
    });

    if (!auth) {
        alert('로그인 페이지로 이동합니다.');
        window.location.href = "/login";
    }

    if (!postId) {
        alert('잘못된 게시물 요청입니다.');
        window.location.href = '/posts'; // 게시물 목록 페이지로 리디렉션
        return; // 코드 실행 중지
    }

    // 게시물 정보 로드
    $.ajax({
        url: `/api/posts/${postId}`,
        method: 'GET',
        headers: {
            'Authorization': auth
        },
        success: function (response) {
            if (response && response.data) {
                const data = response.data;

                $('#post-id').val(postId);
                $('#title').val(data.title);
                $('#content').val(data.content);
                $('#price').val(data.price);
                $('#saleType').val(data.saleType);

                // 성별
                if (data.gender) {
                    $(`input[name="gender"][value="${data.gender}"]`).prop('checked', true);
                }

                // 계절
                if (Array.isArray(data.season)) {
                    $('input[name="season"]').prop('checked', false); // 초기화
                    data.season.forEach(season => {
                        $(`input[name="season"][value="${season}"]`).prop('checked', true);
                    });
                }

                // 카테고리 체크
                if (Array.isArray(data.category)) {
                    $('input[name="category"]').prop('checked', false); // 초기화
                    data.category.forEach(category => {
                        $(`input[name="category"][value="${category}"]`).prop('checked', true);
                    });
                }

                // 해시태그 추가
                if (data.hashtags) {
                    data.hashtags.split(',').forEach(tag => {
                        const trimmedTag = tag.trim();
                        if (trimmedTag) {
                            createHashtag(trimmedTag);
                        }
                    });
                }

                // S3 URL을 통한 이미지 미리보기
                if (Array.isArray(data.image)) {
                    data.image.forEach((url, index) => displayImagePreview(url, 'imagePreview'));
                } else if (data.image) {
                    displayImagePreview(data.image, 'imagePreview');
                }
                if (Array.isArray(data.productImage)) {
                    data.productImage.forEach((url, index) => displayImagePreview(url, 'productImagePreview'));
                } else if (data.productImage) {
                    displayImagePreview(data.productImage, 'productImagePreview');
                }
            } else {
                alert('게시물 정보를 로드할 수 없습니다.');
                window.location.href = '/posts';
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('게시물 로딩 중 오류가 발생했습니다.');
            console.error('게시물 로딩 오류:', textStatus, errorThrown);
        }
    });


    // S3 URL을 통한 이미지 미리보기
    function displayImagePreview(imageUrl, previewElementId) {
        const previewContainer = document.getElementById(previewElementId);
        previewContainer.innerHTML = ''; // 기존 미리보기 삭제

            const img = new Image();
            img.src = imageUrl;
            img.style.maxWidth = '100%';  // 컨테이너에 맞게 조정
            img.style.marginTop = '10px';
            img.style.border = '1px solid #ddd'; // 테두리 추가
            img.style.borderRadius = '4px'; // 테두리 둥글게

            img.onerror = function () {
                alert('이미지를 불러올 수 없습니다.');
                console.error(`이미지 로드 오류: ${imageUrl}`);
            };

            img.onload = function () {
                previewContainer.appendChild(img);
            };
    }

    // 파일 업로드 시 이미지 미리보기
    function previewImage(event, previewElementId) {
        const file = event.target.files[0];
        const previewContainer = document.getElementById(previewElementId);

        if (previewContainer) {
            previewContainer.innerHTML = ''; // Clear previous preview
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target.result;

                if(typeof result === 'string') {
                    const img = document.createElement('img');
                    img.src = result;
                    img.style.maxWidth = '100%';
                    img.style.marginTop = '10px';

                    if (previewContainer) {
                        previewContainer.appendChild(img);
                    }
                } else {
                    console.error('FileReader result is not a string.');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // 파일 선택 시 미리보기 이벤트 등록
    document.getElementById('image').addEventListener('change', function (e) {
        previewImage(e, 'imagePreview');
    });

    document.getElementById('productImage').addEventListener('change', function (e) {
        previewImage(e, 'productImagePreview');
    });

    // 게시글 수정 요청
    $('#updatePostForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        const seasons = [];
        $('input[name="season"]:checked').each(function () {
            seasons.push($(this).val());
        });
        const gender = $('input[name="gender"]:checked').val();
        const categories = [];
        $('input[name="category"]:checked').each(function () {
            categories.push($(this).val());
        });

        let categoryName = [];
        if (gender) {
            categoryName.push(gender);
        }
        categoryName = categoryName.concat(seasons).concat(categories);

        const title = $('#title').val();
        const content = $('#content').val();
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
            return;
        }

        for (const hashtag of hashtags) {
            if (hashtag.length > 20) {
                alert(`해시태그는 각 20자 이내로 입력해주세요: ${hashtag}`);
                return;
            }
        }

        formData.append('request', new Blob([JSON.stringify({
            title: title,
            content: content,
            price: parseInt($('#price').val(), 10),
            saleType: $('#saleType').val(),
            hashtags: hashtags.join(','),
            categoryName: categoryName
        })], { type: "application/json" }));

        const imageFiles = $('#image')[0].files;
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append('image', imageFiles[i]);
        }

        const productImageFiles = $('#productImage')[0].files;
        for (let i = 0; i < productImageFiles.length; i++) {
            formData.append('productImage', productImageFiles[i]);
        }

        $.ajax({
            url: `/api/posts/${postId}`,
            type: 'PUT',
            data: formData,
            contentType: false,
            processData: false, // FormData 사용 시 false로 설정
            headers: {
                'Authorization': auth,
            },
            success: function (response) {
                alert('게시물이 성공적으로 수정되었습니다.');
                console.log(response);
                window.location.href = '/posts';
            },
            error: function (xhr, status, error) {
                alert('게시물 수정에 실패했습니다.');
                console.log(formData);
                console.error(xhr, status, error);
            }
        });
    });

    // 파일 용량 제한
    $("input[name=image], input[name=productImage]").on("change", function () {
        const maxSize = 5 * 1024 * 1024; // 5MB 사이즈 제한
        const file = this.files[0];
        if (file && file.size > maxSize) {
            alert("파일첨부 사이즈는 5MB 이내로 가능합니다.");
            $(this).val(''); // 업로드한 파일 제거
        }
    });

    // 해시태그 처리
    const hashtagsInput = document.getElementById('hashtags');
    const hashtagContainer = document.getElementById('hashtagContainer');

    hashtagsInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
            event.preventDefault();
            const hashtagText = hashtagsInput.value.trim();
            if (hashtagText) {
                createHashtag(hashtagText);
                hashtagsInput.value = '';
            }
        }
    });

    function createHashtag(text) {
        const hashtagElement = document.createElement('div');
        hashtagElement.className = 'hashtag';
        hashtagElement.textContent = text;

        const removeButton = document.createElement('span');
        removeButton.textContent = '×';
        removeButton.addEventListener('click', () => {
            hashtagContainer.removeChild(hashtagElement);
        });

        hashtagElement.appendChild(removeButton);
        hashtagContainer.appendChild(hashtagElement);
    }
});
