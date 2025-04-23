
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

//
document.addEventListener("DOMContentLoaded", function () {
  const chooseImageBtn = document.querySelector("#choose-image-btn");
  const fileInput = document.querySelector("#file-input");
  const selectedImage = document.querySelector("#selected-image");

  const serviceBoxes = document.querySelectorAll(".box-service");
  const serviceNameInput = document.querySelector(".service-name input");
  const descriptionInput = document.querySelector(".service-description textarea");
  const quantityInput = document.querySelector("#quantity");
  const hourInput = document.querySelector(".hour-service");
  const minuteInput = document.querySelector(".minutes-service");
  const undeterminedCheckbox = document.querySelector("#undetermined-checkbox");
  const offServiceCheckbox = document.querySelector(".off-service input");

  let selectedBox = null;

  serviceBoxes.forEach((box, index) => {
    box.dataset.index = index; 
    box.dataset.off = box.dataset.off || "false"; 
    box.dataset.undetermined = box.dataset.undetermined || "false"; 

    box.addEventListener("click", function () {
      selectedBox = box;

      serviceBoxes.forEach(b => b.classList.remove('selected')); 
      box.classList.add('selected');

      const name = box.querySelector("p")?.textContent || "";
      const boxImg = box.querySelector("img");

      if (serviceNameInput) serviceNameInput.value = name;
      if (boxImg && selectedImage) selectedImage.src = boxImg.src;

      if (descriptionInput) descriptionInput.value = "";
      if (quantityInput) quantityInput.value = 1;
      if (hourInput) hourInput.value = "";
      if (minuteInput) minuteInput.value = "";
      if (undeterminedCheckbox) undeterminedCheckbox.checked = false;

      const isOff = box.dataset.off === "true";
      if (offServiceCheckbox) offServiceCheckbox.checked = isOff;

      const isUndetermined = box.dataset.undetermined === "true";
      if (undeterminedCheckbox) undeterminedCheckbox.checked = isUndetermined;
      toggleTimeInputs(undeterminedCheckbox.checked);

      box.classList.toggle("disabled-box", isOff);
    });
  });

  if (offServiceCheckbox) {
    offServiceCheckbox.addEventListener("change", function () {
      if (selectedBox) {
        const isChecked = offServiceCheckbox.checked;
        selectedBox.dataset.off = isChecked ? "true" : "false";
        selectedBox.classList.toggle("disabled-box", isChecked);
      }
    });
  }

  if (undeterminedCheckbox) {
    undeterminedCheckbox.addEventListener("change", function () {
      const hourInput = document.querySelector(".hour-service");
      const minutesInput = document.querySelector(".minutes-service");

      if (selectedBox) {
        selectedBox.dataset.undetermined = this.checked ? "true" : "false";
      }

      if (this.checked) {
        if (hourInput) hourInput.value = "";
        if (minutesInput) minutesInput.value = "";
      }

      toggleTimeInputs(this.checked);
    });
  }

  function toggleTimeInputs(isUndetermined) {
    const hourInput = document.querySelector(".hour-service");
    const minutesInput = document.querySelector(".minutes-service");

    if (isUndetermined) {
      hourInput.disabled = true;
      minutesInput.disabled = true;
    } else {
      hourInput.disabled = false;
      minutesInput.disabled = false;
    }
  }

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
});



