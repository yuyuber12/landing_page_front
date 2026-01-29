import React from 'react'

export default function ThankYou() {
  const handleVisitUniversity = () => {
    window.location.href = "https://www.ariel.ac.il/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Thank You for signing up!</h1>
        <button
          onClick={handleVisitUniversity}
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
        >
          Visit Ariel University
        </button>
      </div>
    </div>
  )
}

