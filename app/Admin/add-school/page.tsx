'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddSchoolForm() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        contact: "",
        schoolname: "",
        location: {
            state: "",
            division: "",
            district: "",
            block: "",
            town: "",
            city: "",
            ward: "",
        },
        numberofstudents: 0,
        numberofteacher: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("location.")) {
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

        if (!session || session.user.role !== "admin") {
            toast.error("You must be an admin to add schools.");
            return;
        }

        try {
            const response = await axios.post("/api/admin/add-school", formData);
            toast.success(response.data.message);
            setFormData({
                email: "",
                password: "",
                username: "",
                contact: "",
                schoolname: "",
                location: {
                    state: "",
                    division: "",
                    district: "",
                    block: "",
                    town: "",
                    city: "",
                    ward: "",
                },
                numberofstudents: 0,
                numberofteacher: 0,
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add school.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Add School</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Contact</label>
                    <input
                        type="number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">School Name</label>
                    <input
                        type="text"
                        name="schoolname"
                        value={formData.schoolname}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <fieldset>
                    <legend className="text-lg font-medium">Location</legend>

                    <div>
                        <label className="block text-sm font-medium">State</label>
                        <input
                            type="text"
                            name="location.state"
                            value={formData.location.state}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">District</label>
                        <input
                            type="text"
                            name="location.district"
                            value={formData.location.district}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Town</label>
                        <input
                            type="text"
                            name="location.town"
                            value={formData.location.town}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Division</label>
                        <input
                            type="text"
                            name="location.division"
                            value={formData.location.division}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Block</label>
                        <input
                            type="text"
                            name="location.block"
                            value={formData.location.block}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <input
                            type="text"
                            name="location.city"
                            value={formData.location.city}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ward</label>
                        <input
                            type="text"
                            name="location.ward"
                            value={formData.location.ward}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </fieldset>

                <div>
                    <label className="block text-sm font-medium">Number of Students</label>
                    <input
                        type="number"
                        name="numberofstudents"
                        value={formData.numberofstudents}
                        onChange={handleChange}
                        min="0"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Number of Teachers</label>
                    <input
                        type="number"
                        name="numberofteacher"
                        value={formData.numberofteacher}
                        onChange={handleChange}
                        min="0"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add School
                </button>
            </form>
        </div>
    );
}
