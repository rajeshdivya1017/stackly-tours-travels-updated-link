(() => {
  const form = document.getElementById('registerForm');
  const message = document.getElementById('registerMessage');
  const accountsKey = 'stacklyTravelAccounts';
  document.querySelectorAll('.toggle-password').forEach(button => button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input'); const show = input.type === 'password';
    input.type = show ? 'text' : 'password'; button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  }));
  document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => {
    if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) history.back();
    else location.href = 'index.html';
  }));
  form.addEventListener('submit', event => {
    event.preventDefault(); message.className = 'form-message';
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (name.length < 2) { message.textContent = 'Please enter your full name.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { message.textContent = 'Please enter a valid email address.'; return; }
    if (password.length < 8) { message.textContent = 'Password must contain at least 8 characters.'; return; }
    if (password !== confirm) { message.textContent = 'Your passwords do not match.'; return; }
    let accounts = [];
    try { accounts = JSON.parse(localStorage.getItem(accountsKey) || '[]'); } catch (_) { accounts = []; }
    if (accounts.some(item => item.email === email)) { message.textContent = 'An account with this email already exists. Please sign in.'; return; }
    accounts.push({ name, email, phone, password, createdAt: new Date().toISOString() });
    localStorage.setItem(accountsKey, JSON.stringify(accounts));
    message.textContent = 'Account created successfully. Taking you to sign in…'; message.classList.add('success');
    form.reset(); setTimeout(() => location.href = 'login.html', 900);
  });
})();
