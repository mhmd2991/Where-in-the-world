const selectBox = document.querySelector('#selectBox'),
    darkMode = document.querySelector('#darkMode'),
    darkModeIcon = document.querySelector('#darkMode i');

selectBox.addEventListener("click", () => {
    selectBox.classList.toggle('active');
});

darkMode.addEventListener("click", () => {
    darkMode.classList.toggle('active');
    darkModeIcon.classList.toggle('fa-moon');
    if (darkModeIcon.classList.contains('fa-moon')) {
        document.documentElement.style.setProperty("--veryLightGray", "hsl(207, 26%, 17%)");
        document.documentElement.style.setProperty("--white", "hsl(209, 23%, 22%)");
        document.documentElement.style.setProperty("--darkBlueText", "hsl(0, 0%, 100%)");
    } else {
        document.documentElement.style.setProperty("--veryLightGray", "hsl(0, 0%, 98%)");
        document.documentElement.style.setProperty("--white", "hsl(0, 0%, 100%)");
        document.documentElement.style.setProperty("--darkBlueText", "hsl(209, 23%, 22%)");
    }
});