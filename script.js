document.addEventListener("DOMContentLoaded", () => {
    
    const themeBtn = document.getElementById("themeToggleBtn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("theme-green");
        document.body.classList.toggle("theme-red");
        
        const isRed = document.body.classList.contains("theme-red");
        themeBtn.textContent = isRed ? "Zmień motyw na zielony" : "Zmień motyw na czerwony";
    });

    const toggleSecBtn = document.getElementById("toggleSectionBtn");
    const sectionContent = document.getElementById("sectionContent");
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

        const showError = (id, msg) => {
            document.getElementById(`error-${id}`).textContent = msg;
            isValid = false;
        };

        if (!imie) showError("imie", "Imię jest wymagane.");
        else if (/\d/.test(imie)) showError("imie", "Imię nie może mieć cyfr.");

        if (!nazwisko) showError("nazwisko", "Nazwisko jest wymagane.");
        else if (/\d/.test(nazwisko)) showError("nazwisko", "Nazwisko nie może mieć cyfr.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) showError("email", "E-mail jest wymagany.");
        else if (!emailRegex.test(email)) showError("email", "Niepoprawny format e-mail.");

        if (!wiadomosc) showError("wiadomosc", "Wpisz treść wiadomości.");

        if (isValid) {
            successMsg.style.display = "block";
            form.reset();
        }
    });

    async function loadCVData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Błąd pliku JSON');
            const data = await response.json();

             
            const skillsList = document.getElementById('umiejetnosci-list');
            data.umiejetnosci.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            const expList = document.getElementById('doswiadczenie-list');
            data.doswiadczenie.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.rok}:</strong> ${item.tytul} - <em>${item.opis}</em>`;
                expList.appendChild(li);
            });
        } catch (error) {
            console.error('Błąd Fetch:', error);
        }
    }

    loadCVData();
});