import React, { useState } from "react";
import { Field, useField, FieldHookConfig } from "formik";

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<
  InputFieldProps & FieldHookConfig<string | number | boolean | undefined>
> = ({ type, label, placeholder, required = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const isPassword = type === "password";
  const hasError = meta.touched && meta.error;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col gap-2 mb-4 relative">
      <label
        htmlFor={props.name}
        className="text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <Field
          {...field}
          type={isPassword && showPassword ? "text" : type}
          id={props.name}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-200 rounded-md text-base transition-all focus:outline-none focus:border-2 ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "focus:border-black"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.05 0-9.29-3.14-11-7.5a11.05 11.05 0 0 1 4.65-5.1" />
                <path d="M1 1l22 22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {hasError && <p className="text-xs text-red-500 mt-1">{meta.error}</p>}
    </div>
  );
};

export default InputField;
