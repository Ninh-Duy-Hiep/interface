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

const newsList = Array.from({length: 20}, (_, i) => ({
  image: '../image/news1.png',
  title: `Tin tức ${i + 1}`,
  date: '20/04/2025',
  author: 'Admin'
}));

const ITEMS_PER_PAGE = 5;
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
  const paginationContainer = document.getElementById("pagination");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (totalPages <= 1) {
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "flex";
  }

  prevBtn.classList.toggle("disabled", currentPage === 1);
  nextBtn.classList.toggle("disabled", currentPage === totalPages);

  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderTours();
      updatePaginationState();
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTours();
      updatePaginationState();
    }
  };

  const existingPages = paginationContainer.querySelectorAll(".page-item:not(#prev-btn):not(#next-btn)");
  existingPages.forEach(el => el.remove());

  const pages = getPageList(currentPage, totalPages);
  pages.forEach(page => {
    const li = document.createElement("li");
    li.className = "page-item";
    if (page === "...") {
      li.classList.add("disabled");
      li.innerHTML = `<span class="page-link">...</span>`;
    } else {
      if (page === currentPage) li.classList.add("active");
      const a = document.createElement("a");
      a.className = "page-link";
      a.href = "#";
      a.textContent = page;
      a.onclick = () => {
        currentPage = page;
        renderTours();
        updatePaginationState();
      };
      li.appendChild(a);
    }
    paginationContainer.insertBefore(li, nextBtn);
  });
}



function getPageList(current, total) {
  const range = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      range.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        range.push(i);
      }
      range.push("...");
      range.push(total);
    }
    else if (current >= total - 3) {
      range.push(1);
      range.push("...");
      for (let i = total - 4; i <= total; i++) {
        range.push(i);
      }
    } 
    else {
      range.push(1);
      range.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        range.push(i);
      }
      range.push("...");
      range.push(total);
    }
  }

  return range;
}

function createPaginationItem(page, disabled = false, active = false) {
  const li = document.createElement("li");
  li.className = "page-item";

  if (disabled) li.classList.add("disabled");
  if (active) li.classList.add("active");

  const a = document.createElement("a");
  a.className = "page-link";
  a.href = "#";

  if (page === "prev") {
    a.innerHTML = '<i class="bi bi-chevron-left"></i>';
    a.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderTours();
        updatePaginationState();
      }
    };
  } else if (page === "next") {
    a.innerHTML = '<i class="bi bi-chevron-right"></i>';
    a.onclick = () => {
      const totalPages = Math.ceil(getFilteredList().length / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        renderTours();
        updatePaginationState();
      }
    };
  } else {
    a.textContent = page;
    a.onclick = () => {
      currentPage = page;
      renderTours();
      updatePaginationState();
    };
  }

  li.appendChild(a);
  return li;
}

// First load
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
          selectedImage.classList.add('full-image');
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
    selectedImage.classList.add('full-image');
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
