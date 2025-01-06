// Toggle password visibility
function togglePasswordVisibility() {
  const passwordField = document.querySelector('input[name="password"]');
  const toggleIcon = document.querySelector('.toggle-password i');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    passwordField.type = 'password';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
}

// Form validation function
function validateForm(event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('emailError').innerText = '';
  document.getElementById('passwordError').innerText = '';

  // Get the form elements
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');
  let valid = true;

  // Validate email field
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    document.getElementById('emailError').innerText = 'Email is required.';
    valid = false;
  } else if (!emailPattern.test(email.value)) {
    document.getElementById('emailError').innerText = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate password field
  if (!password.value) {
    document.getElementById('passwordError').innerText = 'Password is required.';
    valid = false;
  }

  // If the form is valid, submit it
  if (valid) {
    document.getElementById('successMessage').innerText = 'Login successful!';
    // You can proceed with form submission or other actions here.
  } else {
    document.getElementById('Error').innerText = 'Please fill in all fields correctly.';
  }
}

// Attach the validation function to the form submission
document.getElementById('loginForm').addEventListener('submit', validateForm);
