import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


const SignUp = () => {
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",

    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value

            }
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {

            const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            // logging respose object from register api 
            // console.log(response);

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUser(data.user);
                }
                setMessage("Registration Successfully!");
                navigate("/");
            } else {
                setMessage(`Error: ${data.message || "Registation failed"}`);
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(`${error}`);
            setMessage("Server connection failed.Is beckend running?");

        } finally {
            setLoading(false);
        }
    };

    const isError = message.toLowerCase().includes("error") || message.toLocaleLowerCase().includes("failed");

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center  text-white mb-2">
                    Create Account
                </h2>
                <p className="text-center text-slate-400 text-sm mb-8">
                    Join us Today - it's free!
                </p>

                {/* Message Box */}
                {message && (
                    <div className={`p-3 mb-5 rounded-lg text-sm border ${isError ? "bg-red-500/20 text-red-400 border-red-500"
                        : "bg-green-500/20 text-green-400 border-green-500"
                        }`}
                    >
                        {message}
                    </div>


                )}

                <form onSubmit={handleSubmit} className="space-y-5" >
                    
                    {/* Name Field */}

                    <div>
                        <label className="block text-sm font-medium text-medium text-slate-300 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="e.g. rahul123"
                            required
                            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholer-slate-400 focus:outline-none
                        focus:border-indigo-500 focus:ring-1 focus-1 focus:ring-indigo-500 transition"



                        />
                    </div>

                    {/* Email Filed */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Email
                        </label>
                        <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        required
                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"

                        />

                    </div>
                    {/* Password field */}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Password
                        </label>
                        <input type="password" 
                        name="password"
                        value={formData.password}
                        placeholder="***********"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none
                        focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                         />
                    </div>

                    {/* Submit Button*/}
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                       {loading?"creating account.....":"Sign Up"}     

                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
                    Login
                    </a>
                </p>

            </div>
        </div>
    );
};

export default SignUp;