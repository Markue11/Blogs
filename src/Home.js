import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []); // The effect runs only once, when the component is mounted

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove deleted blog from state
      })
      .catch((err) => console.error('Error deleting blog:', err));
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs.length === 0 && !isPending && <div>No blogs available</div>}
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-preview">
            <h2>{blog.title}</h2>
            <p>Written by: {blog.author}</p>
            <button onClick={() => handleDelete(blog.id)}>Delete Blog</button>
            <button onClick={() => navigate(`/edit/${blog.id}`)}>Edit Blog</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
