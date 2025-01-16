document.addEventListener('DOMContentLoaded', function() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const ordersContainer = document.getElementById('orders-container');
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>No orders yet.</p>';
    } else {
        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.classList.add('order');
            orderElement.innerHTML = `
                <h3>Order: ${order.name}</h3>
                <p>Email: ${order.email}</p>
                <p>Phone: ${order.phone}</p>
                <p>Address: ${order.address}</p>
                <p>Payment: ${order.payment}</p>
                <p>Items:</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} - ${item.price} L.E</li>`).join('')}
                </ul>
            `;
            ordersContainer.appendChild(orderElement);
        });
    }
});
