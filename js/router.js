
function updateActiveMenu(url) {
    const menuMainScreen = document.querySelector('.menu-main-screen');
    const menuServiceConfig = document.querySelector('.menu-service-configuration');
    const buttonTextMain = document.querySelector('.button-text-main');
    const buttonTextService = document.querySelector('.button-text-service');
    
    if (url.includes('main-screen')) {
        menuMainScreen.classList.add('active');
        menuServiceConfig.classList.remove('active');
        buttonTextMain.classList.add('active');
        buttonTextService.classList.remove('active');
    } else if (url.includes('service-configuration')) {
        menuMainScreen.classList.remove('active');
        menuServiceConfig.classList.add('active');
        buttonTextMain.classList.remove('active');
        buttonTextService.classList.add('active');
    } else {
        menuMainScreen.classList.remove('active');
        menuServiceConfig.classList.remove('active');
        buttonTextMain.classList.remove('active');
        buttonTextService.classList.remove('active');
    }
}

function initializePageEvents() {
    const btnMain = document.querySelector(".button-text-main");
    const btnService = document.querySelector(".button-text-service");
    const mainScreen = document.querySelector(".main-screen");
    const serviceContainer = document.querySelector(".container-service-configuration");
    
    if (btnMain && btnService) {
        btnMain.addEventListener("click", function () {
            resetDropdown(); 
            const selectedImage = document.querySelector("#selected-image");
            if (selectedImage) {
                selectedImage.src = defaultImageSrc; 
            }
            if (mainScreen) mainScreen.classList.toggle("show");
            if (serviceContainer) serviceContainer.classList.remove("show"); 
            btnMain.classList.toggle("active");
            btnService.classList.remove("active");
            document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });
        });

        btnService.addEventListener("click", function () {
            resetDropdown();
            const selectedImage = document.querySelector("#selected-image");
            if (selectedImage) {
                selectedImage.src = defaultImageSrc; 
            }
            if (mainScreen) mainScreen.classList.remove("show");
            if (serviceContainer) serviceContainer.classList.toggle("show");
            btnMain.classList.remove("active");
            btnService.classList.toggle("active");

            if (serviceContainer && serviceContainer.classList.contains("show")) {
                const serviceBoxes = document.querySelectorAll(".box-service");
                const displayService = document.querySelector(".display-service");
                const serviceNameInput = document.querySelector(".service-name input");
                const serviceDescriptionTextarea = document.querySelector(".service-description textarea");
                const selectedImage = document.querySelector("#selected-image");

                if (serviceBoxes.length > 0 && displayService && serviceNameInput && serviceDescriptionTextarea && selectedImage) {
                    const firstServiceBox = serviceBoxes[0];
                    const serviceName = firstServiceBox.querySelector("p").innerText;
                    const serviceImage = firstServiceBox.querySelector("img").src;

                    displayService.style.display = "block";
                    serviceNameInput.value = serviceName;
                    serviceDescriptionTextarea.value = serviceName;

                    selectedImage.src = serviceImage;

                    firstServiceBox.classList.add("active");
                    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                        checkbox.checked = false;
                    });
                }
            }
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
                const serviceDescriptionTextarea = document.querySelector(".service-description textarea");
                const selectedImage = document.querySelector("#selected-image");
                const hourInput = document.querySelector(".hour-service");
                const minutesInput = document.querySelector(".minutes-service");
                const undeterminedCheckbox = document.querySelector(".undetermined-service");
        
                if (displayService && serviceNameInput && serviceDescriptionTextarea && selectedImage) {
                    serviceNameInput.value = "";
                    serviceDescriptionTextarea.value = "";
                    selectedImage.src = defaultImageSrc;
        
                    if (hourInput) hourInput.value = "";
                    if (minutesInput) minutesInput.value = "";
                    if (undeterminedCheckbox) undeterminedCheckbox.checked = false;
        
                    displayService.style.display = "block";
                    serviceNameInput.value = serviceName;
                    serviceDescriptionTextarea.value = serviceName;
                    selectedImage.src = serviceImage;
        
                    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                        checkbox.checked = false;
                    });
        
                    serviceBoxes.forEach(b => b.classList.remove("active")); 
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
        dropdownItems.forEach(item => {
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

const defaultImageSrc = "https://s3-alpha-sig.figma.com/img/7f22/f5d3/ef8248c3905d3c06a795c55711906557?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sjmaH7PnE2rtPopdwj4WjwuMh7VhiaevLwS6LGEg~G5Cd2CiWZ3iNKePqgv1vY4GeCEydyG4Vf4vinhnTYKgOC87~5k3lvsZpR3AcyuVstmaFIag8Cylfd7yLCHS9QsLRjw9VhQ-yVAGt-KXFZWDZuoT~VzWyko617lK52pw29f~PHq0y0D7BOwKXJbMFgy1jUir14lI1-2SrLzS8kO1gu8R8hNFPyjvdBRsQe4emxx9YTSIVpY~K4bYg6MaFSU18ldWR5M4VDMvW1Q3gq-EPjZaC3wUCVdMcPiX7QnOfdK8asQczDg645Zsz4Ci9CMl860lRTB~FeEDsbbO~vpwZQ__";

function selectFirstServiceBox() {
    const serviceBoxes = document.querySelectorAll(".box-service");
    const displayService = document.querySelector(".display-service");
    const serviceNameInput = document.querySelector(".service-name input");
    const serviceDescriptionTextarea = document.querySelector(".service-description textarea");
    const selectedImage = document.querySelector("#selected-image");

    if (serviceBoxes.length > 0 && displayService && serviceNameInput && serviceDescriptionTextarea && selectedImage) {
        const firstServiceBox = serviceBoxes[0];
        const serviceName = firstServiceBox.querySelector("p").innerText;
        const serviceImage = firstServiceBox.querySelector("img").src;

        displayService.style.display = "block";
        serviceNameInput.value = serviceName;
        serviceDescriptionTextarea.value = serviceName;

        selectedImage.src = serviceImage;

        serviceBoxes.forEach(b => b.classList.remove("active")); 
        firstServiceBox.classList.add("active");
        
        document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    updateActiveMenu(window.location.href);
    initializePageEvents();
    if (window.location.href.includes('service-configuration')) {
        selectFirstServiceBox(); 
    }
});
