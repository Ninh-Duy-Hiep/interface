// Dropdown select service
document.addEventListener("DOMContentLoaded", function () {
  const dropdownMenu = document.getElementById("dropdown-list");

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        const selectedText = item.textContent;
        document.getElementById("selected-service").textContent = selectedText;
        document.getElementById("dropdownMenuButton").blur();
      }
    });
  }
});

// open modal call processing
function showProcessModal(button) {
  const card = button.closest('.display-section');

  const number = card.querySelector('.number-service')?.textContent.trim() || '';
  const name = card.querySelector('.name')?.textContent.trim() || '';
  const service = card.querySelector('.service-info p')?.textContent.trim() || '';
  const location = card.querySelector('.location')?.textContent.trim() || '';
  const phone = '0123456789'; 

  const title = `STT: ${number} - ${name} (${phone}) - DV: ${service}`.toUpperCase();

  document.getElementById('processModalLabel').textContent = title;
  document.getElementById('citizenAddress_process').value = location;

  const modal = new bootstrap.Modal(document.getElementById('processModal'));
  modal.show();
}

// open modal Done 
function showDoneModal(button) {
  const card = button.closest('.display-section');

  const number = card.querySelector('.number-service')?.textContent.trim() || '';
  const name = card.querySelector('.name')?.textContent.trim() || '';
  const service = card.querySelector('.service-info p')?.textContent.trim() || '';
  const location = card.querySelector('.location')?.textContent.trim() || '';
  const phone = '0123456789'; 

  const title = `STT: ${number} - ${name} (${phone}) - DV: ${service}`.toUpperCase();

  document.getElementById('doneModalLabel').textContent = title;
  document.getElementById('citizenAddress_done').value = location;

  const modal = new bootstrap.Modal(document.getElementById('doneModal'));
  modal.show();
}

// open modal Close
function showCloseModal(button) {
  const card = button.closest('.display-section');

  const number = card.querySelector('.number-service')?.textContent.trim() || '';
  const name = card.querySelector('.name')?.textContent.trim() || '';
  const service = card.querySelector('.service-info p')?.textContent.trim() || '';
  const location = card.querySelector('.location')?.textContent.trim() || '';
  const phone = '0123456789'; 

  const title = `STT: ${number} - ${name} (${phone}) - DV: ${service}`.toUpperCase();

  document.getElementById('closeModalLabel').textContent = title;
  document.getElementById('citizenAddress_close').value = location;

  const modal = new bootstrap.Modal(document.getElementById('closeModal'));
  modal.show();
}

// open confirm modal 
function showConfirmModal(button) {
  const card = button.closest('.display-section');

  const number = card.querySelector('.number-service')?.textContent.trim()|| '';
  let name = card.querySelector('.name')?.textContent.trim() || '';
  const phone = '0123456789'; 
  let service = card.querySelector('.name-service')?.textContent.trim() || '';
  const location = card.querySelector('.location')?.textContent.trim() || '';

  const modalBody = document.querySelector('#confirmModal .modal-body');

  const lines = modalBody.querySelectorAll('span.d-flex');
  

  name = name.toUpperCase();
  service = service.toUpperCase();

  document.getElementById('confirm-stt').textContent = number;
  document.getElementById('confirm-name').textContent = name;
  document.getElementById('confirm-phone').textContent = phone;
  document.getElementById('confirm-service').textContent = service;
  document.getElementById('confirm-location').textContent = location;
  
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();
}

// // Toast
function showToast(message = "Thông báo!", type = "success") {
  const toastEl = document.getElementById("customToast");
  const toastBody = toastEl.querySelector(".toast-body");
  const toastIcon = toastEl.querySelector(".toast-icon");

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

// open modal confirm and modal process
function handleSave(button) {
  const modalId = button.getAttribute("data-modal-id");
  const toastType = button.getAttribute("data-toast-type") || "success";

  // Gán message theo từng loại toast
  let message = "Thông báo!";
  switch (toastType) {
    case "success":
      message = "Thao tác thành công!";
      break;
    case "error":
      message = "Thao tác thất bại!";
      break;
    case "info":
      message = "Đây là thông tin cần chú ý!";
      break;
    default:
      message = "...";
      break;
  }

  const modalEl = document.getElementById(modalId);
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  modalInstance?.hide();

  showToast(message, toastType);
}


// js for quill 
const Size = Quill.import('attributors/style/size'); 
Size.whitelist = ['8px', '9px', '10px', '11px', '12px', '13px','14px', '15px', '16px', '17px', '18px'];
Quill.register(Size, true);

const editors = {
  process: new Quill("#editor-process", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ size: ['8px', '9px', '10px', '11px', '12px', '13px','14px', '15px', '16px', '17px', '18px'] }],
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ background: [] }],
        ["image"],]
    }
  }),
  done: new Quill("#editor-done", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ size: ['8px', '9px', '10px', '11px', '12px', '13px','14px', '15px', '16px', '17px', '18px'] }],
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ background: [] }],
        ["image"],]
    }
  }),
  close: new Quill("#editor-close", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ size: ['8px', '9px', '10px', '11px', '12px', '13px','14px', '15px', '16px', '17px', '18px'] }],
        ["bold", "italic", "underline"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ background: [] }],
        ["image"],]
    }
  }),
};


