document.addEventListener('DOMContentLoaded', function() {
    const ordersTableBody = document.getElementById('orders-body');

    fetch('http://localhost:5000/orders')
        .then(response => response.json())
        .then(data => {
            ordersTableBody.innerHTML = '';
            
            data.forEach(order => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customerName}</td>
                    <td>${order.product}</td>
                    <td>${order.quantity}</td>
                    <td>${order.price}</td>
                    <td>
                        <button class="confirm" onclick="confirmOrder(${order.id})">تأكيد</button>
                        <button class="delete" onclick="deleteOrder(${order.id})">حذف</button>
                    </td>
                `;
                
                ordersTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
});

function confirmOrder(orderId) {
    alert(`order placed${orderId}`);
    // Add further code here to handle confirming the order
}

// Function to delete order
function deleteOrder(orderId) {
    // Here, you can send a DELETE request to the server to delete the order
    fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        alert(`order ${orderId} is removed`);
        // Remove the row from the table after deletion
        const row = document.querySelector(`tr[data-order-id="${orderId}"]`);
        row.remove();
    })
    .catch(error => {
        console.error('Error while deleting order:', error);
    });
}
