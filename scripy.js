document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("themeToggleBtn");
    const toggleSecBtn = document.getElementById("toggleSectionBtn");
    const sectionContent = document.getElementById("sectionContent");

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("theme-green");
        document.body.classList.toggle("theme-red");
        
        const isRed = document.body.classList.contains("theme-red");
        themeBtn.textContent = isRed ? "Zmień motyw na zielony" : "Zmień motyw na czerwony";
    });

    toggleSecBtn.addEventListener("click", () => {
        if (sectionContent.style.display === "none") {
            sectionContent.style.display = "block";
            toggleSecBtn.textContent = "Ukryj sekcję";
        } else {
            sectionContent.style.display = "none";
            toggleSecBtn.textContent = "Pokaż sekcję";
        }
    });
});