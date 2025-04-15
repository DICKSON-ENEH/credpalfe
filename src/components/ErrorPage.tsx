
import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/auth/login")
  })
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-700 mb-6">
          {error instanceof Error ? error.message : "An unexpected error occurred"}
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;