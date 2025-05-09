import React, { useState, useEffect } from "react";

// hook to listen for media query matches
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

const ESGDefinitionCards = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "1rem",
  };

  const baseCardStyle = {
    backgroundColor: "#2D2F30",
    padding: "1.5rem",
    borderRadius: "8px",
    width: isMobile ? "100%" : "33%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    transition: "box-shadow 0.2s ease",
  };

  const circleStyle = (color) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#1C1C1C",
    lineHeight: "center",
    textAlign: "center",
    fontSize: "55px",
    fontWeight: "bold",
    color,
    marginBottom: "10px",
  });

  const headingStyle = {
    color: "#fff",
    fontWeight: "bold",
    margin: 0,
    fontSize: "20px",
    marginBottom: "8px",
  };

  const textStyle = {
    color: "#fff",
    margin: 0,
    fontSize: "18px",
  };

  const Card = ({ color, letter, title, children }) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        style={{
          ...baseCardStyle,
          boxShadow: hover ? `0 0 10px ${color}` : "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={circleStyle(color)}>{letter}</div>
        <h3 style={headingStyle}>{title}</h3>
        <p style={textStyle}>{children}</p>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <Card color="#48EB6C" letter="E" title="Environmental">
        Evaluates how a company affects the environment, including carbon emissions, renewable energy use
        water conservation, waste management, and climate risk strategies.
      </Card>

      <Card color="#2BC6FF" letter="S" title="Social">
        Examines how a company interacts with employees, customers, and communities, focusing on fair labor
        practices, diversity, human rights, social responsibility, and product safety.
      </Card>

      <Card color="#AD6CDE" letter="G" title="Governance">
        Assesses the integrity and accountability of a company's leadership, including board diversity
        executive pay, transparency, regulatory compliance, and ethical business practices.
      </Card>
    </div>
  );
};

export default ESGDefinitionCards;