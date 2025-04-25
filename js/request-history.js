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