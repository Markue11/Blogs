import { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // handleSignUp function
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Ensure both username and password are provided
    if (!username || !password) {
      setError('Please provide both username and password');
      return;
    }

    try {
      // Send POST request to add a new user
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful sign-up, clear form and give feedback
        setUsername('');
        setPassword('');
        setError('');
        alert('User signed up successfully!');
      } else {
        // If something goes wrong, show an error
        setError('Error signing up. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;
