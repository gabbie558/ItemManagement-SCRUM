// Search functionality script
function searchItems() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const category = row.cells[4].textContent.toLowerCase();
        if (name.includes(input) || category.includes(input)) {
            row.style.display = ''; // Show row
        } else {
            row.style.display = 'none'; // Hide row
        }
    });
}

// Add search functionality on keyup event
document.getElementById('searchBar').addEventListener('keyup', searchItems);

// Optionally, add search functionality when clicking the Search button
document.getElementById('searchButton').addEventListener('click', searchItems);
