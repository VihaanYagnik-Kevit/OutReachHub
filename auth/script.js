const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const email = document.getElementById('email');
const password = document.getElementById('password');

const cpassword = document.getElementById('confirmPassword');
const username = document.getElementById('username');

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const res = await fetch('https://6874d57add06792b9c95705b.mockapi.io/api/v1/login');
    let data = await res.json();
    
    const found = data.filter(function (item) {
      return item.email === email.value && item.password === password.value;
    });

    if (found.length > 0) {
      window.location.href = './client/index.html';
    } else {
      alert("Invalid username or password");
    }
  });
}


// Signup Form Handler
if (signupForm) {
  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (password.value !== cpassword.value) {
      alert('Passwords do not match');
      return;
    }   

    const data = {
      email: email.value,
      password: password.value,
      username: username.value
    };

    try {
      const res = await fetch('https://6874d57add06792b9c95705b.mockapi.io/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const result = await res.json();
      console.log('Signup successful:', result);
      alert('Signup successful! Please log in.');
      window.location.href = '../index.html';
    } catch (err) {
      console.error(err);
      alert('Something went wrong during signup.');
    }
  });
}
