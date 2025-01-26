"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    ofschool: "", // Store the selected school's ID
    reviewtext: "",
    rating: 0,
    tags: [] as string[], // Tags initialized as an empty array
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [schools, setSchools] = useState<any[]>([]); // Store school names and IDs

  const TAG_OPTIONS = [
    "Infrastructure",
    "Performance",
    "Satisfaction",
    "Overall",
    "Activity",
  ];

  // Fetch schools list from the API when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/school/get-all-schools"); // Update with your API endpoint
        console.log("Fetched schools:", response.data); // Check the response data
        if (response.data && response.data.data) {
          setSchools(response.data.data); // Set schools list
        }
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };

    fetchSchools();
  }, []);

  // This function now handles both text input and dropdown changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rating: parseInt(e.target.value, 10),
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ofschool || !formData.reviewtext || !formData.rating) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      // Send POST request to the backend API
      const response = await axios.post("/api/reviews/add-review", formData);
      console.log("Form submitted:", response.data);
      setSuccessMessage("Review submitted successfully!");
      setFormData({
        ofschool: "",
        reviewtext: "",
        rating: 0,
        tags: [],
      }); // Reset form after submission
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log the full Axios error details
        console.error("AxiosError:", error.response?.data || error.message);
      } else {
        // Log general errors
        console.error("Error submitting form:", error);
      }
      setError("There was an error submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Add a Review</h2>

      {/* School Dropdown */}
      <div>
        <label htmlFor="ofschool" className="block text-sm font-medium text-gray-700">
          School:
        </label>
        <select
          id="ofschool"
          name="ofschool"
          value={formData.ofschool}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a School</option>
          {schools.length > 0 ? (
            schools.map((school) => (
              <option key={school._id} value={school._id}>
                {school.schoolname}
              </option>
            ))
          ) : (
            <option value="">No schools available</option>
          )}
        </select>
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="reviewtext" className="block text-sm font-medium text-gray-700">
          Review Text:
        </label>
        <textarea
          id="reviewtext"
          name="reviewtext"
          value={formData.reviewtext}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your review"
          minLength={10}
          maxLength={1000}
          required
        />
      </div>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating (0-10):
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          min={0}
          max={10}
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags:</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full border ${
                formData.tags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Selected Tags: {formData.tags.join(", ") || "None"}
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Success Message */}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
