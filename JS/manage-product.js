// manage-products.js
document.addEventListener("DOMContentLoaded", async () => {
    const productTableBody = document.getElementById("productTableBody");

    async function loadProducts() {
        try {
            const response = await fetch('http://localhost:5000/products');
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    function renderProducts(products) {
        productTableBody.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><img src="${product.image}" alt="${product.name}" width="100"></td>
                <td>
                    <button class="edit" onclick="window.location.href = 'edit-product.html?id=${product.id}'">Edit</button>
                    <button class="delete" onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    window.deleteProduct = async (index) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            const response = await fetch('http://localhost:5000/products');
            let products = await response.json();
            products.splice(index, 1);
            Swal.fire('Deleted!', 'Product deleted successfully!', 'success');
            renderProducts(products);
        }
    };

    loadProducts();
});
