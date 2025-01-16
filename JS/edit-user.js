document.addEventListener("DOMContentLoaded", async () => {
    const usersTable = document.getElementById('usersTableBody');

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();

            usersTable.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="true" data-field="id">${user.id}</td>
                    <td contenteditable="true" data-field="name">${user.name}</td>
                    <td contenteditable="true" data-field="role">${user.role}</td>
                    <td contenteditable="true" data-field="email">${user.email}</td>
                    <td contenteditable="true" data-field="password">${user.password}</td>
                `;
                row.dataset.userId = user.id;
                usersTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    await fetchUsers();

    document.getElementById('saveChangesBtn').addEventListener('click', async () => {
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
                const rows = document.querySelectorAll('#usersTableBody tr');
                for (const row of rows) {
                    const id = row.dataset.userId;
                    const updatedUser = {
                        id: row.cells[0].textContent.trim(),
                        name: row.cells[1].textContent.trim(),
                        role: row.cells[2].textContent.trim(),  // تم تصحيح ترتيب الحقول
                        email: row.cells[3].textContent.trim(), // تم تصحيح ترتيب الحقول
                        password: row.cells[4].textContent.trim()
                    };

                    await fetch(`http://localhost:5000/users/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                    });
                }

                Swal.fire('Saved!', 'User data has been updated.', 'success');
                window.location.href = '../HTML/admin.html';
            } catch (error) {
                Swal.fire('Error', 'Failed to save the changes.', 'error');
            }
        } else {
            Swal.fire('Cancelled', 'No changes were saved.', 'info');
            fetchUsers();
        }
    });
});
