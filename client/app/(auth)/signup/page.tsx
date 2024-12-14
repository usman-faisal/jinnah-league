"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import AuthLayout from "../layout";
import { registerUser } from "@/API/auth";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }
    try {
      const res = await registerUser(formData);
      toast.success("Sign-up successful! You can now log in.");
    } catch (err: any) {
      toast.error(err.message || "An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <div className="min-h-screen flex m-0 p-0 h-screen relative">
        <div className="w-full lg:w-1/2 hidden lg:block relative">
          <Image
            src={"/lib.jpg"}
            alt="Library Image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center py-10 px-5 bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="absolute top-5 right-5">
              <Image
                src={"/logo.png"}
                alt="Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

            <form onSubmit={handleSubmit}>
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
    </AuthLayout>
  )
}

export default SignUp;