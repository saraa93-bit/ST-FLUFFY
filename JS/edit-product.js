document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productsTableBody = document.getElementById('productsTableBody');
    let uploadedImage = null;

    async function fetchProduct() {
        try {
            const response = await fetch(`http://localhost:5000/products/${productId}`);
            const product = await response.json();

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td contenteditable="true" data-field="name">${product.name}</td>
                <td contenteditable="true" data-field="description">${product.description}</td>
                <td contenteditable="true" data-field="price">${product.price}</td>
                <td>
                    <img id="productImage" src="${product.image}" alt="Product Image" width="150"><br>
                    <input type="file" id="imageUpload" accept="image/*">
                </td>
            `;
            row.dataset.productId = product.id;
            productsTableBody.appendChild(row);

            document.getElementById('imageUpload').addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById('productImage').src = e.target.result;
                        uploadedImage = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    await fetchProduct();

    document.getElementById('saveChanges').addEventListener('click', async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save the changes?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it',
            cancelButtonText: 'No, cancel',
        });

        if (result.isConfirmed) {
            try {
                const row = document.querySelector('#productsTableBody tr');
                const updatedProduct = {
                    id: row.cells[0].textContent.trim(),
                    name: row.cells[1].textContent.trim(),
                    description: row.cells[2].textContent.trim(),
                    price: parseFloat(row.cells[3].textContent.trim()),
                    image: uploadedImage || document.getElementById('productImage').src
                };

                await fetch(`http://localhost:5000/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });

                Swal.fire('Saved!', 'Product updated successfully!', 'success');
                window.location.href = '../HTML/manage-product.html';
            } catch (error) {
                Swal.fire('Error', 'Failed to save the changes.', 'error');
            }
        } else {
            Swal.fire('Cancelled', 'No changes were saved.', 'info');
        }
    });
});
