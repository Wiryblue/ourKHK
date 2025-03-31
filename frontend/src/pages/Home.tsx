import React, { useEffect, useState } from "react";

export function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200); // slight delay for fade-in
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('src/assets/khkDeltaf23.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Crest */}
        <img
          src="src/assets/KHKcrest.png"
          alt="Kappa Eta Kappa Crest"
          className={`z-10 w-32 md:w-48 mb-6 transition-opacity duration-1000 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Headline */}
        <h1
          className={`z-10 text-4xl md:text-5xl font-extrabold transition-all duration-1000 drop-shadow-[0_1px_1px_black] ${
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="text-purple-500">Welcome to </span>
          <span className="text-yellow-400 drop-shadow-none">
            Kappa Eta Kappa
          </span>
        </h1>

        <h2
          className={`z-10 text-xl md:text-2xl mt-2 text-white drop-shadow-[0_1px_1px_black] transition-opacity duration-1000 delay-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          Delta Chapter • Brotherhood • Excellence
        </h2>
      </div>

      {/* Bio Section */}
      <section className="py-12 px-6 md:px-20 text-center bg-white dark:bg-gray-900 transition-colors duration-500">
        <h2 className="text-3xl font-semibold mb-4 text-purple-600 dark:text-yellow-300">
          About Us
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-800 dark:text-gray-200 transition-colors duration-500">
          KHK was founded at the University of Wisconsin as an electrical
          engineering fraternity in 1924. Today many of our members also study
          computer engineering, computer science, and other technical programs.
          Members often study and work together at our house.
        </p>
      </section>
    </div>
  );
}
