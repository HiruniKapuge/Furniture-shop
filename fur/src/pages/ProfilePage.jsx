
import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';

const ProfilePage = () => {
    const { user, token, logout, backendUrl, navigate, setToken, loadUserFromToken } = useContext(ShopContext);

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
    });

    // Populate form with user data when the component loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || 'Unknown User',
                email: user.email || 'No email provided',
                currentPassword: '',
                newPassword: '',
            });
        }
    }, [user]);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for updating profile
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email) {
            return toast.error("Name and email are required.");
        }
        if (formData.newPassword && !formData.currentPassword) {
            return toast.error("Please enter your current password to set a new one.");
        }

        try {
            const response = await axios.put(`${backendUrl}/api/user/update`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                const newToken = response.data.token;
                localStorage.setItem('token', newToken);
                setToken(newToken);
                loadUserFromToken(newToken);

                toast.success("Profile updated successfully!");
                setIsEditing(false);
                setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/api/user/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success("Account deleted successfully.");
                logout();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete account.");
            setShowDeleteConfirm(false);
        }
    };

    // Handle logout with navigation to /logIn
    const handleLogout = () => {
        logout(); // Clear authentication state
        navigate('/logIn'); // Navigate to login page
    };

    if (!user) {
        return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <FaArrowLeft 
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 text-gray-600 cursor-pointer hover:text-pink-600 transition-colors"
                        aria-label="Back"
                    />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                        <div className="h-1 w-16 bg-pink-600 mx-auto mt-2 rounded"></div>
                    </div>
                    <div className="w-8"></div>
                </div>

                {/* Avatar Display */}
                <div className="flex justify-center">
                    <FaUserCircle className="w-24 h-24 text-gray-400" />
                </div>

                {/* Profile Form */}
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            className={`mt-1 w-full px-4 py-2 rounded-md border ${isEditing ? 'border-gray-300 focus:ring-pink-500 focus:border-pink-500' : 'border-gray-200 bg-gray-100'} text-gray-800`}
                            readOnly={!isEditing}
                        />
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            className={`mt-1 w-full px-4 py-2 rounded-md border ${isEditing ? 'border-gray-300 focus:ring-pink-500 focus:border-pink-500' : 'border-gray-200 bg-gray-100'} text-gray-800`}
                            readOnly={!isEditing}
                        />
                    </div> */}

                    {isEditing && (
                        <>
                            <hr className="my-4 border-gray-200" />
                            <p className="text-center text-sm text-gray-500">To change your password, enter your current and new password below.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    type="password"
                                    className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    type="password"
                                    className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                                    placeholder="Enter new password (optional)"
                                />
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    {/* <div className="flex gap-4 mt-6">
                        {isEditing ? (
                            <>
                                <button
                                    type="submit"
                                    className="flex-1 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: user.name || 'Unknown User',
                                            email: user.email || 'No email provided',
                                            currentPassword: '',
                                            newPassword: '',
                                        });
                                    }}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div> */}
                </form>

                {/* Other Actions */}
                <div className="mt-8 space-y-4">
                    <hr className="border-gray-200" />
                    <button
                        onClick={handleLogout}
                        className="w-full border border-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm space-y-6">
                        <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
                        <p className="text-gray-600">This action is irreversible. All your data will be permanently deleted.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                                Confirm Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;