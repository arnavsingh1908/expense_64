const API = "http://localhost:8081/expenses";

function loadExpenses() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let table = document.getElementById("expenseTable");
            table.innerHTML = "";
            data.forEach(e => {
                table.innerHTML += `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.amount}</td>
                    <td>${e.description}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteExpense(${e.id})">Delete</button>
                    </td>
                </tr>`;
            });
        });
}

function addExpense() {
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;

    fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount, description})
    }).then(() => {
        loadExpenses();
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
    });
}

function deleteExpense(id) {
    fetch(`${API}/${id}`, {method: "DELETE"})
        .then(() => loadExpenses());
}

loadExpenses();
