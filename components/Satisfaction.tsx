"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SatisfactionSurveyForm = () => {
  const [formData, setFormData] = useState({
    role: "Parent", // Default selection
    ofschool: "", // Replacing schoolName with ofschool
    clarity: "",
    resses: "",
    evaluation: "",
    studymaterial: "",
    safety: "",
    extracurricular: "",
    environment: "Friendly", // Default selection
  });

  const [schools, setSchools] = useState([]); // List of schools
  const [message, setMessage] = useState("");

  // Fetch school names from the backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/school/get-all-schools");
        console.log("API Response:", response.data); // Debugging
        if (response.data?.schools && Array.isArray(response.data.schools)) {
          setSchools(response.data.schools); // Set schools if valid data is present
        } else {
          console.error("Invalid schools data format:", response.data);
          setSchools([]); // Default to an empty list
        }
      } catch (error) {
        console.error("Error fetching schools:", error.message);
        setSchools([]); // Default to an empty list
      }
    };

    fetchSchools();
  }, []);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/system-admin-dashboard", formData);
      setMessage(response.data.message); // Show success message
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred."); // Show error message
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

        {/* School Selection */}
        <label className="block mb-2 font-semibold">School:</label>
        <select
          name="ofschool"
          value={formData.ofschool}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md"
          required
        >
          <option value="">Select a school</option>
          {schools.map((school) => (
            <option key={school._id} value={school._id}>
              {school.schoolname} {/* Display the schoolname field */}
            </option>
          ))}
        </select>

        {/* Numeric Fields */}
        {["clarity", "resses", "evaluation", "studymaterial", "safety", "extracurricular"].map(
          (field) => (
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
          )
        )}

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
