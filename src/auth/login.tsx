import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/inputfield";
import vector from "../assets/Vector.png";
import circleway from "../assets/CircleWavyCheck.png";
import shiled from "../assets/ShieldCheckered.png";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { setToken } from "../Global/slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const url = `${import.meta.env.VITE_DEVE_URL}/users/login`;

  const dispatch = useDispatch();
  const nav = useNavigate();

  const [loading, setloading] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log("Login form submitted", values);
    setloading(true);
    try {
      const res = await axios.post(url, values);
      dispatch(setToken(res.data.access_token));
      toast.success("Login Successful");
      nav("/");
      console.log(res); 
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setloading(false);
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
              <span>Collateralized</span>
            </li>
            <li className="flex items-center gap-3">
              <img src={shiled} alt="Secured" className="w-4 h-4" />
              <span>Secured</span>
            </li>
            <li className="flex items-center gap-3">
              <img src={circleway} alt="Licensed" className="w-4 h-4" />
              <span>Licensed & regulated</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in to Beam.
            </h1>
            <p className="text-gray-500 text-sm">
              Please sign in with your assigned login details
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
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

                <div className="flex justify-end items-center text-sm">
                  <a href="#" className="text-gray-600 underline-none">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-black flex justify-center items-center text-white py-3 rounded-full font-medium transition ${
                    loading
                      ? "opacity-90 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {loading ? <ImSpinner9 className="animate-spin" /> : "Log in"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
