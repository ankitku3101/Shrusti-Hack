"use client";

import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);  
  }, []);

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

  if (!isClient) return null; 

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"> {/* More vibrant background */}
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-lg text-center">
        <h1 className="text-3xl font-bold">Survey Agent Dashboard</h1>
      </header>


      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-800">School Analytics</h2>

          {/* School Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex justify-between mb-4 p-4 border rounded-md bg-indigo-50 shadow-sm">
              <p className="text-lg text-indigo-700">School Infrastructure Quality</p>
              <p className="text-lg font-semibold text-indigo-700">Rating: 4.2/5</p>
            </div>
            <div className="flex justify-between mb-4 p-4 border rounded-md bg-indigo-50 shadow-sm">
              <p className="text-lg text-indigo-700">Number of Teachers</p>
              <p className="text-lg font-semibold text-indigo-700">35 Teachers</p>
            </div>
            <div className="flex justify-between mb-4 p-4 border rounded-md bg-indigo-50 shadow-sm">
              <p className="text-lg text-indigo-700">Student-Teacher Ratio</p>
              <p className="text-lg font-semibold text-indigo-700">20:1</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-indigo-800">Rate the School</h3>
            <div className="flex items-center space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`w-10 h-10 rounded-full ${rating >= star ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'} flex items-center justify-center`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-indigo-800">Leave a Review</h3>
            <input
              type="text"
              value={review}
              onChange={handleReviewChange}
              className="w-full p-4 border border-indigo-300 rounded-md mt-2 shadow-md text-gray-800"
              placeholder="Write your review here"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition"
            >
              Submit Rating & Review
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white p-4 mt-6">
        <p className="text-center">&copy; 2025 Survey Agent | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
