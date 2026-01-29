// LandingPage.tsx
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Ariel University
          </h1>
          <nav className="space-x-4">
            <a href="#about" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <a href="#programs" className="text-gray-700 hover:text-gray-900">
              Programs
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="max-w-3xl text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Ariel University
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Explore our programs, join our community, and start your journey
            with us today.
          </p>
          <a
            href="#signup"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h3>
          <p className="text-gray-600 text-lg">
            Ariel University is dedicated to providing high-quality education
            and fostering innovation. Our students thrive in a supportive and
            professional environment.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold text-gray-800 mb-10">
            Our Programs
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-2">Engineering</h4>
              <p className="text-gray-600">
                Cutting-edge engineering programs designed to prepare students
                for real-world challenges.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-2">Computer Science</h4>
              <p className="text-gray-600">
                Learn modern technologies and software development practices
                in our computer science programs.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-2">Mathematics & Physics</h4>
              <p className="text-gray-600">
                Gain a solid foundation in theoretical and applied sciences with
                our math and physics courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h3>
          <p className="text-gray-600 mb-4">
            Have questions? Reach out to our admissions office.
          </p>
          <a
            href="mailto:admissions@ariel.ac.il"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Email Admissions
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          &copy; {new Date().getFullYear()} Ariel University. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
