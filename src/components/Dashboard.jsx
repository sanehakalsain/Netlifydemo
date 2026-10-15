
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    My Application Dashboard
                </h2>

                {currentUser ? (
                    <div className="text-center">

                        {currentUser.photoURL ? (
                            <img
                                src={currentUser.photoURL}
                                alt="Profile"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                        ) : (
                            <p className="text-gray-500 mb-4">
                                No profile picture available
                            </p>
                        )}

                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            {currentUser.email?.[0]?.toUpperCase()}
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            {currentUser.displayName || "Authenticated User"}
                        </h2>

                        <p className="text-gray-600 mt-1">
                            {currentUser.email || "Email not available"}
                        </p>

                        <div className="text-left bg-gray-50 border rounded-md p-4 mt-6">
                            <p className="mb-3 break-all">
                                <span className="font-semibold">UID: </span>
                                {currentUser.uid}
                            </p>

                            <p className="break-all">
                                <span className="font-semibold">Provider: </span>
                                {currentUser.providerData?.[0]?.providerId || "Not available"}
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full bg-red-600 text-white py-2 rounded-md mt-6 hover:bg-red-700"
                        >
                            Logout
                        </button>

                    </div>
                ) : (
                    <p className="text-gray-600">
                        Loading the user information...
                    </p>
                )}

            </div>
        </div>
    );
}
