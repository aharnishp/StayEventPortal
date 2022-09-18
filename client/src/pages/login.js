import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    console.log('Logging in...');
    console.log('Email: ' + email);
    // console.log('Password: ' + password);

    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    
    const data = await response.json()

    console.log("Data: ", data);

    if(data.user){
      console.log('Login successful!');
      localStorage.setItem('token', data.user);
      window.location.href = '/dashboard';
      // console.log(data.user);
    }else{
      console.log('Login failed!');

    }


    console.log(data);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
