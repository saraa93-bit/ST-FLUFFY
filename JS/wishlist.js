document.addEventListener('DOMContentLoaded', function () {
    const wishlistContainer = document.getElementById('wishlist');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // تحميل المفضلة

    // إذا لم يكن هناك منتجات في المفضلة
    if (favorites.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    // تحميل المنتجات من API أو localStorage
    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(products => {
            // تصفية المنتجات المفضلة
            const favoriteProducts = products.filter(product => favorites.includes(product.id));

            // عرض المنتجات المفضلة
            favoriteProducts.forEach(product => {
                const listItem = document.createElement('li');
                listItem.classList.add('wishlist-item');
                listItem.innerHTML = `
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}" class="wishlist-image">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price} L.E</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromWishlist('${product.id}')">Remove</button>
                `;
                wishlistContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
            wishlistContainer.innerHTML = '<p>Failed to load wishlist.</p>';
        });
});

// دالة لإزالة المنتج من المفضلة
function removeFromWishlist(productId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to remove the product from your wishlist?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.indexOf(productId);

            if (index !== -1) {
                favorites.splice(index, 1); // إزالة المنتج من المفضلة
                localStorage.setItem('favorites', JSON.stringify(favorites));
                Swal.fire({
                    icon: 'success',
                    title: 'Removed!',
                    text: 'The product has been removed from your wishlist.',
                    showConfirmButton: false,
                    timer: 1500
                });

                // إعادة تحميل الصفحة لتحديث القائمة
                setTimeout(() => location.reload(), 1500);
            }
        }
    });
}