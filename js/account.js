document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signin-form');
  if (!form) return;

  const storageKey = 'cinescope-user';
  const nameInput = document.getElementById('account-name');
  const emailInput = document.getElementById('account-email');
  const nameError = document.getElementById('account-name-error');
  const emailError = document.getElementById('account-email-error');
  const signinPanel = document.getElementById('signin-panel');
  const profilePanel = document.getElementById('profile-panel');
  const signoutButton = document.getElementById('signout-button');
  const feedback = document.getElementById('account-feedback');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, element, message) {
    input.setAttribute('aria-invalid', String(message !== ''));
    element.textContent = message;
  }

  function validateName() {
    const name = nameInput.value.trim();
    let message = '';
    if (!name) message = 'Please enter your name.';
    else if (name.length > 80) message = 'Use 80 characters or fewer.';
    setError(nameInput, nameError, message);
    return message === '';
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    let message = '';
    if (!email) message = 'Please enter your email.';
    else if (email.length > 254 || !emailPattern.test(email)) {
      message = 'Enter a valid email, such as you@example.com.';
    }
    setError(emailInput, emailError, message);
    return message === '';
  }

  function showProfile(user) {
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    signinPanel.hidden = true;
    profilePanel.hidden = false;
  }

  function showForm() {
    profilePanel.hidden = true;
    signinPanel.hidden = false;
    document.getElementById('profile-name').textContent = '';
    document.getElementById('profile-email').textContent = '';
    form.reset();
    setError(nameInput, nameError, '');
    setError(emailInput, emailError, '');
  }

  function loadUser() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) return;
      const user = JSON.parse(saved);
      if (!user || typeof user.name !== 'string' || !user.name.trim() ||
          user.name.length > 80 || typeof user.email !== 'string' ||
          user.email.length > 254 || !emailPattern.test(user.email)) {
        throw new Error('Invalid saved profile');
      }
      showProfile({ name: user.name.trim(), email: user.email.trim() });
    } catch (error) {
      feedback.textContent = 'Your saved profile could not be loaded. Please try signing in again.';
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    feedback.textContent = '';
    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    if (!nameIsValid || !emailIsValid) {
      (nameIsValid ? emailInput : nameInput).focus();
      return;
    }

    const user = { name: nameInput.value.trim(), email: emailInput.value.trim() };
    try {
      localStorage.setItem(storageKey, JSON.stringify(user));
    } catch (error) {
      feedback.textContent = 'Could not save your profile. Allow browser storage and try again.';
      return;
    }
    showProfile(user);
    window.dispatchEvent(new Event('account-change'));
    form.reset();
    document.getElementById('welcome-heading').focus();
  });

  signoutButton.addEventListener('click', function () {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      feedback.textContent = 'Could not remove your saved profile. Allow browser storage and try again.';
      return;
    }
    showForm();
    window.dispatchEvent(new Event('account-change'));
    feedback.textContent = 'You have signed out.';
    nameInput.focus();
  });

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  loadUser();
});
