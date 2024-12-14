"use client";

import { useState } from "react";
import Image from "next/image";
import Lib from "../../public/lib.jpg"; // Replace this with your own image
import Logo from "../../public/logo.png"; // Replace this with your own logo image
import { toast } from "sonner";
import Link from "next/link"; 

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validate the form data
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error("Please fill in all fields.");
      return false;
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    // Basic phone validation (assuming the phone number is a simple number check for now)
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // First, validate form data
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      // Sign-up success
      toast.success("Sign-up successful! You can now log in.");
      // Optionally, redirect to login page or home
    } catch (err: any) {
      toast.error(err.message || "An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex m-0 p-0 h-screen relative">
      {/* Left side: Image */}
      <div className="w-full lg:w-1/2 hidden lg:block relative">
        <Image
          src={Lib}
          alt="Library Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right side: Sign-up Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center py-10 px-5 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo on top-right */}
          <div className="absolute top-5 right-5">
            <Image
              src={Logo} // Your logo image
              alt="Logo"
              width={120} // Adjust this as per your logo size
              height={40} // Adjust this as per your logo size
              objectFit="contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">
                Full Name
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">
                Email
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5 flex justify-center items-center">
              <button
                className="py-2 px-20 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition ease-in duration-200"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Link to Sign Up page */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
              Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
