const hamburger = document.querySelector(".hamburger");
const dropdownMenu = document.getElementById("myDropdown");
// functional for implementing burger menu
let toggle = false;

function show(dropMenu) {
    if (!toggle) {
        dropMenu.style.top = "7.5vh";
        toggle = !toggle;
    } else {
        dropMenu.style.top = "-90vh";
        toggle = !toggle;
    }
}

hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
    show(dropdownMenu);
});