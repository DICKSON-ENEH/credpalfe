import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/inputfield";
import vector from "../assets/Vector.png";
import circleway from "../assets/CircleWavyCheck.png";
import shiled from "../assets/ShieldCheckered.png";
import axios from "axios";


const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const Register: React.FC = () => {
  const [Loading, setLoading] = useState(false);

  const url = `${import.meta.env.VITE_DEVE_URL}/user/register`;
  console.log(url);

  const handleSubmit = async (values: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    console.log("Register form submitted", values);
    setLoading(true);
    try {
      const res = await axios.post(url, values);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full md:w-[90%]">
      {/* Left Column */}
      <div className="regbg hidden md:flex md:w-2/5 bg-black flex-col justify-end relative overflow-hidden">
        <div className="p-8 text-white relative z-10">
          <div className="w-10 h-10 mb-5 text-black bg-[#FFDE02] rounded-full flex items-center justify-center font-extrabold text-lg">
            B.
          </div>
          <h2 className="text-2xl font-semibold leading-snug mb-6 max-w-xs">
            Unlock High Returns with Collateralized Equity Asset
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <img src={vector} alt="Collateralized" className="w-4 h-4" />
              <span className="text-white">Collateralized</span>
            </li>
            <li className="flex items-center gap-3">
              <img src={shiled} alt="Secured" className="w-4 h-4" />
              <span className="text-white">Secured</span>
            </li>
            <li className="flex items-center gap-3">
              <img src={circleway} alt="Licensed" className="w-4 h-4" />
              <span className="text-white">Licensed & regulated</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create an account
            </h1>
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <a href="/auth/login" className="text-gray-900 underline">
                Login
              </a>
            </p>
          </div>

          {/* ✅ Formik Form */}

          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <InputField
                  type="text"
                  label="Full name"
                  name="fullName"
                  placeholder="Enter full name"
                  required
                />
                <InputField
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <InputField
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="••••••••"
                  required
                />

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-xs text-gray-600"
                  >
                    I agree to BeamMarkets{" "}
                    <a href="" className="text-blue-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="" className="text-blue-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={Loading}
                  className={`w-full bg-black text-white py-3 rounded-full font-medium transition ${
                    Loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {Loading ? "Registering..." : "Register"}
                </button>

              
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      OR SIGNUP WITH
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {/* Google */}
                  <button
                    type="button"
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex justify-center items-center space-x-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </button>

            
                  <button
                    type="button"
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex justify-center items-center space-x-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.03 11.03c.02 2.33 2.04 3.11 2.06 3.12-.02.05-.3 1.03-1 2.02-.6.88-1.22 1.76-2.2 1.78-.96.02-1.27-.57-2.37-.57-1.1 0-1.44.55-2.35.59-1.04.04-1.74-.95-2.35-1.83-1.28-1.85-2.26-5.23-.94-7.5.66-1.13 1.83-1.85 3.1-1.87.97-.02 1.88.65 2.47.65.59 0 1.7-.8 2.87-.68.49.02 1.86.2 2.73 1.48-.07.05-1.63.95-1.62 2.81zm-1.73-5.51c.52-.63.88-1.51.78-2.38-.76.03-1.67.51-2.21 1.14-.48.56-.91 1.47-.8 2.33.85.07 1.71-.44 2.23-1.09z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
