import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the blog data based on the ID
  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the blog");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data); // Set the blog data in state
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      ...blog,
      title: e.target.title.value,
      body: e.target.body.value,
    };

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the blog");
        }
        alert("Blog updated successfully!");
        navigate("/"); // Redirect to the homepage after successful update
      })
      .catch((err) => alert("Error updating blog: " + err.message));
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          defaultValue={blog.title} // Pre-fill the input with the existing title
        />
        <label>Body:</label>
        <textarea
          name="body"
          defaultValue={blog.body} // Pre-fill the textarea with the existing body
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default Edit;
