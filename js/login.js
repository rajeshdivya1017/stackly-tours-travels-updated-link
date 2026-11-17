(() => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');
  const accountsKey = 'stacklyTravelAccounts';
  document.querySelectorAll('.toggle-password').forEach(button => button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input');
    const show = input.type === 'password'; input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show'; button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  }));
  document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => {
    if (history.length > 1 && document.referrer && new URL(document.referrer).origin === location.origin) history.back();
    else location.href = 'index.html';
  }));
  document.getElementById('forgotLink').addEventListener('click', event => {
    event.preventDefault(); message.textContent = 'Please contact STACKLY Travel support to reset your password.'; message.className = 'form-message';
  });
  form.addEventListener('submit', event => {
    event.preventDefault(); message.className = 'form-message';
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) { message.textContent = 'Enter your email address and password.'; return; }
    let accounts = [];
    try { accounts = JSON.parse(localStorage.getItem(accountsKey) || '[]'); } catch (_) { accounts = []; }
    const account = accounts.find(item => item.email === email && item.password === password);
    if (!account) { message.textContent = 'Account not found or password is incorrect. Please check your details or create an account.'; return; }
    localStorage.setItem('stacklyTravelCurrentUser', JSON.stringify({ name: account.name, email: account.email, signedInAt: new Date().toISOString() }));
    if (document.getElementById('rememberMe').checked) localStorage.setItem('stacklyTravelRememberEmail', email);
    else localStorage.removeItem('stacklyTravelRememberEmail');
    message.textContent = 'Sign in successful. Redirecting to your home page…'; message.classList.add('success');
    setTimeout(() => location.href = 'index.html', 650);
  });
  const remembered = localStorage.getItem('stacklyTravelRememberEmail');
  if (remembered) { document.getElementById('loginEmail').value = remembered; document.getElementById('rememberMe').checked = true; }
})();
