"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface School {
  _id: string;
  schoolname: string;
  location: object;
}

const SatisfactionSurveyForm = () => {
  const [formData, setFormData] = useState({
    role: "Parent",
    ofschool: "",
    clarity: "",
    resses: "",
    evaluation: "",
    studymaterial: "",
    safety: "",
    extracurricular: "",
    environment: "Friendly",
  });

  const [schools, setSchools] = useState<School[]>([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/school/get-all-schools");
        const { data } = response.data;
        setSchools(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching schools:", error.message);
        setSchools([]);
      }
    };

    fetchSchools();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/survey/satisfaction/add-survey", formData);
      setMessage(response.data.message);
      setIsSuccess(true); // Mark submission as successful
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setMessage(error.response?.data?.message || "An error occurred.");
      setIsSuccess(false); // Reset success state on error
    }
  };

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Satisfaction Survey</h1>

      {message && (
        <div
          className={`text-center mb-4 font-semibold ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
          {isSuccess && (
            <button
              onClick={handleRedirect}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600"
            >
              Go to Homepage
            </button>
          )}
        </div>
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
              {school.schoolname}
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
          <option value="hostile">Hostile</option>
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
