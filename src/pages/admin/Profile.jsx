import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatCreatedAt } from "../../utils/helpers";
import { updateDocById } from "../../utils/firebaseHelpers";
import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const Profile = () => {
    const { user, currentUser } = useAuth();
    const activeUser = user || currentUser;

    // --- State for Modals ---
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // --- State for Forms ---
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    if (!activeUser) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    // --- Handlers for Edit Profile ---
    const openEditModal = () => {
        setFormData({
            username: activeUser.username || "",
            phone: activeUser.phone || "",
        });
        setStatus({ type: "", message: "" });
        setIsEditing(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            // Update Firestore
            await updateDocById("users", activeUser.uid || activeUser.id, {
                username: formData.username,
                phone: formData.phone,
            });

            // Ideally, we should also update the local auth context if it doesn't auto-sync
            // But for now, Firestore update is the source of truth for profile data

            setStatus({ type: "success", message: "Profile updated successfully!" });
            setTimeout(() => {
                setIsEditing(false);
                window.location.reload(); // Simple reload to fetch fresh data
            }, 1500);
        } catch (error) {
            console.error("Error updating profile:", error);
            setStatus({ type: "error", message: "Failed to update profile." });
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers for Change Password ---
    const openPasswordModal = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setStatus({ type: "", message: "" });
        setIsChangingPassword(true);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatus({ type: "error", message: "New passwords do not match." });
            setLoading(false);
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setStatus({ type: "error", message: "Password must be at least 6 characters." });
            setLoading(false);
            return;
        }

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);

            // 1. Re-authenticate
            await reauthenticateWithCredential(user, credential);

            // 2. Update Password
            await updatePassword(user, passwordData.newPassword);

            setStatus({ type: "success", message: "Password changed successfully!" });
            setTimeout(() => {
                setIsChangingPassword(false);
            }, 1500);
        } catch (error) {
            console.error("Error changing password:", error);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setStatus({ type: "error", message: "Incorrect current password." });
            } else {
                setStatus({ type: "error", message: "Failed to change password. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header / Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="h-24 w-24 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-slate-400 text-4xl font-bold shadow-md">
                            {activeUser.username ? activeUser.username.charAt(0).toUpperCase() : "A"}
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {activeUser.username || "Admin User"}
                            </h2>
                            <p className="text-slate-500">{activeUser.email}</p>
                        </div>
                        <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
                            {activeUser.role ? activeUser.role.toUpperCase() : "ADMIN"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">
                                Personal Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    Username
                                </label>
                                <p className="text-slate-900 font-medium">
                                    {activeUser.username || "—"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    Email Address
                                </label>
                                <p className="text-slate-900 font-medium">
                                    {activeUser.email || "—"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    Phone
                                </label>
                                <p className="text-slate-900 font-medium">
                                    {activeUser.phone || "—"}
                                </p>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">
                                Account Details
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    Role
                                </label>
                                <p className="text-slate-900 font-medium">
                                    {activeUser.role || "Admin"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    Member Since
                                </label>
                                <p className="text-slate-900 font-medium">
                                    {formatCreatedAt(activeUser.createdAt)}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    User ID
                                </label>
                                <p className="text-xs text-slate-400 font-mono bg-slate-50 p-2 rounded border border-slate-100">
                                    {activeUser.uid || activeUser.id || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 pt-6 border-t border-slate-100 flex gap-4">
                        <button
                            onClick={openEditModal}
                            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={openPasswordModal}
                            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Edit Profile Modal --- */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                            {status.message && (
                                <div className={`p-3 rounded-lg text-sm ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- Change Password Modal --- */}
            {isChangingPassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
                            <button onClick={() => setIsChangingPassword(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                            {status.message && (
                                <div className={`p-3 rounded-lg text-sm ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsChangingPassword(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
