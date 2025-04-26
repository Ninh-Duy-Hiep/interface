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

// open modal 
document.addEventListener("DOMContentLoaded", function () {
  const detailContents = document.querySelectorAll(".detail-content");
  const processModal = new bootstrap.Modal(document.getElementById('processModal'));
  const modalTitleSpan = document.querySelector("#processModalLabel span");
  const detailParagraph = document.getElementById("detail");

  detailContents.forEach(detailContent => {
      detailContent.addEventListener("click", function () {
          const row = detailContent.closest(".section-dislay-content");

          const nameLabel = row.querySelector("label");
          const name = nameLabel ? nameLabel.textContent.trim() : "Không rõ";

          const detailText = detailContent.textContent.trim();

          modalTitleSpan.textContent = name + " ";

          detailParagraph.textContent = detailText;

          processModal.show();
      });
  });
});


// pick date 
const $datepicker = $('#datepicker');

$('#datepicker').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
    language: 'vi',
    container: '.datepicker-wrapper'
  });   
  
$('#calendar-icon').on('click', function () {
  $datepicker.datepicker('show');
});
