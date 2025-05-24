import React, { useEffect, useRef, useState } from "react";

const highlights = [
  {
    title: "Fresh Ingredients",
    desc: "We use only the freshest and highest quality ingredients in every dish and beverage.",
    icon: "🥗",
  },
  {
    title: "Cozy Ambience",
    desc: "Enjoy your time in our warm, inviting, and beautifully designed space.",
    icon: "☕",
  },
  {
    title: "Quick & Paperless",
    desc: "Order and pay seamlessly with our QR-based, paperless system.",
    icon: "📱",
  },
  {
    title: "Friendly Staff",
    desc: "Our team is always ready to make your experience delightful.",
    icon: "😊",
  },
];

// Counter data
const counters = [
  { label: "Happy Customers", value: 1200, icon: "👨‍👩‍👧‍👦" },
  { label: "Cups Served", value: 35000, icon: "🥤" },
  { label: "Dishes on Menu", value: 48, icon: "🍽️" },
  { label: "Years of Service", value: 5, icon: "🎉" },
];

// Counter animation hook
function useCounter(to, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / (duration / 16));
    function animate() {
      start += step;
      if (start >= to) {
        setCount(to);
      } else {
        setCount(start);
        ref.current = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => cancelAnimationFrame(ref.current);
  }, [to, duration]);
  return count;
}

const About = () => {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-[#4e342e] via-[#6d4c41] to-[#3e2723] py-0 px-0 font-sans"
    >
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-[#6d4c41]/90 to-[#3e2723]/90 text-white shadow-lg animate-fade-in-down">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-wide drop-shadow-lg transition-all duration-700">
          Welcome to{" "}
          <span className="text-yellow-400">Paperless Cafe</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90 animate-fade-in transition-all duration-700 delay-100" style={{ color: "white" }}>
          Experience the future of dining—order, pay, and enjoy, all without
          paper. We blend technology, taste, and comfort for a truly modern cafe
          experience.
        </p>
      </div>

      {/* Animated Counters Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 mb-12">
        {counters.map((item, idx) => {
          const count = useCounter(item.value, 1200 + idx * 200);
          return (
            <div
              key={item.label}
              className="bg-white/90 rounded-xl shadow-xl p-8 w-60 text-center border-t-4 border-yellow-400 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-3xl font-extrabold text-[#6d4c41] mb-1 transition-all duration-500">
                {count.toLocaleString()}
              </div>
              <div className="text-yellow-700 font-semibold">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Highlights Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {highlights.map((item, idx) => (
          <div
            key={item.title}
            className="bg-white/90 rounded-xl shadow-xl p-8 w-72 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: `${0.5 + idx * 0.15}s` }}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <div className="font-bold text-lg text-[#6d4c41] mb-2">
              {item.title}
            </div>
            <div className="text-[#4e342e] text-base">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="max-w-2xl mx-auto bg-white/95 rounded-2xl shadow-lg p-10 text-center animate-fade-in transition-all duration-700 delay-200">
        <h2 className="text-2xl font-bold text-[#6d4c41] mb-4">Our Story</h2>
        <p className="text-[#4e342e] text-lg leading-relaxed">
          Paperless Cafe was founded with a vision to make dining smarter,
          greener, and more enjoyable. We believe in harnessing technology to
          reduce waste and enhance your experience. From digital menus to
          seamless payments, every detail is designed for your convenience and
          the planet’s well-being.
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes fade-in {
            from { opacity: 0;}
            to { opacity: 1;}
          }
          .animate-fade-in-down { animation: fade-in-down 1s both; }
          .animate-fade-in-up { animation: fade-in-up 0.9s both; }
          .animate-fade-in { animation: fade-in 1.2s both; }
        `}
      </style>
    </div>
  );
};

export default About;