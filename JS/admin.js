document.addEventListener("DOMContentLoaded", async () => {
    const userTableBody = document.getElementById("userTableBody");

    const style = document.createElement('style');
    style.textContent = `
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
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
            border-radius: 5px;
        }

        button:hover {
            opacity: 0.9;
        }

        button:nth-child(1) {
            background-color: #4CAF50;
            color: white;
        }

        button:nth-child(2) {
            background-color: #f44336;
            color: white;
        }
    `;
    document.head.appendChild(style);

    async function loadUsers() {
        try {
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    function renderUsers(users) {
        userTableBody.innerHTML = "";
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="window.location.href = '../HTML/edit-user.html?id=${user.id}'">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
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

    window.deleteUser = async (index) => {
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
                const response = await fetch('http://localhost:5000/users');
                let users = await response.json();
                
                users.splice(index, 1);
                Swal.fire('Deleted!', 'User deleted successfully!', 'success');
                renderUsers(users);
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
