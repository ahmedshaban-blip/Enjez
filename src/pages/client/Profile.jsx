import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Navbar from '../../components/layout/Navbar';
import { User, Mail, Shield, Calendar, Key, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        setLoading(true);
        setError('');
        try {
            await sendPasswordResetEmail(auth, user.email);
            setResetSent(true);
        } catch (err) {
            console.error("Error sending reset email:", err);
            setError("Failed to send password reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        // Handle Firestore Timestamp or standard Date string/object
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                    <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <User size={48} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{user.username || user.displayName || 'User'}</h1>
                                <p className="text-slate-500 font-medium">{user.email}</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                                {user.role || 'Client'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Personal Information</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Email Address</p>
                                            <p className="text-slate-900 font-medium">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Account Role</p>
                                            <p className="text-slate-900 font-medium capitalize">{user.role || 'User'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Member Since</p>
                                            <p className="text-slate-900 font-medium">{formatDate(user.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Security Settings</h2>

                                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                            <Key size={20} />
                                        </div>
                                        <h3 className="font-bold text-slate-900">Password</h3>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-6">
                                        To change your password, we will send a reset link to your email address <strong>{user.email}</strong>.
                                    </p>

                                    {error && (
                                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 border border-red-100">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    {resetSent ? (
                                        <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
                                            <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-green-800 font-bold text-sm">Email Sent!</p>
                                                <p className="text-green-700 text-sm mt-1">Check your inbox for the password reset link.</p>
                                                <button
                                                    onClick={() => setResetSent(false)}
                                                    className="text-green-800 text-xs font-bold mt-2 hover:underline"
                                                >
                                                    Send again
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handlePasswordReset}
                                            disabled={loading}
                                            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Sending...' : 'Change Password'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
