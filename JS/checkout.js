const cartItems = [
    { id: 1, name: "Chocolate Cake", price: 15.99 },
    { id: 2, name: "Vanilla Cupcake", price: 7.99 }
];

function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price;
    });
    return total;
}

function placeOrder() {
    const user = {
        id: Math.floor(Math.random() * 1000),
        name: "John Doe"
    };

    const order = {
        id: Math.floor(Math.random() * 10000),
        userId: user.id,
        userName: user.name,
        products: cartItems.map(item => item.name),
        totalPrice: calculateTotal(),
        date: new Date().toISOString()
    };

    const confirmOrder = confirm("Are you sure you want to place this order?");
    if (confirmOrder) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order placed. We will contact you soon!");
    } else {
        alert("Order canceled.");
    }
}

document.querySelector(".place-order-btn").addEventListener("click", placeOrder);
