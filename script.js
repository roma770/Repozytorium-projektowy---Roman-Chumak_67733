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

    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        let isValid = true;

        const imie = document.getElementById("imie").value.trim();
        const nazwisko = document.getElementById("nazwisko").value.trim();
        const email = document.getElementById("email").value.trim();
        const wiadomosc = document.getElementById("wiadomosc").value.trim();

        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
        successMsg.style.display = "none";

        const showError = (id, message) => {
            document.getElementById(`error-${id}`).textContent = message;
            isValid = false;
        };

        if (imie === "") {
            showError("imie", "Pole Imię jest wymagane.");
        } else if (/\d/.test(imie)) { 
            showError("imie", "Imię nie może zawierać cyfr.");
        }

        if (nazwisko === "") {
            showError("nazwisko", "Pole Nazwisko jest wymagane.");
        } else if (/\d/.test(nazwisko)) {
            showError("nazwisko", "Nazwisko nie może zawierać cyfr.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (email === "") {
            showError("email", "Pole E-mail jest wymagane.");
        } else if (!emailRegex.test(email)) {
            showError("email", "Podaj poprawny adres e-mail.");
        }

        if (wiadomosc === "") {
            showError("wiadomosc", "Pole Wiadomość jest wymagane.");
        }

        if (isValid) {
            successMsg.style.display = "block";
            form.reset(); 
        }
    });
});