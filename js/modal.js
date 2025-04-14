function initializeModalEvents() {
    const processLinks = document.querySelectorAll('.custom-btn-1'); 
    processLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showProcessModal(this);  
        });
    });
}

function showProcessModal(link) {
    const displaySection = link.closest('.display-section');
    if (displaySection) {
        const citizenNameElement = displaySection.querySelector('.name');
        const citizenAddressElement = displaySection.querySelector('.location');
        const serviceTypeElement = displaySection.querySelector('.service-info p');
        const serviceNumberElement = displaySection.querySelector('.number-service');

        if (citizenNameElement && citizenAddressElement && serviceTypeElement && serviceNumberElement) {
            const citizenName = citizenNameElement.textContent.toUpperCase();
            const citizenAddress = citizenAddressElement.textContent;
            const serviceType = serviceTypeElement.textContent.toUpperCase();
            const serviceNumber = serviceNumberElement.textContent;

            const modalTitle = `STT: ${serviceNumber} - ${citizenName} - DV: ${serviceType}`;

            document.getElementById('processModalLabel').textContent = modalTitle;
            document.getElementById('citizenAddress').value = citizenAddress;

            // document.getElementById('processNote').value = '';

            const modalElement = document.getElementById('processModal');
            const processModal = new bootstrap.Modal(modalElement, {
                backdrop: false,
                keyboard: true,
                focus: true
            });

            modalElement.addEventListener('show.bs.modal', function () {
                this.removeAttribute('aria-hidden');
            });

            modalElement.addEventListener('hidden.bs.modal', function () {
                document.getElementById('processNote').value = '';
                link.focus();  
            });

            processModal.show();

            modalElement.addEventListener('shown.bs.modal', function () {
                document.getElementById('processNote').focus();
            });
        } else {
            console.error("Một hoặc nhiều phần tử cần thiết không tồn tại trong .display-section.");
        }
    } else {
        console.error("Không tìm thấy .display-section.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeModalEvents();
});
