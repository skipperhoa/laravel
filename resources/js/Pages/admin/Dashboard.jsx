import React from "react";


export default function Dashboard({ stats }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Thống kê tổng quan hệ thống
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {item.value}
              </h2>
            </div>

            <div
              className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold`}
            >
              {item.label.charAt(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
