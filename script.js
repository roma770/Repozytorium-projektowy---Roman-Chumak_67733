async function loadCVData() {
    try {
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error('Błąd podczas ładowania pliku JSON');
        }

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
        console.error('Wystąpił błąd:', error);
        document.getElementById('umiejetnosci-list').innerHTML = "<li>Nie udało się załadować danych.</li>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    loadCVData(); 
});