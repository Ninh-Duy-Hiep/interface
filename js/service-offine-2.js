function initCustomQuill(selector) {
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = ['8px', '9px', '10px', '11px', '12px', '13px','14px', '15px', '16px', '17px', '18px'];
  Quill.register(Size, true);

  const quill = new Quill(selector, {
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ size: ['8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18'] }],
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

  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('size', function(value) {
    if (value) {
      quill.format('size', value + 'px');
    }
  });

  return quill;
}

// select logo
function initImageUploadSync({ fileInputId, triggerButtonId, previewImageId, targetImageSelector }) {
  const fileInput = document.getElementById(fileInputId);
  const triggerButton = document.getElementById(triggerButtonId);
  const previewImage = document.getElementById(previewImageId);
  const targetImage = document.querySelector(targetImageSelector);

  if (!fileInput || !triggerButton || !previewImage || !targetImage) {
    return;
  }

  triggerButton.addEventListener('click', function (e) {
    e.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        previewImage.src = event.target.result;
        targetImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// system-name and address-name
function populateFormFromHeader({ systemNameSelector, wardNameSelector, systemInputSelector, wardInputSelector }) {
  const systemNameElem = document.querySelector(systemNameSelector);
  const wardNameElem = document.querySelector(wardNameSelector);
  const systemInput = document.querySelector(systemInputSelector);
  const wardInput = document.querySelector(wardInputSelector);

  if (systemNameElem && wardNameElem && systemInput && wardInput) {
    const rawSystemText = systemNameElem.textContent.trim().replace(/\s+/g, ' ');
    const rawWardText = wardNameElem.textContent.trim();

    systemInput.value = rawSystemText;
    wardInput.value = rawWardText;
  }
}

// select qr 
function initQRImageSelector({ fileInputId, triggerButtonId, targetImageSelector, textInputSelector }) {
  const fileInput = document.getElementById(fileInputId);
  const triggerButton = document.getElementById(triggerButtonId);
  const targetImage = document.querySelector(targetImageSelector);
  const textInput = document.querySelector(textInputSelector);

  if (!fileInput || !triggerButton || !targetImage || !textInput) {
    return;
  }

  triggerButton.addEventListener("click", function (e) {
    e.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        targetImage.src = event.target.result;
        textInput.value = file.name; 
      };
      reader.readAsDataURL(file);
    } 
  });
}




