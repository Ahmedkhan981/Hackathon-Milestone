"use client"; // Ensure this is only executed on the client side

import Link from "next/link";
import "./Style/NotFound.css";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="relative inline-block">
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-50 blur-xl"></div>
          <Link
            href="/"
            className="relative px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Go Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
