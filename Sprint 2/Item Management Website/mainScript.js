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

document.addEventListener("DOMContentLoaded", function(){
    fetchItems();
});

async function fetchItems() {
    const response = await fetch('https://localhost/item_management/items.php');
    const item = await response.json();

    const tableBody = document.querySelector("#itemTable tBody");
    tableBody.innerHTML = "";

    item.forEach(item => {
        const row = `
            <tr> 
                <td>${item.itemNumber}</td>
                <td>${item.name}</td>
                <td>P ${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${item.category}</td>
                <td class = "action-buttons">
                    <button onclick="editItem(${item.id})">Edit</button>
                    <button class = "delete" onclick="deleteItem(${item.id})">Delete</button>
                </td>
                </tr>
        `;
            tableBody.insertAdjacentHTML('beforeend', row);
    });

}
async function addItem() {
        const newItem = {
            itemNumber: document.querySelector("#itemNumber").value,
            name: document.querySelector("#itemName").value,
            price: document.querySelector("#itemPrice").value,
            quantity: document.querySelector("#itemQuantity").value,
            category: document.querySelector("#itemCategory").value
        };

        await fetch('http://localhost/item_management/items.php', {
           method: 'POST',
           body: JSON.stringify(newItem)
        });

        fetchItems();
}
async function editItem(id) {
        const updateItem = {
             itemNumber: document.querySelector("#itemNumber").value,
             name: document.querySelector("#itemName").value,
             price: document.querySelector("#itemPrice").value,
             quantity: document.querySelector("#itemQuantity").value,
             category: document.querySelector("#itemCategory").value
        };

        await fetch(`http://localhost/item_management/items.php?=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateItem)
        });

        fetchItems();
}
async function deleteItem(id) {
    await fetch(`https://localhost/item_management/items.php?id=${id}`,{
        method: 'DELETE'
    });
    fetchItems();
}    

