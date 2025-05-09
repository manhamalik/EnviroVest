import React, { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

// Hook: returns true if media query matches
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

const CompanyCard = ({ name, summary, esgTotal, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Truncate summary
  const snippetLength = 125;
  const snippet =
    summary.length > snippetLength
      ? summary.substring(0, snippetLength) + "..."
      : summary;

  // Determine arrow icon
  const threshold = 50;
  const esgIcon =
    esgTotal >= threshold ? (
      <FaCaretUp style={{ color: "green" }} />
    ) : (
      <FaCaretDown style={{ color: "red" }} />
    );

  const baseStyle = {
    backgroundColor: "#2D2F30",
    padding: "1.5rem",
    borderRadius: "8px",
    width: isMobile ? "100%" : "88%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
  };

  const scoreBoxStyle = {
    backgroundColor: "#1B1D1E",
    padding: "0.8rem",
    borderRadius: "8px",
    textAlign: "center",
    flex: 1,
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={baseStyle}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
        {name}
      </h3>
      <p style={{ fontSize: "16px", color: "#ccc", margin: 0 }}>
        {snippet}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <div style={scoreBoxStyle}>
          <p style={{ fontSize: "18px", color: "#888", margin: 0 }}>
            ESG Score
          </p>
          <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            {esgTotal.toFixed(2)} {esgIcon}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
