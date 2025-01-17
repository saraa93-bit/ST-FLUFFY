document.addEventListener('DOMContentLoaded', function() {
    // Fetch the data from the JSON file
    fetch('http://localhost:5000/orders.json')
        .then(response => response.json())
        .then(orders => {
            const ordersBody = document.getElementById('orders-body');

            // If there are no orders, show a message
            if (orders.length === 0) {
                ordersBody.innerHTML = '<tr><td colspan="6">No orders yet.</td></tr>';
            } else {
                orders.forEach(order => {
                    // Create a new table row for each order
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.orderNumber}</td>
                        <td>${order.customerName}</td>
                        <td>${order.product}</td>
                        <td>${order.totalPrice} L.E</td>
                        <td>${order.construction}</td>
                        <td>
                            <button class="confirm-btn" data-id="${order.orderNumber}">Confirm</button>
                            <button class="edit-btn" data-id="${order.orderNumber}">Edit</button>
                            <button class="delete-btn" data-id="${order.orderNumber}">Delete</button>
                        </td>
                    `;
                    // Append the row to the table body
                    ordersBody.appendChild(row);
                });

                // Event listeners for buttons
                document.querySelectorAll('.confirm-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        alert(`Order ${orderId} Confirmed`);
                        // Handle confirmation logic here
                    });
                });

                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        alert(`Editing Order ${orderId}`);
                        // Handle edit logic here
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        if (confirm(`Are you sure you want to delete Order ${orderId}?`)) {
                            alert(`Order ${orderId} Deleted`);
                            // Handle delete logic here (e.g., removing from JSON, localStorage, etc.)
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching orders data:', error);
        });
});
