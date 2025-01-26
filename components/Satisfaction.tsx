"use client";

import React, { useState } from "react";
import axios from "axios";

const SatisfactionSurveyForm = () => {
  const [formData, setFormData] = useState({
    role: "Parent", // Default selection
    ofschool: "",
    clarity: "",
    resses: "",
    evaluation: "",
    studymaterial: "",
    safety: "",
    extracurricular: "",
    environment: "Friendly", // Default selection
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/system-admin-dashboard", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Satisfaction Survey</h1>

      {message && (
        <p
          className={`text-center mb-4 font-semibold ${
            message.includes("Thank you") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Role Selection */}
        <label className="block mb-2 font-semibold">I am a:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md"
        >
          <option value="Parent">Parent</option>
          <option value="Student">Student</option>
        </select>

        {/* ofschool */}
        <label className="block mb-2 font-semibold">School ID:</label>
        <input
          type="text"
          name="ofschool"
          value={formData.ofschool}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        {/* Numeric Fields */}
        {[
          "clarity",
          "resses",
          "evaluation",
          "studymaterial",
          "safety",
          "extracurricular",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-2 font-semibold capitalize">
              {field} (0-10):
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min="0"
              max="10"
              className="w-full p-2 mb-4 border rounded-md"
              required
            />
          </div>
        ))}

        {/* Environment */}
        <label className="block mb-2 font-semibold">Environment:</label>
        <select
          name="environment"
          value={formData.environment}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md"
        >
          <option value="Friendly">Friendly</option>
          <option value="Average">Average</option>
          <option value="Depressive">Depressive</option>
          <option value="Hostile">Hostile</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SatisfactionSurveyForm;
