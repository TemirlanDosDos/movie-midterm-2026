document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');

  if (!form) {
    return;
  }

  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm');
  const nameFeedback = document.getElementById('name-feedback');
  const emailFeedback = document.getElementById('email-feedback');
  const passwordFeedback = document.getElementById('password-feedback');
  const confirmFeedback = document.getElementById('confirm-feedback');
  const strengthBar = document.getElementById('password-strength-bar');
  const strengthText = document.getElementById('password-strength');
  const alertBox = document.getElementById('register-alert');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showFeedback(input, feedback, valid, message) {
    input.classList.toggle('is-valid', valid);
    input.classList.toggle('is-invalid', !valid);
    feedback.textContent = message;
    feedback.classList.toggle('text-success', valid);
    feedback.classList.toggle('text-danger', !valid);
    return valid;
  }

  function validateName() {
    const valid = nameInput.value.trim() !== '';
    return showFeedback(nameInput, nameFeedback, valid, valid ? 'Looks good.' : 'Name is required.');
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    let message = 'Enter a valid email address.';

    if (email === '') {
      message = 'Email is required.';
    }

    const valid = email !== '' && emailPattern.test(email);
    return showFeedback(emailInput, emailFeedback, valid, valid ? 'Email format is valid.' : message);
  }

  function getPasswordStrength(password) {
    if (password === '') {
      return { name: 'not entered', width: '0%', className: '' };
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const differentTypes = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

    if (password.length >= 10 && differentTypes === 4) {
      return { name: 'strong', width: '100%', className: 'strong' };
    }

    if (password.length >= 8 && differentTypes >= 2) {
      return { name: 'medium', width: '66%', className: 'medium' };
    }

    return { name: 'weak', width: '33%', className: 'weak' };
  }

  function validatePassword() {
    const password = passwordInput.value;
    const strength = getPasswordStrength(password);
    const valid = password !== '';

    strengthBar.style.width = strength.width;
    strengthBar.className = strength.className;
    strengthText.textContent = 'Password strength: ' + strength.name;

    return showFeedback(passwordInput, passwordFeedback, valid, valid ? '' : 'Password is required.');
  }

  function validateConfirmation() {
    const confirmation = confirmInput.value;
    let message = 'Passwords do not match.';

    if (confirmation === '') {
      message = 'Please confirm your password.';
    }

    const valid = confirmation !== '' && confirmation === passwordInput.value;
    return showFeedback(confirmInput, confirmFeedback, valid, valid ? 'Passwords match.' : message);
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', function () {
    validatePassword();
    if (confirmInput.value !== '') {
      validateConfirmation();
    }
  });
  confirmInput.addEventListener('input', validateConfirmation);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();
    const confirmationIsValid = validateConfirmation();
    const formIsValid = nameIsValid && emailIsValid && passwordIsValid && confirmationIsValid;

    alertBox.classList.remove('d-none', 'alert-success', 'alert-danger');

    if (!formIsValid) {
      alertBox.classList.add('alert-danger');
      alertBox.textContent = 'Please correct the highlighted fields.';
      form.querySelector('.is-invalid').focus();
      return;
    }

    alertBox.classList.add('alert-success');
    alertBox.textContent = 'Registration form is valid. No data was sent because this is a student demo.';
  });
});
