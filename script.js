document.addEventListener("DOMContentLoaded", () => {
    
    const themeBtn = document.getElementById("themeToggleBtn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("theme-green");
        document.body.classList.toggle("theme-red");
        
        const isRed = document.body.classList.contains("theme-red");
        themeBtn.textContent = isRed ? "🎨 Motyw: Czerwony" : "🎨 Motyw: Zielony";
    });

    const toggleSecBtn = document.getElementById("toggleSectionBtn");
    const sectionContent = document.getElementById("sectionContent");
    
    toggleSecBtn.addEventListener("click", () => {
        if (sectionContent.style.display === "none") {
            sectionContent.style.display = "block";
            toggleSecBtn.textContent = "Ukryj";
        } else {
            sectionContent.style.display = "none";
            toggleSecBtn.textContent = "Pokaż";
        }
    });

    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        const fields = ["imie", "nazwisko", "email", "wiadomosc"];
        fields.forEach(id => {
            const val = document.getElementById(id).value.trim();
            const errorEl = document.getElementById(`error-${id}`);
            errorEl.textContent = ""; 

            if (!val) {
                errorEl.textContent = "To pole jest wymagane!";
                isValid = false;
            } else if ((id === 'imie' || id === 'nazwisko') && /\d/.test(val)) {
                errorEl.textContent = "Nie może zawierać cyfr!";
                isValid = false;
            } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                errorEl.textContent = "Błędny format e-mail!";
                isValid = false;
            }
        });

        if (isValid) {
            successMsg.style.display = "block";
            form.reset();
            setTimeout(() => { successMsg.style.display = "none"; }, 5000);
        }
    });

    async function loadData() {
        const skillsList = document.getElementById('umiejetnosci-list');
        const expList = document.getElementById('doswiadczenie-list');

        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error();
            const data = await response.json();

            skillsList.innerHTML = "";
            expList.innerHTML = "";

            data.umiejetnosci.forEach(s => {
                const li = document.createElement('li');
                li.textContent = s;
                skillsList.appendChild(li);
            });

            data.doswiadczenie.forEach(ex => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${ex.rok}</strong>: ${ex.tytul} <br> <small>${ex.opis}</small>`;
                expList.appendChild(li);
            });

        } catch (e) {
            skillsList.innerHTML = "<li>⚠️ Błąd ładowania (uruchom przez Live Server)</li>";
            expList.innerHTML = "<li>⚠️ Nie udało się pobrać danych z pliku JSON.</li>";
        }
    }

    loadData();
});