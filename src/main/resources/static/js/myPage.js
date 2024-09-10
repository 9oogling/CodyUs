let currentPage = 1;
let totalPages = 1;
let currentLikePage = 1;
let totalLikePages = 1;

token = localStorage.getItem('Authorization');

if (!token) {
    window.location.href = "/login";
}

document.addEventListener('DOMContentLoaded', function () {
    const openModalButtons = document.querySelectorAll('.open-modal-button, .open-modal-button1');
    const closeModalButtons = document.querySelectorAll('.close, .close2');

    // Open modal event listeners
    openModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetDialog = document.querySelector(button.getAttribute('data-target'));
            const overlay = document.querySelector('.myPage-overlay');
            if (targetDialog) {
                targetDialog.showModal();
                overlay.style.display = 'block'; // Show overlay
            }
        });
    });

    // Close button event listeners
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dialog = button.closest('dialog');
            const overlay = document.querySelector('.myPage-overlay');
            if (dialog && !dialog.classList.contains('no-close')) {
                dialog.classList.add("dialog__animate-out");
                dialog.addEventListener('animationend', () => {
                    dialog.classList.remove("dialog__animate-out");
                    dialog.close();
                    // 모달 닫힐 때 내용 초기화
                    dialog.querySelectorAll('input').forEach(input => input.value = '');
                    overlay.style.display = 'none'; // Hide overlay
                }, {once: true});
            }
        });
    });

    // Click on background event listener
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', function (event) {
            const overlay = document.querySelector('.myPage-overlay');
            if (event.target === dialog && !dialog.classList.contains('no-close')) {
                dialog.classList.add("dialog__animate-out");
                dialog.addEventListener('animationend', () => {
                    dialog.classList.remove("dialog__animate-out");
                    dialog.close();
                    // 모달 닫힐 때 내용 초기화
                    dialog.querySelectorAll('input').forEach(input => input.value = '');
                    overlay.style.display = 'none'; // Hide overlay
                }, {once: true});
            }
        });
    });
});

// 비밀번호 변경 알림
document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.querySelector(".close1");

    saveButton.addEventListener("click", (event) => {
        event.preventDefault();

        const currentPw = document.getElementById("change0").value;
        const newPw = document.getElementById("change1").value;
        const confirmPw = document.getElementById("change2").value;

        // 비밀번호가 모두 입력되었는지 확인
        if (!currentPw || !newPw || !confirmPw) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        // 비밀번호의 유효성을 검사 (영문, 숫자, 특수문자 포함 8~16자)
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        if (!pwPattern.test(newPw)) {
            alert("영문, 숫자, 특수문자 포함하여 8~16자로 입력해 주세요.");
            return;
        }

        // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
        if (newPw !== confirmPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const requestDto = {
            password: currentPw,
            newPassword: newPw,
            checkPassword: confirmPw
        }

        // 서버에 현재 비밀번호를 보내서 확인 (여기에 서버 요청 코드 추가)
        $.ajax({
            url: '/api/profile/password/my',  // 서버의 비밀번호 확인 엔드포인트
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestDto),
            success: function (response) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                // 비밀번호 변경 모달을 닫지 않음
            },
            error: function (error) {
                alert("오류: " + error.responseJSON.message);
            }
        });
    });
});

// 사용자 정보 가져운 후 렌더링
function renderUserInfo() {
    console.log("렌더링 전: " + token)
    $.ajax({
        url: '/api/user-info', // 사용자 정보를 가져올 엔드포인트
        method: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {
            const userInfo = response.data;

            // 이메일 업데이트
            document.querySelector('.email1').textContent = userInfo.username;

            // 닉네임 업데이트
            document.querySelector('.nickname1').textContent = userInfo.nickName;

            // 전화번호 업데이트
            document.querySelector('.phone1').textContent = userInfo.phoneNumber || "표시할 정보가 없습니다.";

            // 주소 업데이트
            document.querySelector('.address1').textContent = userInfo.address || "표시할 정보가 없습니다.";

            // 로그인 제공자 확인
            if (userInfo.loginProvider === 'KAKAO') {
                // 비밀번호 필드를 "카카오 로그인입니다"로 변경
                document.querySelector('.password1').textContent = "카카오 로그인입니다";

                // 비밀번호 변경 버튼 제거
                document.getElementById('password-change-button').style.display = 'none';
            }
        },
        error: function (error) {
            alert("오류: " + error.responseJSON.message)
        }
    });
}



// 주소 변경 모달 저장 버튼 클릭 시 모달 닫히기
document.addEventListener('DOMContentLoaded', () => {
    const saveAddressButton = document.querySelector(".save-address");
    const savePhoneButton = document.querySelector(".save-phone");
    const saveNameButton = document.querySelector(".save-name");


    // 주소 변경 저장 버튼 클릭 시
    saveAddressButton.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = saveAddressButton.closest('dialog');

        // 모달에서 입력된 주소 값들 가져오기
        const postcode = dialog.querySelector('#sample6_postcode').value;
        const address = dialog.querySelector('#sample6_address').value;
        const detailAddress = dialog.querySelector('#sample6_detailAddress').value;

        // 전체 주소 합치기
        const fullAddress = `[${postcode}] ${address}, ${detailAddress}`;


        // AJAX 요청 보내기
        $.ajax({
            url: '/api/profile/address/my',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                address: fullAddress
            }),
            success: function (response) {
                alert("주소가 변경되었습니다.");
                location.reload();  // 페이지 새로고침
            },
            error: function (error) {
                alert('오류: ' + error.responseJSON.message);
            }
        });
    });

    // 닉네임 변경 저장 버튼 클릭 시
    saveNameButton.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = saveNameButton.closest('dialog');

        // 입력된 닉네임 가져오기
        const nickNameInput = dialog.querySelector('#change6').value;

        // AJAX 요청 보내기
        $.ajax({
            url: '/api/profile/nickname/my',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({nickName: nickNameInput}),
            success: function (response) {
                alert("닉네임이 변경되었습니다.")
                location.reload();
            },
            error: function (error) {
                alert('오류: ' + error.responseJSON.message);
            }
        });
    });

    // 휴대폰 번호 변경 저장 버튼 클릭 시
    savePhoneButton.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = savePhoneButton.closest('dialog');

        // 입력된 전화번호 가져오기 (올바른 선택자 사용)
        const phoneInput = dialog.querySelector('input[name="name"]');

        // 전화번호 값 변환 (하이픈 추가)
        hypenTel(phoneInput);
        // 변환된 전화번호 가져오기
        const phoneNumber = phoneInput.value;

        // AJAX 요청 보내기
        $.ajax({
            url: '/api/profile/phone/my',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({phoneNumber: phoneNumber}), // phoneNumber 값을 전달
            success: function (response) {
                alert("휴대폰 번호가 변경되었습니다.")
                location.reload();
            },
            error: function (error) {
                alert('오류: ' + error.responseJSON.message);
            }
        });
    });
});


// 휴대폰 번호 변환
const hypenTel = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 주소 검색 및 입력 필드 채우기 함수
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ''; // 주소 변수
            let extraAddr = ''; // 참고항목 변수

            // 사용자가 도로명 주소를 선택했을 경우
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우
                addr = data.jibunAddress;
            }

            // 참고항목 (동, 건물명 등) 추가
            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                document.getElementById("sample6_extraAddress").value = extraAddr;
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 최종적으로 우편번호, 주소 값 할당
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            document.getElementById("sample6_detailAddress").focus(); // 상세주소 입력으로 포커스 이동
        }
    }).open();
}


function fetchPosts(page) {
    $.ajax({
        url: `/api/posts/my?page=${page - 1}`,
        method: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {
            if (response.statusCode === "OK" && response.data.content.length > 0) {
                totalPages = response.data.totalPages;
                renderSales(response.data.content);
            } else {
                // 데이터가 없는 경우 목록을 비우기
                renderSales([]);
            }
            updatePagination(page);
        },
        error: function (xhr) {
            console.error('데이터를 가져오는데 실패했습니다.', xhr);
        }
    });
}

function renderSales(posts) {
    const salesList = $('.sales-list');
    salesList.empty(); // 기존 목록 비우기

    if (posts.length === 0) {
        const emptyMessage = $('<p class="no-posts">게시물이 없습니다.</p>');
        salesList.append(emptyMessage);
        return;
    }

    posts.forEach(post => {
        const saleItem = $(`
            <a href="/posts/postDetail/${post.id}" class="post-link"><p class="sale">- ${post.title}</p></a>`);
        salesList.append(saleItem);
    });
}

function updatePagination(page) {
    const pageNumbers = $('#page-numbers');
    pageNumbers.empty(); // 기존 페이지 번호 비우기

    const maxPageButtons = 5; // 최대 페이지 버튼 수 설정
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const halfMaxPageButtons = Math.floor(maxPageButtons / 2);
        if (page <= halfMaxPageButtons) {
            startPage = 1;
            endPage = maxPageButtons;
        } else if (page + halfMaxPageButtons >= totalPages) {
            startPage = totalPages - maxPageButtons + 1;
            endPage = totalPages;
        } else {
            startPage = page - halfMaxPageButtons;
            endPage = page + halfMaxPageButtons;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageNum = $('<button></button>')
            .text(i)
            .on('click', () => {
                if (currentPage !== i) { // 페이지가 변경된 경우에만 로드
                    changePage(i);
                }
            });
        if (i === page) {
            pageNum.prop('disabled', true);
        }
        pageNumbers.append(pageNum);
    }
    updatePaginationButtons();
}

function changePage(page) {
    if (page < 1 || page > totalPages) return; // 페이지 범위 체크
    currentPage = page;
    fetchPosts(currentPage);
}

function updatePaginationButtons() {
    const prevButton = document.querySelector('.pagination .prev-page');
    const nextButton = document.querySelector('.pagination .next-page');

    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
}

function fetchLikes(page) {
    const pageSize = 4;
    $.ajax({
        url: `/api/posts/likes/my?page=${page - 1}&size=${pageSize}`,
        method: 'GET',
        headers: {
            'Authorization': token
        },
        success: function (response) {
            if (response.statusCode === "OK" && response.data.content.length > 0) {
                totalLikePages = response.data.totalPages;
                renderLikes(response.data.content);
            } else {
                // 데이터가 없는 경우 목록을 비우기
                renderLikes([]);
            }
            updateLikesPagination(page);
        },
        error: function (xhr) {
            console.error('관심목록을 가져오는데 실패했습니다.', xhr);
        }
    });
}

function renderLikes(likes) {
    const likesList = $('.likes-list');
    likesList.empty(); // 기존 목록 비우기

    if (likes.length === 0) {
        const emptyMessage = $('<p class="no-posts">게시물이 없습니다.</p>');
        likesList.append(emptyMessage);
        return;
    }

    likes.forEach(like => {
        const likeItem = $(`
            <a href="/posts/postDetail/${like.id}" class="post-link"><p class="like">- ${like.title}</p></a>`);
        likesList.append(likeItem);
    });
}

function updateLikesPagination(page) {
    const pageNumbers = $('#likepage-numbers');
    pageNumbers.empty(); // 기존 페이지 번호 비우기

    const maxPageButtons = 5; // 최대 페이지 버튼 수 설정
    let startPage, endPage;

    if (totalLikePages <= maxPageButtons) {
        startPage = 1;
        endPage = totalLikePages;
    } else {
        const halfMaxPageButtons = Math.floor(maxPageButtons / 2);
        if (page <= halfMaxPageButtons) {
            startPage = 1;
            endPage = maxPageButtons;
        } else if (page + halfMaxPageButtons >= totalLikePages) {
            startPage = totalLikePages - maxPageButtons + 1;
            endPage = totalLikePages;
        } else {
            startPage = page - halfMaxPageButtons;
            endPage = page + halfMaxPageButtons;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageNum = $('<button></button>')
            .text(i)
            .on('click', () => {
                if (currentLikePage !== i) { // 페이지가 변경된 경우에만 로드
                    changeLikesPage(i);
                }
            });
        if (i === page) {
            pageNum.prop('disabled', true);
        }
        pageNumbers.append(pageNum);
    }

    updateLikesPaginationButtons();
}

function changeLikesPage(page) {
    if (page < 1 || page > totalLikePages) return; // 페이지 범위 체크
    currentLikePage = page;
    fetchLikes(currentLikePage);
}

function updateLikesPaginationButtons() {
    const prevButton = document.querySelector('.likes-pagination .prev-page2');
    const nextButton = document.querySelector('.likes-pagination .next-page2');

    prevButton.classList.toggle('disabled', currentLikePage === 1);
    nextButton.classList.toggle('disabled', currentLikePage === totalLikePages);
}

document.getElementById('postMoreLink').addEventListener('click', function () {
    window.location.href = '/posts'; // 원하는 URL로 이동
});

document.getElementById('likepostMoreLink').addEventListener('click', function () {
    window.location.href = '/like'; // 원하는 URL로 이동
});

// 초기 데이터 가져오기
$(document).ready(function () {
    renderUserInfo()
    fetchPosts(currentPage);
    fetchLikes(currentLikePage);
});
