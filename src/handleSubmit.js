const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with', { username, password });  // Check if data is correct
    const success = login(username, password);
  
    if (success) {
      navigate('/');  // If login is successful, redirect to home
    } else {
      setError('Invalid credentials. Please try again.');  // Display error message
    }
  };
  