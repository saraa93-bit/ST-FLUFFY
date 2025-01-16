window.addEventListener("DOMContentLoaded", async () => {
    const userTableBody = document.getElementById("userTableBody");

    const style = document.createElement('style');
    style.textContent = `
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border-radius: 15px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #333;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }

        button {
            padding: 8px 12px;
            margin: 2px;
            border: none;
            cursor: pointer;
            border-radius: 12px;
        }

        button:hover {
            opacity: 0.9;
        }

        button:nth-child(1) {
            background-color: #f44336;
            color: white;
        }
    `;
    document.head.appendChild(style);

    async function loadUsers() {
        try {
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();
            if (Array.isArray(users) && users.length > 0) {
                renderUsers(users);
            } else {
                console.error("No users found or invalid data format.");
            }
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    function renderUsers(users) {
        userTableBody.innerHTML = "";
        users.forEach((user) => {
            const row = document.createElement("tr");

            const userName = user.username || user.name;

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${userName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    window.openForm = function(formId) {
        document.querySelectorAll('.admin-form').forEach(form => {
            form.style.display = 'none';
        });
        document.getElementById(formId).style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(error => error.innerText = '');
    }

    function validateField(id, errorId, message) {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            document.getElementById(errorId).innerText = message;
            return false;
        }
        return true;
    }

    window.deleteUser = async (userId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to delete this user?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                // أرسل طلب DELETE للسيرفر
                const deleteResponse = await fetch(`http://localhost:5000/users/${userId}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    Swal.fire('Deleted!', 'User deleted successfully!', 'success');
                    loadUsers(); // إعادة تحميل البيانات بعد الحذف
                } else {
                    throw new Error('Failed to delete user on the server');
                }
            } else {
                Swal.fire('Cancelled', 'User was not deleted', 'info');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire('Error', 'There was an error deleting the user.', 'error');
        }
    };

    loadUsers();
});
