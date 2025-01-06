let cart = [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    alert(`${productName} has been added to the cart!`);
}