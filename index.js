window.onload = function() {
    const today = new Date().toDateString(); 
    if (localStorage.getItem('date') !== today) {
        localStorage.clear();
        localStorage.setItem('date', today); 
    }
};
function isValidAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

const form = document.getElementById('registration-form');
const entriesTableBody = document.getElementById('entries-table-body');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!isValidAge(dob)) {
        alert("Date of birth must be between ages 18 and 55.");
        return;
    }
    const entry = { name, email, password, dob, termsAccepted };
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    addEntryToTable(entry);
});
function addEntryToTable(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.termsAccepted ? 'true' : 'false'}</td>
    `;
    entriesTableBody.appendChild(row);
}
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(addEntryToTable);
}

loadEntries();
