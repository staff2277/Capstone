import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
        `http://127.0.0.1:8000/api/reviews/movie_reviews/?movie_id=${movieId}&movie_type=${movieType}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = editingReview
        ? `http://127.0.0.1:8000/api/reviews/reviews/${editingReview.id}/`
        : 'http://127.0.0.1:8000/api/reviews/reviews/';
      
      const method = editingReview ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          movie_id: movieId,
          movie_type: movieType,
          rating,
          comment,
        }),
      });

      if (response.ok) {
        setRating(0);
        setComment('');
        setEditingReview(null);
        fetchReviews();
      } else {
        setError('Failed to submit review');
      }
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reviews/reviews/${reviewId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        fetchReviews();
      } else {
        setError('Failed to delete review');
      }
    } catch (err) {
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
      
      {isAuthenticated && (
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
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

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