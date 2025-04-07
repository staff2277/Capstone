import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ReviewSection = ({ movieId, movieType, movieTitle }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState("");

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId, movieType]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};

      // Add Authorization header if token exists
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/reviews/movie_reviews/?movie_id=${movieId}&movie_type=${movieType}`,
        {
          headers,
          credentials: "include", // Include cookies in the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error(
          "Failed to fetch reviews:",
          response.status,
          response.statusText
        );
        setError("Failed to fetch reviews");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      setError("You must be logged in to submit a review");
      return;
    }

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const url = editingReview
        ? `http://127.0.0.1:8000/api/reviews/${editingReview.id}/`
        : "http://127.0.0.1:8000/api/reviews/";

      const method = editingReview ? "PUT" : "POST";
      const csrfToken = getCookie("csrftoken");

      console.log("Submitting review:", {
        movieId,
        movieType,
        rating,
        comment,
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          movie_id: movieId,
          movie_type: movieType,
          movie_title: movieTitle,
          rating,
          review_content: comment,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRating(0);
        setComment("");
        setEditingReview(null);
        fetchReviews();
      } else {
        console.error(
          "Failed to submit review:",
          response.status,
          responseData
        );
        setError(responseData.detail || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again later.");
    }
  };

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const csrfToken = getCookie("csrftoken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/reviews/${reviewId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
          credentials: "include", // Include cookies in the request
        }
      );

      if (response.ok) {
        fetchReviews();
      } else {
        const responseData = await response.json();
        console.error(
          "Failed to delete review:",
          response.status,
          responseData
        );
        setError(responseData.detail || "Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      setError("Failed to delete review");
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.review_content);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-text">Reviews</h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-text">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-text-muted"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-text">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md bg-background-light text-text"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-text py-2 px-4 rounded-md transition-colors"
          >
            {editingReview ? "Update Review" : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="mb-8 text-text-muted">
          Please log in to submit a review
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500 text-text rounded">{error}</div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-background-lighter rounded-md p-4 bg-background-light"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium text-text">{review.username}</span>
                <div className="flex text-yellow-400">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              {isAuthenticated && user.username === review.username && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-primary hover:text-red-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-primary hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-text-muted">{review.review_content}</p>
            <div className="text-sm text-text-dark mt-2">
              {new Date(review.created_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
