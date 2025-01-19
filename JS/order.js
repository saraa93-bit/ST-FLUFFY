document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load orders');
            }
            return response.json();
        })
        .then(orders => {
            console.log('Orders:', orders);
            const ordersBody = document.getElementById('orders-body');

            if (orders.length === 0) {
                ordersBody.innerHTML = '<tr><td colspan="6">No orders yet.</td></tr>';
            } else {
                orders.forEach(order => {
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
                    ordersBody.appendChild(row);
                });

                document.querySelectorAll('.confirm-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        alert(`Order ${orderId} Confirmed`);
                    });
                });

                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        alert(`Editing Order ${orderId}`);
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const orderId = this.dataset.id;
                        if (confirm(`Are you sure you want to delete Order ${orderId}?`)) {
                            alert(`Order ${orderId} Deleted`);
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching orders data:', error);
        });
});