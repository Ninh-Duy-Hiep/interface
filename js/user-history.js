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