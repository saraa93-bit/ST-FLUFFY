document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('productName').value.trim();
            const description = document.getElementById('productDescription').value.trim();
            const imageFile = document.getElementById('productImage').files[0];
            const price = document.getElementById('productPrice').value.trim();

            clearErrors();

            let isValid = true;

            if (!name || name.length < 3) {
                showError('nameError', 'Product name must be at least 3 characters');
                isValid = false;
            }

            if (!description || description.length < 10) {
                showError('descriptionError', 'Description must be at least 10 characters');
                isValid = false;
            }

            if (!imageFile) {
                showError('imageError', 'Please upload a product image');
                isValid = false;
            }

            if (!price || parseFloat(price) <= 0) {
                showError('priceError', 'Price must be a positive number');
                isValid = false;
            }

            if (!isValid) return;

            const reader = new FileReader();
            reader.onload = async function () {
                const imageBase64 = reader.result;

                const newProduct = {
                    name,
                    description,
                    image: imageBase64,
                    price: parseFloat(price)
                };

                try {
                    const response = await fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newProduct)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to add product');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added!',
                        text: 'Your product has been added successfully.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = "../HTML/sellerProducts.html";
                    });

                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add the product. Please try again later.',
                        confirmButtonText: 'OK'
                    });
                }
            };

            reader.readAsDataURL(imageFile);
        });
    }

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
    }
});
