document.addEventListener("DOMContentLoaded", () => {
    
  
    const themeBtn = document.getElementById("themeToggleBtn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("theme-green");
        document.body.classList.toggle("theme-red");
        const isRed = document.body.classList.contains("theme-red");
        themeBtn.textContent = isRed ? " Motyw: Czerwony" : " Motyw: Zielony";
    });

    async function loadData() {
        const skillsList = document.getElementById('umiejetnosci-list');
        const expList = document.getElementById('doswiadczenie-list');

        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error("Błąd pliku");
            const data = await response.json();

            skillsList.innerHTML = data.umiejetnosci.map(s => `<li>${s}</li>`).join('');
            expList.innerHTML = data.doswiadczenie.map(ex => 
                `<li><strong>${ex.rok}</strong>: ${ex.tytul} <br><small>${ex.opis}</small></li>`
            ).join('');
        } catch {
            skillsList.innerHTML = "<li>⚠️ Uruchom przez Live Server!</li>";
        }
    }
    loadData();

    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notes-list');

    let notes = JSON.parse(localStorage.getItem('notes_67733')) || [];
    
    function renderNotes() {
        notesList.innerHTML = notes.map((note, index) => `
            <li class="note-item">
                <span>${note}</span>
                <button onclick="removeNote(${index})" class="btn-delete">Usuń</button>
            </li>
        `).join('');
        localStorage.setItem('notes_67733', JSON.stringify(notes));
    }

    addNoteBtn.addEventListener('click', () => {
        const val = noteInput.value.trim();
        if (val) {
            notes.push(val);
            noteInput.value = "";
            renderNotes();
        }
    });

    window.removeNote = (index) => {
        notes.splice(index, 1);
        renderNotes();
    };
    renderNotes();

    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;

        ["imie", "nazwisko", "email", "wiadomosc"].forEach(id => {
            const el = document.getElementById(id);
            const errorEl = document.getElementById(`error-${id}`);
            errorEl.textContent = el.value.trim() ? "" : "Wymagane!";
            if (!el.value.trim()) isValid = false;
        });

        if (!isValid) return;

        const formData = {
            imie: document.getElementById("imie").value,
            nazwisko: document.getElementById("nazwisko").value,
            email: document.getElementById("email").value,
            wiadomosc: document.getElementById("wiadomosc").value
        };

        try {
            await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            successMsg.style.display = "block";
            form.reset();

            setTimeout(() => {
                successMsg.style.display = "none";
            }, 4000);

        } catch (err) {
            alert("Błąd wysyłki formularza!");
            console.error(err);
        }
    });
});