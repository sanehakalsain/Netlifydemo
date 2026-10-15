
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Default Function
export default function AuthForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { signup, login, loginWithGoogle } = useAuth();

    // Handle Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (isRegister) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async () => {
        setSubmitting(true);
        setError("");

        try {
            await loginWithGoogle();
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Display Login and Registration Form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isRegister ? "Create an Account" : "Welcome Back"}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {isRegister
                            ? "Sign up to get started"
                            : "Sign in to continue"}
                    </p>

                    {error && (
                        <p className="bg-red-100 text-red-700 p-3 rounded mt-4 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={submitting}
                        className="w-full mt-5 border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Sign in with Google
                    </button>

                    <p className="text-sm text-gray-500 mt-4">
                        or continue with email
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="someone@example.com"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting
                            ? "Processing..."
                            : isRegister
                            ? "Sign Up"
                            : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError("");
                        }}
                        className="ml-2 text-blue-600 hover:underline font-medium"
                    >
                        {isRegister ? "Sign In" : "Sign Up"}
                    </button>
                </p>

            </div>
        </div>
    );
}
