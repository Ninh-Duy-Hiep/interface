// Dropdown for select newsgroup
document.addEventListener("DOMContentLoaded", function () {
  // Dropdown
  const dropdownMenu = document.getElementById("dropdown-list");

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        const selectedText = item.textContent;
        document.getElementById("selected-news").textContent = selectedText;
        document.getElementById("dropdownMenuButton").blur();
      }
    });
  }
});


// js for detail-content
const quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ background: [] }],
      ["image"],
    ],
  },
});

// create fake data
const newsList = [
  {
    image: '../image/news1.png',
    title: 'Thông báo triển khai phun thuốc phòng chống dịch',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo từ hội phụ nữ về phong trào tự quản trên địa bàn phường',
    date: '20/04/2025',
    author: 'Hội Phụ Nữ QT'
  },
  {
    image: '../image/news1.png',
    title: 'Hưởng ứng ngày 30/04 thống nhất đất nước',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
  {
    image: '../image/news1.png',
    title: 'Thông báo 11',
    date: '20/04/2025',
    author: 'Admin'
  },
]

const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let selectedTitle = "";

function getFilteredList() {
  return selectedTitle === ""
    ? newsList
    : newsList.filter(item => item.title === selectedTitle);
}

function renderTours() {
  const filtered = getFilteredList(); 
  const start = (currentPage - 1) * ITEMS_PER_PAGE; 
  const end = start + ITEMS_PER_PAGE;
  const currentData = filtered.slice(start, end);

  const container = document.getElementById("list-news-container");
  const template = document.getElementById("news-template");
  container.querySelectorAll(".card-news:not(#news-template)").forEach(el => el.remove());

  currentData.forEach(news => {
    const clone = template.cloneNode(true);
    clone.classList.remove("d-none");
    clone.removeAttribute("id");
    clone.querySelector("img").src = news.image;
    clone.querySelector(".card-text-1").textContent = news.title;
    clone.querySelector(".card-text-2").textContent = `Đăng ngày: ${news.date} - bởi: ${news.author}`;
    container.appendChild(clone);
  });
}

function updatePaginationState() {
  const filtered = getFilteredList();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  document.getElementById("prev-button").classList.toggle("disabled", currentPage === 1);
  document.getElementById("next-button").classList.toggle("disabled", currentPage === totalPages || totalPages === 0);

  document.getElementById("page-1").classList.toggle("active", currentPage === 1);
  document.getElementById("page-last").classList.toggle("active", currentPage === totalPages);

  document.getElementById("dots").setAttribute("data-page", currentPage);

  document.getElementById("page-last").querySelector("a").textContent = totalPages;
}
// click pre , next
document.getElementById("prev-button").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderTours();
    updatePaginationState();
    updateDividerLine()
  }
};
document.getElementById("next-button").onclick = () => {
  const filtered = getFilteredList();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderTours();
    updatePaginationState();
    updateDividerLine()
  }
};
document.getElementById("page-1").onclick = () => {
  if (currentPage !== 1) {
    currentPage = 1;
    renderTours();
    updatePaginationState();
    updateDividerLine()
  }
};
document.getElementById("page-last").onclick = () => {
  const filtered = getFilteredList();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage !== totalPages) {
    currentPage = totalPages;
    renderTours();
    updatePaginationState();
    updateDividerLine()
  }
};
// first load
renderTours();
updatePaginationState();
updateDividerLine()

// hidden divider-line and show scroll
function updateDividerLine() {
  setTimeout(() => {
    const container = document.getElementById("list-news-container");
    const divider = document.querySelector(".divider-line");
    
    if (container && divider) {
      const isOverflowing = container.scrollHeight > container.clientHeight;
      divider.style.display = isOverflowing ? "none" : "block"; 
    }
  }, 50); 
}

// Filter the news group footer
document.addEventListener("DOMContentLoaded", function () {
  const dropdownMenu = document.getElementById("dropdown-list-footer");

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        const selectedText = item.textContent;
        document.getElementById("footer-selected-news").textContent = selectedText;
        document.getElementById("dropdownMenuButton").blur();
      }
    });
  }
});

// select card-news and select image
document.addEventListener("DOMContentLoaded", function () {
  const chooseImageBtn = document.querySelector("#choose-image-btn-news");
  const fileInput = document.querySelector("#file-input");
  const selectedImage = document.querySelector("#selected-image-news");
  const container = document.getElementById("list-news-container");
  const titleInput = document.querySelector('.news-name input[type="text"]');
  const publishCheckbox = document.querySelector('.publish-articles input[type="checkbox"]');
  const selectedNewsText = document.getElementById("selected-news");
  const serviceDescription = document.querySelector('textarea[name="service-news"]');

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
    const card = e.target.closest('.card-news');
    if (!card || card.id === "news-template") return;

    document.querySelectorAll('.card-news').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    const imgSrc = card.querySelector('img').getAttribute('src');
    const title = card.querySelector('.card-text-1').textContent;

    selectedImage.setAttribute('src', imgSrc);
    titleInput.value = title;

    fileInput.value = "";

    publishCheckbox.checked = false;
    selectedNewsText.textContent = '';
    serviceDescription.value = '';
    if (typeof quill !== 'undefined') {
      quill.setText('');
    }
  });
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
