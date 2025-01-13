function fetchOrderHistory() {
    fetch('orders.json')
        .then(response => response.json())
        .then(orders => {
            const orderList = document.getElementById('orderList');
            orders.forEach(order => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>Order ID: ${order.id}</h3>
                    <p>Status: ${order.status}</p>
                    <p>Items: ${order.items.join(', ')}</p>
                    <p>Total: $${order.total}</p>
                `;
                orderList.appendChild(listItem);
            });
        });
}

fetchOrderHistory();
