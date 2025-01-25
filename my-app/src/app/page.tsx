"use client"  
import React from "react";

export default function AddDevice() {
  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-xl font-bold text-center mb-4">Add a device</h1>
        <p className="text-center text-gray-600 mb-6">
          When adding a new device make sure the signal is strong.
        </p>
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-gray-300 rounded-full"></div>
            <div className="absolute inset-8 bg-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <span className="text-gray-700">LCD TV</span>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
              + Add
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <span className="text-gray-700">Heater</span>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
              + Add
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <button className="relative bg-orange-300 text-black px-6 py-2 rounded-full font-medium shadow-lg hover:bg-orange-400">
            <span className="absolute inset-0 bg-black rounded-full -translate-x-1 translate-y-1"></span>
            <span className="relative">Air Condition</span>
          </button>
        </div>
      </div>
    </div>
  );
}