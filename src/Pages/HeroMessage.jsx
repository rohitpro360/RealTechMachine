import React from "react";
import { motion } from "framer-motion";
import "./HeroMessage.css";

const HeroMessage = () => {
  return (
    <section className="hero-message-section py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Company Image */}
        <motion.img
          src="/images/realtech-team.jpg"
          alt="Real Tech Team"
          className="mx-auto w-full md:w-3/4 rounded-2xl shadow-xl mb-8 hero-company-image"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Real Technologies Machines Pvt. Ltd.
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Since <b>2006</b>, we’ve been pioneers in{" "}
            <span className="font-semibold text-blue-600">Cleaning Machines</span>,{" "}
            <span className="font-semibold text-green-600">Filtration Systems</span>, and{" "}
            <span className="font-semibold text-purple-600">Magnetic Separators</span>.  
            Our innovative solutions empower industries worldwide with reliability and efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroMessage;
