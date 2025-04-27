import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export function BlogView() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      showNotification("Error fetching posts", "error");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts", newPost, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      showNotification("Post created successfully", "success");
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Error creating post",
        "error"
      );
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      showNotification("Post deleted successfully", "success");
      fetchPosts();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Error deleting post",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      {isAdmin && (
        <form onSubmit={handleCreatePost} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              By {post.author.name} on{" "}
              {new Date(post.timestamp).toLocaleDateString()}
            </div>
            {isAdmin && (
              <button
                onClick={() => handleDeletePost(post._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogView;
