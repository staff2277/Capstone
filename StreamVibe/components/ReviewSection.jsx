import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Function to get CSRF token from cookie
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const ReviewSection = ({ movieId, movieType }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [movieId, movieType]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reviews/movie_reviews/?movie_id=${movieId}&movie_type=${movieType}`,
        {
          credentials: 'include', // Include cookies in the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Failed to fetch reviews:', response.status, response.statusText);
        setError('Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to fetch reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('You must be logged in to submit a review');
      return;
    }

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      setError('CSRF token not found. Please refresh the page and try again.');
      return;
    }

    try {
      const url = editingReview
        ? `http://127.0.0.1:8000/api/reviews/reviews/${editingReview.id}/`
        : 'http://127.0.0.1:8000/api/reviews/reviews/';
      
      const method = editingReview ? 'PUT' : 'POST';
      
      console.log('Submitting review:', { movieId, movieType, rating, comment });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          movie_id: movieId,
          movie_type: movieType,
          rating,
          comment,
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setRating(0);
        setComment('');
        setEditingReview(null);
        fetchReviews();
      } else {
        console.error('Failed to submit review:', response.status, responseData);
        setError(responseData.detail || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again later.');
    }
  };

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      setError('CSRF token not found. Please refresh the page and try again.');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reviews/reviews/${reviewId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include', // Include cookies in the request
        }
      );

      if (response.ok) {
        fetchReviews();
      } else {
        const responseData = await response.json();
        console.error('Failed to delete review:', response.status, responseData);
        setError(responseData.detail || 'Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-800 text-white"
              rows="4"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <div className="mb-8 text-gray-400">
          Please log in to submit a review
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium">{review.username}</span>
                <div className="flex text-yellow-400">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              {isAuthenticated && user.username === review.username && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-300">{review.comment}</p>
            <div className="text-sm text-gray-400 mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection; 