import React from "react";
import { TESTIMONIALS } from "../../utils/data";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-violet-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ===== Header ===== */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-violet-100 text-violet-700">
            ⭐ Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Creators{" "}
            <span className="text-violet-600">Everywhere</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our users have
            to say about their experience.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-2xl shadow-sm"
            >
              {/* Quote badge */}
              <div className="absolute -top-4 left-6 w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">“</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-4 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-violet-500 text-violet-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                “{item.quote}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
