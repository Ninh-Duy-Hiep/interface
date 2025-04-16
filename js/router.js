function updateActiveMenu(url) {
  const menuMainScreen = document.querySelector(".menu-main-screen");
  const menuServiceConfig = document.querySelector(".menu-service-configuration");
  const menuNewsManagement = document.querySelector(".menu-news-management");

  const buttonTextMain = document.querySelector(".button-text-main");
  const buttonTextService = document.querySelector(".button-text-service");
  const buttonTextNews = document.querySelector(".button-text-news");


  if (url.includes("main-screen")) {
    menuMainScreen.classList.add("active");
    menuServiceConfig.classList.remove("active");
    menuNewsManagement.classList.remove("active");

    buttonTextMain.classList.add("active");
    buttonTextService.classList.remove("active");
    buttonTextNews.classList.remove("active");

  } else if (url.includes("service-configuration")) {
    menuServiceConfig.classList.add("active");
    menuMainScreen.classList.remove("active");
    menuNewsManagement.classList.remove("active");

    buttonTextService.classList.add("active");
    buttonTextMain.classList.remove("active");
    buttonTextNews.classList.remove("active");

  } else if (url.includes("news-management")) {
    menuNewsManagement.classList.add("active");
    menuMainScreen.classList.remove("active");
    menuServiceConfig.classList.remove("active");

    buttonTextNews.classList.add("active");
    buttonTextMain.classList.remove("active");
    buttonTextService.classList.remove("active");

  } else {
    menuMainScreen.classList.remove("active");
    menuServiceConfig.classList.remove("active");
    menuNewsManagement.classList.remove("active");

    buttonTextMain.classList.remove("active");
    buttonTextService.classList.remove("active");
    buttonTextNews.classList.remove("active");
  }
}

function initializePageEvents() {
  const btnMain = document.querySelector(".button-text-main");
  const btnService = document.querySelector(".button-text-service");
  const btnNews = document.querySelector(".button-text-news");

  const mainScreen = document.querySelector(".main-screen");
  const serviceContainer = document.querySelector(".container-service-configuration");
  const newsScreen = document.querySelector(".container-news-management");

  if (btnMain && btnService && btnNews && btnAccount) {
    btnMain.addEventListener("click", function () {
      resetDropdown();
      const selectedImage = document.querySelector("#selected-image");
      if (selectedImage) {
        selectedImage.src = defaultImageSrc;
      }
      if (mainScreen) mainScreen.classList.toggle("show");
      if (serviceContainer) serviceContainer.classList.remove("show");
      if (newsScreen) newsScreen.classList.remove("show");

      btnMain.classList.toggle("active");
      btnService.classList.remove("active");
      btnNews.classList.remove("active");

      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    });

    btnService.addEventListener("click", function () {
      resetDropdown();
      const selectedImage = document.querySelector("#selected-image");
      if (selectedImage) {
        selectedImage.src = defaultImageSrc;
      }
      if (serviceContainer) serviceContainer.classList.toggle("show");
      if (mainScreen) mainScreen.classList.remove("show");
      if (newsScreen) newsScreen.classList.remove("show");

      btnService.classList.toggle("active");
      btnMain.classList.remove("active");
      btnNews.classList.remove("active");

      if (serviceContainer && serviceContainer.classList.contains("show")) {
        const serviceBoxes = document.querySelectorAll(".box-service");
        const displayService = document.querySelector(".display-service");
        const serviceNameInput = document.querySelector(".service-name input");
        const serviceDescriptionTextarea = document.querySelector(
          ".service-description textarea"
        );
        const selectedImage = document.querySelector("#selected-image");

        if (
          serviceBoxes.length > 0 &&
          displayService &&
          serviceNameInput &&
          serviceDescriptionTextarea &&
          selectedImage
        ) {
          const firstServiceBox = serviceBoxes[0];
          const serviceName = firstServiceBox.querySelector("p").innerText;
          const serviceImage = firstServiceBox.querySelector("img").src;

          displayService.style.display = "block";
          serviceNameInput.value = serviceName;
          serviceDescriptionTextarea.value = serviceName;

          selectedImage.src = serviceImage;

          firstServiceBox.classList.add("active");
          document
            .querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
              checkbox.checked = false;
            });
        }
      }
    });

    btnNews.addEventListener("click", function () {
      resetDropdown();
      const selectedImage = document.querySelector("#selected-image");
      if (selectedImage) {
        selectedImage.src = defaultImageSrc;
      }
      if (newsScreen) newsScreen.classList.toggle("show");
      if (serviceContainer) serviceContainer.classList.remove("show");
      if (mainScreen) mainScreen.classList.remove("show");

      btnNews.classList.toggle("active");
      btnService.classList.remove("active");
      btnMain.classList.remove("active");

      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    });

  }

  const serviceBoxes = document.querySelectorAll(".box-service");
  if (serviceBoxes.length > 0) {
    serviceBoxes.forEach((box) => {
      box.addEventListener("click", function () {
        const serviceName = box.querySelector("p").innerText;
        const serviceImage = box.querySelector("img").src;
        const displayService = document.querySelector(".display-service");
        const serviceNameInput = document.querySelector(".service-name input");
        const serviceDescriptionTextarea = document.querySelector(
          ".service-description textarea"
        );
        const selectedImage = document.querySelector("#selected-image");
        const hourInput = document.querySelector(".hour-service");
        const minutesInput = document.querySelector(".minutes-service");
        const undeterminedCheckbox = document.querySelector(
          ".undetermined-service"
        );

        if (
          displayService &&
          serviceNameInput &&
          serviceDescriptionTextarea &&
          selectedImage
        ) {
          serviceNameInput.value = "";
          serviceDescriptionTextarea.value = "";
          selectedImage.src = defaultImageSrc;

          if (hourInput) hourInput.value = "";
          if (minutesInput) minutesInput.value = "";
          if (undeterminedCheckbox) undeterminedCheckbox.checked = false;

          const quantityInput = document.querySelector("#quantity");
          if (quantityInput) quantityInput.value = 1;

          displayService.style.display = "block";
          serviceNameInput.value = serviceName;
          serviceDescriptionTextarea.value = serviceName;
          selectedImage.src = serviceImage;

          document
            .querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
              checkbox.checked = false;
            });

          serviceBoxes.forEach((b) => b.classList.remove("active"));
          box.classList.add("active");
        }
      });
    });
  }

  const chooseImageBtn = document.querySelector("#choose-image-btn");
  const fileInput = document.querySelector("#file-input");
  const selectedImage = document.querySelector("#selected-image");

  if (chooseImageBtn && fileInput && selectedImage) {
    chooseImageBtn.addEventListener("click", function () {
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

  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const selectedService = document.getElementById("selected-service");

  if (dropdownItems.length > 0 && selectedService) {
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        selectedService.textContent = this.textContent;
      });
    });
  }
}

function resetDropdown() {
  const selectedService = document.getElementById("selected-service");
  const dropdownMenu = document.getElementById("dropdown-list");

  if (selectedService) {
    selectedService.textContent = "";
  }

  if (dropdownMenu) {
    dropdownMenu.classList.remove("show");
  }
}

const defaultImageSrc = "../image/cam.png";

function selectFirstServiceBox() {
  const serviceBoxes = document.querySelectorAll(".box-service");
  const displayService = document.querySelector(".display-service");
  const serviceNameInput = document.querySelector(".service-name input");
  const serviceDescriptionTextarea = document.querySelector(
    ".service-description textarea"
  );
  const selectedImage = document.querySelector("#selected-image");

  if (
    serviceBoxes.length > 0 &&
    displayService &&
    serviceNameInput &&
    serviceDescriptionTextarea &&
    selectedImage
  ) {
    const firstServiceBox = serviceBoxes[0];
    const serviceName = firstServiceBox.querySelector("p").innerText;
    const serviceImage = firstServiceBox.querySelector("img").src;

    displayService.style.display = "block";
    serviceNameInput.value = serviceName;
    serviceDescriptionTextarea.value = serviceName;

    selectedImage.src = serviceImage;

    serviceBoxes.forEach((b) => b.classList.remove("active"));
    firstServiceBox.classList.add("active");

    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}

// updown number
function changeNumber(delta) {
  const input = document.getElementById("quantity");
  let current = parseInt(input.value) || 1;
  const min = parseInt(input.min) || 1;
  const newValue = current + delta;
  if (newValue >= min) {
    input.value = newValue;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateActiveMenu(window.location.href);
  initializePageEvents();
  if (window.location.href.includes("service-configuration")) {
    selectFirstServiceBox();
  }
});

// hidden vertical and show scroll
document.addEventListener("DOMContentLoaded", function () {
  const serviceContainer = document.querySelector(".service");
  const serviceContent = document.querySelector(".service .service-container");
  const verticalLine = document.querySelector(".vertical-line-service");

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
