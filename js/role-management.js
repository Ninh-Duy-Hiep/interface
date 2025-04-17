// select card-content
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("list-content-container");
  const titleInput = document.querySelector("#account-name");
  const descriptionInput = document.querySelector("#service-description");
  const publishCheckbox = document.querySelectorAll(
    '.publish-articles input[type="checkbox"]'
  );

  container.addEventListener("click", function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      return;
    }
    const card = e.target.closest(".card-content");
    if (!card) return;

    document.querySelectorAll(".card-content").forEach((c) => {
      c.classList.remove("selected");
    });

    card.classList.add("selected");

    const title = card.querySelector(".card-text-1").textContent;

    titleInput.value = title;

    publishCheckbox.forEach((checkbox) => {
      checkbox.checked = false;
    });

    descriptionInput.value = "";
  });
});

// hidden divider-line and show scroll
document.addEventListener("DOMContentLoaded", function () {
  const serviceContainer = document.querySelector(".list-news");
  const serviceContent = document.querySelector(
    ".list-news #list-content-container"
  );
  const verticalLine = document.querySelector(".divider-line");

  if (serviceContent && serviceContainer && verticalLine) {
    const isOverflowing =
      serviceContent.scrollHeight > serviceContainer.clientHeight;
    verticalLine.style.display = isOverflowing ? "none" : "block";
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
