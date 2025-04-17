// select card-content and select image
document.addEventListener("DOMContentLoaded", function () {
  const chooseImageBtn = document.querySelector("#choose-image-btn-account");
  const fileInput = document.querySelector("#file-input");
  const selectedImage = document.querySelector("#selected-image-account");
  const container = document.getElementById("list-content-container");
  const titleInput = document.querySelector('#account-name');
  const zaloInput = document.querySelector('#zalo-id'); 
  const descriptionInput = document.querySelector('#service-description'); 
  const publishCheckbox = document.querySelectorAll('.publish-articles input[type="checkbox"]');

  if (chooseImageBtn && fileInput && selectedImage) {
    chooseImageBtn.addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          selectedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  container.addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      return;
    }
    const card = e.target.closest('.card-content');
    if (!card) return;

    document.querySelectorAll('.card-content').forEach(c => {
      c.classList.remove('selected');
    });

    card.classList.add('selected');

    const imgSrc = card.querySelector('img').getAttribute('src');
    const title = card.querySelector('.card-text-1').textContent;

    selectedImage.setAttribute('src', imgSrc);
    titleInput.value = title;
    fileInput.value = "";

    publishCheckbox.forEach(checkbox => {
      checkbox.checked = false;
    });

    zaloInput.value = "";
    descriptionInput.value = "";
  });
});


// hidden divider-line and show scroll
document.addEventListener("DOMContentLoaded", function () {
  const serviceContainer = document.querySelector(".list-news");
  const serviceContent = document.querySelector(".list-news #list-content-container");
  const verticalLine = document.querySelector(".divider-line");

  if (serviceContent && serviceContainer && verticalLine) {
    const isOverflowing =
      serviceContent.scrollHeight > serviceContainer.clientHeight;
    verticalLine.style.display = isOverflowing ? "none" : "block";
  }
});

// Filter the news group footer
document.addEventListener("DOMContentLoaded", function () {
  const dropdownMenu = document.getElementById("dropdown-list-footer");

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        const selectedText = item.textContent;
        document.getElementById("footer-selected-news").textContent =
          selectedText;
        document.getElementById("dropdownMenuButton").blur();
      }
    });
  }
});



// // Toast
function showToast(message = "Thông báo!", type = "success") {
  const toastEl = document.getElementById("customToast");
  const toastBody = toastEl.querySelector(".toast-body");
  const toastIcon = toastEl.querySelector(".toast-icon");

  // Reset icon & class
  toastEl.className = "toast toast-animated align-items-center border-0";
  toastEl.classList.add("text-white");

  switch (type) {
    case "success":
      toastEl.classList.add("bg-success");
      toastIcon.className = "toast-icon bi bi-check-circle-fill";
      break;
    case "error":
      toastEl.classList.add("bg-danger");
      toastIcon.className = "toast-icon bi bi-x-circle-fill";
      break;
    case "info":
      toastEl.classList.add("bg-info");
      toastIcon.className = "toast-icon bi bi-info-circle-fill";
      break;
    default:
      toastEl.classList.add("bg-secondary");
      toastIcon.className = "toast-icon bi bi-exclamation-circle-fill";
      break;
  }

  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000,
    autohide: true,
  });

  toast.show();
}
