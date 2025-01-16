document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    let uploadedImage = null;

    async function fetchProduct() {
        try {
            const response = await fetch(`http://localhost:5000/products/${productId}`);
            const product = await response.json();

            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productImage').src = product.image;

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
                const updatedProduct = {
                    id: document.getElementById('productId').value.trim(),
                    name: document.getElementById('productName').value.trim(),
                    description: document.getElementById('productDescription').value.trim(),
                    price: parseFloat(document.getElementById('productPrice').value.trim()),
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
