import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SportsEquipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [formData, setFormData] = useState({ id: "", name: "", category: "Sports Kit" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch all equipment
    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        if (!API_BASE_URL) {
            console.error("API_BASE_URL is missing in environment variables.");
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/sports-equipment`, { withCredentials: true });
            setEquipment(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching equipment:", error);
            setEquipment([]);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!API_BASE_URL) return;

            if (formData.id) {
                await axios.put(`${API_BASE_URL}/api/sports-equipment/${formData.id}`, formData, { withCredentials: true });
                setMessage("Equipment updated successfully!");
            } else {
                await axios.post(`${API_BASE_URL}/api/add/sports-equipment`, formData, { withCredentials: true });
                setMessage("Equipment added successfully!");
            }

            setFormData({ id: "", name: "", category: "Sports Kit" }); // Reset form
            await fetchEquipment();
        } catch (error) {
            console.error("Error saving equipment:", error);
            setMessage("Failed to save equipment.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/sports-equipment/${id}`, { withCredentials: true });
            setMessage("Equipment deleted successfully!");
            await fetchEquipment();
        } catch (error) {
            console.error("Error deleting equipment:", error);
            setMessage("Failed to delete equipment.");
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
    };

    return (
        <div className="equipment-container">
            <h2>Sports Equipment Management</h2>
            <div className="sports-equipment-box-style">
                <div>
                    <form onSubmit={handleSubmit} className="equipment-form">
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </label>

                        <label>
                            Category:
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Sports Kit">Sports Kit</option>
                                <option value="Machine">Machine</option>
                            </select>
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : formData.id ? "Update Equipment" : "Add Equipment"}
                        </button>
                    </form>

                    {message && <p className="message">{message}</p>}
                </div>
                {/* <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.length > 0 ? (
                            equipment.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No equipment found.</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
                <div className="equipment-list">
                    {equipment.length > 0 ? (
                        equipment.map((item) => (
                            <div key={item.id} className="equipment-item">
                                <div className="equipment-id">{item.id} </div>
                                <div className="equipment-name">{item.name}</div>
                                <div className="equipment-category">{item.category}</div>
                                <div className="equipment-actions">
                                    {/* <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button> */}
                                    <button onClick={() => handleDelete(item.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-equipment">No equipment found.</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SportsEquipment;