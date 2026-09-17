// js/forms.js

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.relative');
            if (!container) return;
            const input = container.querySelector('input');
            const eyeOpen = button.querySelector('.eye-open');
            const eyeClosed = button.querySelector('.eye-closed');
            
            if (input.type === 'password') {
                input.type = 'text';
                if (eyeOpen) eyeOpen.classList.add('hidden');
                if (eyeClosed) eyeClosed.classList.remove('hidden');
            } else {
                input.type = 'password';
                if (eyeOpen) eyeOpen.classList.remove('hidden');
                if (eyeClosed) eyeClosed.classList.add('hidden');
            }
        });
    });

    // Utility for showing/hiding error
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.innerText = message;
            errorDisplay.classList.remove('hidden');
        }
        input.classList.add('border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'dark:border-gray-600', 'focus:ring-blue-600');
    };

    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.innerText = '';
            errorDisplay.classList.add('hidden');
        }
        input.classList.remove('border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'dark:border-gray-600', 'focus:ring-blue-600');
    };

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }

            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                // Simulate form submission
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                btn.disabled = true;
                setTimeout(() => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('email');
            const password = document.getElementById('password');

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }

            if (!password.value.trim()) {
                showError(password, 'Password is required');
                isValid = false;
            } else {
                clearError(password);
            }

            if (isValid) {
                const btn = loginForm.querySelector('button[type="submit"]');
                btn.innerText = 'Logging in...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        });
    }

    // Signup Form Validation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const firstname = document.getElementById('firstname');
            const lastname = document.getElementById('lastname');
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const terms = document.getElementById('terms');

            if (firstname) {
                if (!firstname.value.trim()) {
                    showError(firstname, 'First name is required');
                    isValid = false;
                } else {
                    clearError(firstname);
                }
            }

            if (lastname) {
                if (!lastname.value.trim()) {
                    showError(lastname, 'Last name is required');
                    isValid = false;
                } else {
                    clearError(lastname);
                }
            }

            if (fullname) {
                if (!fullname.value.trim()) {
                    showError(fullname, 'Full name is required');
                    isValid = false;
                } else {
                    clearError(fullname);
                }
            }

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }

            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else {
                clearError(phone);
            }

            if (!password.value.trim()) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError(password);
            }

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            } else if (!confirmPassword.value.trim()) {
                showError(confirmPassword, 'Please confirm your password');
                isValid = false;
            } else {
                clearError(confirmPassword);
            }

            if (!terms.checked) {
                const termsGroup = terms.closest('.form-group');
                const err = termsGroup.querySelector('.error-message');
                err.innerText = 'You must accept the terms and conditions';
                err.classList.remove('hidden');
                isValid = false;
            } else {
                const termsGroup = terms.closest('.form-group');
                const err = termsGroup.querySelector('.error-message');
                err.classList.add('hidden');
            }

            if (isValid) {
                const btn = signupForm.querySelector('button[type="submit"]');
                btn.innerText = 'Creating Account...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }
});
