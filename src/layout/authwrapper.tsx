import React from "react";
import { Outlet } from "react-router-dom";

interface AuthWrapperProps {
  title?: string;
  subtitle?: string;
}
 
const AuthWrapper: React.FC<AuthWrapperProps> = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ">
      <div className="w-full max-w-full bg-white p-8 shadow-xl">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            )}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        )}

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
