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
                    <button onclick="editUser(${index})">Edit</button>
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

    window.addUser = function() {
        clearErrors();
        
        const nameValid = validateField('userName', 'nameError', 'User Name should not be empty');
        const emailValid = validateField('userEmail', 'emailError', 'Valid Email is required');
        const passwordValid = validateField('userPassword', 'passwordError', 'Password should not be empty');
        const roleValid = validateField('userrole', 'roleError', 'Role should not be empty');
        
        if (!(nameValid && emailValid && passwordValid && roleValid)) {
            Swal.fire('Error', 'Please fix the errors in the form!', 'error');
            return;
        }

        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        const role = document.getElementById('userrole').value;

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        })
        .then(response => response.json())
        .then(() => {
            Swal.fire('Success!', 'User Added Successfully!', 'success');
            loadUsers();
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to add user!', 'error');
        });

        document.getElementById('addUserForm').reset();
        window.location.href = '../HTML/admin.html';
    }

    window.deleteUser = async (index) => {
        try {
            const response = await fetch('http://localhost:5000/users');
            let users = await response.json();
            users.splice(index, 1);
            Swal.fire('Deleted!', 'User deleted successfully!', 'success');
            renderUsers(users);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    loadUsers();
});
