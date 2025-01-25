import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0 || review === '') {
      alert('Please provide a rating and a review.');
      return;
    }
    alert(`Submitted: Rating - ${rating}, Review - ${review}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Survey Agent Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">School Analytics</h2>

          {/* School Analytics */}
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <p className="text-lg">School Infrastructure Quality</p>
              <p className="text-lg font-semibold">Rating: 4.2/5</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg">Number of Teachers</p>
              <p className="text-lg font-semibold">35 Teachers</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg">Student-Teacher Ratio</p>
              <p className="text-lg font-semibold">20:1</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Rate the School</h3>
            <div className="flex items-center space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`w-8 h-8 rounded-full ${rating >= star ? 'bg-yellow-400' : 'bg-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Leave a Review</h3>
            <input
              type="text"
              value={review}
              onChange={handleReviewChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Write your review here"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Rating & Review
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 mt-6">
        <p className="text-center">&copy; 2025 Survey Agent | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
