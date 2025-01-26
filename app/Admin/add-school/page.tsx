"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddSchoolForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    contact: "",
    schoolname: "",
    location: {
      state: "",
      district: "",
      town: "",
    },
    numberofstudents: "",
    numberofteacher: "",
    adminEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/add-school", formData);
      toast.success(response.data.message);
      setFormData({
        email: "",
        password: "",
        username: "",
        contact: "",
        schoolname: "",
        location: {
          state: "",
          district: "",
          town: "",
        },
        numberofstudents: "",
        numberofteacher: "",
        adminEmail: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* School Details */}
          <input
            type="email"
            name="email"
            placeholder="School Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="username"
            placeholder="Admin Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="schoolname"
            placeholder="School Name"
            value={formData.schoolname}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />

          {/* Location */}
          <input
            type="text"
            name="location.state"
            placeholder="State"
            value={formData.location.state}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="location.district"
            placeholder="District"
            value={formData.location.district}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="location.town"
            placeholder="Town"
            value={formData.location.town}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />

          {/* Numbers */}
          <input
            type="number"
            name="numberofstudents"
            placeholder="Number of Students"
            value={formData.numberofstudents}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="numberofteacher"
            placeholder="Number of Teachers"
            value={formData.numberofteacher}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />

          {/* Admin Email */}
          <input
            type="email"
            name="adminEmail"
            placeholder="Admin Email"
            value={formData.adminEmail}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add School"}
        </button>
      </form>
    </div>
  );
};

export default AddSchoolForm;
