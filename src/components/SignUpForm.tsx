// SignUpForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const interests = [
    "הנדסאי כללי",
    "אדירלות נוף",
    "הנדסאי בטיחות",
    "הנדסת חשמל",
    "הנדסת מכונות - כטב\"ם",
    "הנדסת קול(סאונד)",
    "הנדסת רכב",
    "הנדסת רכב חשמלי",
    "מכינה טכנולוגית",
    "ניהול הבנייה",
    "ניהול הבנייה בשילוב למנהלי עבודה",
    "תוכנה",
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "שם פרטי חובה";
    if (!formData.lastName.trim()) newErrors.lastName = "שם משפחה חובה";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "אימייל חובה";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "מספר טלפון לא תקין";
    if (!formData.interest) newErrors.interest = "בחר/י מסלול";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(`${SERVER_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/thank-you");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .form-container {
          animation: slideInUp 0.6s ease-out;
        }
        
        .form-title {
          animation: slideInDown 0.5s ease-out;
        }
        
        .input-field {
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        }
        
        .submit-btn {
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3);
        }
        
        .submit-btn:active {
          transform: translateY(-1px);
        }
      `}</style>
      
      <form
        onSubmit={handleSubmit}
        className="form-container bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50 overflow-hidden relative"
        dir="rtl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <h1 className="form-title text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            הרשמה לאוניברסיטת אריאל
          </h1>
        
          <p className="text-center text-gray-500 mb-8 text-xs md:text-sm">
            מלא את הפרטים שלך כדי להירשם לתוכנית
          </p>

          <div className="flex flex-col gap-5">
            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 text-right text-sm">
                👤 שם פרטי
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right bg-white/50 hover:bg-white/80"
                placeholder="הכנס שם פרטי"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2 text-right font-semibold">
                  ⚠️ {errors.firstName}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 text-right text-sm">
                👤 שם משפחה
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right bg-white/50 hover:bg-white/80"
                placeholder="הכנס שם משפחה"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2 text-right font-semibold">
                  ⚠️ {errors.lastName}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 text-right text-sm">
                📧 דוא״ל
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right bg-white/50 hover:bg-white/80"
                placeholder="הכנס דוא״ל"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 text-right font-semibold">
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 text-right text-sm">
                📱 טלפון
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right bg-white/50 hover:bg-white/80"
                placeholder="הכנס מספר טלפון"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 text-right font-semibold">
                  ⚠️ {errors.phone}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 text-right text-sm">
                🎯 תחום עניין
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="input-field w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right bg-white/50 hover:bg-white/80"
              >
                <option value="">בחר תחום עניין...</option>
                {interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <p className="text-red-500 text-xs mt-2 text-right font-semibold">
                  ⚠️ {errors.interest}
                </p>
              )}
            </div>
          </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 hover:from-pink-500 hover:to-indigo-600 transition duration-200 shadow-xl mt-8"
      >
        הרשם
      </button>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
             {" "}
              <span
                className="text-indigo-600 font-bold cursor-pointer hover:text-pink-600 hover:underline transition-colors"
                onClick={() => navigate("/login")}
              >
                התחבר
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
