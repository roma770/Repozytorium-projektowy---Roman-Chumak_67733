document.addEventListener("DOMContentLoaded", () => {

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const skillsList = document.getElementById("umiejetnosci-list");
            skillsList.innerHTML = data.umiejetnosci.map(s => `<li>${s}</li>`).join("");

            const expList = document.getElementById("doswiadczenie-list");
            expList.innerHTML = data.doswiadczenie.map(e => 
                `<li><strong>${e.rok}</strong> - ${e.tytul}<br><small>${e.opis}</small></li>`
            ).join("");
        })
        .catch(() => console.log("Upewnij się, że plik data.json istnieje!"));

  
    const noteInput = document.getElementById("noteInput");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const notesList = document.getElementById("notes-list");

    function renderNotes() {
        const notes = JSON.parse(localStorage.getItem("notes_67733")) || [];
        notesList.innerHTML = "";
        
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            li.className = "note-item";
            li.innerHTML = `
                <span>${note}</span>
                <button class="btn-delete" onclick="deleteNote(${index})">Usuń</button>
            `;
            notesList.appendChild(li);
        });
    }

    addNoteBtn.addEventListener("click", () => {
        const val = noteInput.value.trim();
        if (!val) return;

        const notes = JSON.parse(localStorage.getItem("notes_67733")) || [];
        notes.push(val);
        localStorage.setItem("notes_67733", JSON.stringify(notes));
        
        noteInput.value = "";
        renderNotes();
    });

  
    window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes_67733")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes_67733", JSON.stringify(notes));
        renderNotes();
    };

    renderNotes();

    document.getElementById("themeToggleBtn").addEventListener("click", () => {
        document.body.classList.toggle("theme-red");
    });

    const toggleBtn = document.getElementById("toggleSectionBtn");
    const expSectionList = document.getElementById("doswiadczenie-list");
    toggleBtn.addEventListener("click", () => {
        const isHidden = expSectionList.style.display === "none";
        expSectionList.style.display = isHidden ? "block" : "none";
        toggleBtn.innerText = isHidden ? "Ukryj" : "Pokaż";
    });

    const contactForm = document.getElementById("contactForm");
    const successBanner = document.getElementById("form-success");
    const backendURL = "https://formspree.io/f/xpqkvqar";

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const data = {
            imie: document.getElementById("imie").value,
            nazwisko: document.getElementById("nazwisko").value,
            email: document.getElementById("email").value,
            wiadomosc: document.getElementById("wiadomosc").value,
            index: "67733"
        };

        let valid = true;
        if (!data.imie) { document.getElementById("error-imie").innerText = "Podaj imię"; valid = false; }
        if (!data.email.includes("@")) { document.getElementById("error-email").innerText = "Zły email"; valid = false; }

        if (!valid) return;

        const btn = document.getElementById("submitBtn");
        btn.disabled = true;
        btn.innerText = "Wysyłanie...";

        try {
            const response = await fetch(backendURL, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                successBanner.style.display = "block";
                successBanner.innerText = "✅ Sukces! ";
                contactForm.reset();
            }
        } catch (err) {
            alert("Błąd połączenia!");
        } finally {
            btn.disabled = false;
            btn.innerText = "Wyślij na serwer";
        }
    });
});