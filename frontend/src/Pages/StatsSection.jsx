import React, { useEffect, useState } from "react";
import "./StatsSection.css";

const statsData = [
  { label: "Happy Customers", value: 100, suffix: "+" },
  { label: "Years of Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 120, suffix: "+" },
  { label: "Countries Served", value: 20, suffix: "+" },
];

const StatsSection = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) =>
          count < statsData[index].value ? count + 1 : count
        )
      );
    }, 20); // adjust speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stats-section">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-card">
          <h2>
            {counts[index]}
            {stat.suffix}
          </h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
