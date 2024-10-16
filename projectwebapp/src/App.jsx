import { useState } from 'react';
import './App.css';

function App() {
  // สถานะสำหรับฟิลด์ข้อมูล
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ฟังก์ชันสำหรับการสมัครสมาชิก (Sign Up)
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://systemprojext.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log('Sign up response:', data);
      if (data.success) {
        alert('Sign up successful');
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // ฟังก์ชันสำหรับการเข้าสู่ระบบ (Login)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://systemprojext.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login response:', data);
      if (data.success) {
        alert('Login successful');
        // ทำการ redirect หรือแสดงหน้าที่ต้องการหลังจากเข้าสู่ระบบ
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      {/* ส่วนการเข้าสู่ระบบ */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Welcome Back!</h1>
          <span>To keep connected with us please login with your personal info</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* ส่วนการสมัครสมาชิก */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">F</a>
            <a href="#" className="social">G</a>
            <a href="#" className="social">L</a>
          </div>
          <span>or use your email for registration:</span>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;
