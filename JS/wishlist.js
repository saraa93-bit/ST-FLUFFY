let wishlist = [];

function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist');
    wishlistContainer.innerHTML = '';
    wishlist.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `${item.name} - $${item.price}`;
        wishlistContainer.appendChild(itemElement);
    });
}

displayWishlist();
