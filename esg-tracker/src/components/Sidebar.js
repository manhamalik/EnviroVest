import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../images/Logo.png";
import MenuIcon from "../images/menu.png";
import CG from "../images/CG.png";
import E from "../images/E.png";
import T from "../images/T.png";

// Hook to detect screen width
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -27;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => handleScroll(id), 150);
    } else {
      handleScroll(id);
    }
    setMenuOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  // Desktop sidebar styles
  const desktopContainer = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "7vw",
    height: "100vh",
    backgroundColor: "#262728",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "1rem",
  };
  const logoStyle = {
    width: "5.5vw",
    marginBottom: "2rem",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };
  const iconStyle = {
    width: "2.75vw",
    marginBottom: "1.75rem",
    cursor: "pointer",
    opacity: 0.9,
    transition: "opacity 0.2s ease",
  };

  // Mobile nav styles
  const mobileNav = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "5rem",
    backgroundColor: "#262728",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    zIndex: 1000,
  };
  const mobileLogo = { width: "4rem", cursor: "pointer" };
  const mobileMenuIcon = { width: "3rem", cursor: "pointer" };
  const mobileMenu = {
    position: "fixed",
    top: "4rem",
    left: 0,
    right: 0,
    backgroundColor: "#262728",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    zIndex: 999,
  };
  const menuItem = {
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  };

  if (isMobile) {
    return (
      <>
        <div style={mobileNav}>
          <img src={Logo} alt="Home" style={mobileLogo} onClick={goHome} />
          <img
            src={MenuIcon}
            alt="Menu"
            style={mobileMenuIcon}
            onClick={() => setMenuOpen((o) => !o)}
          />
        </div>
        {menuOpen && (
          <div style={mobileMenu}>
            <div style={menuItem} onClick={() => goToSection("Energy")}>Energy</div>
            <div style={menuItem} onClick={() => goToSection("Consumer")}>Consumer Defensive</div>
            <div style={menuItem} onClick={() => goToSection("Technology")}>Technology</div>
          </div>
        )}
      </>
    );
  }

  return (
    <div style={desktopContainer}>
      <img
        src={Logo}
        alt="Home"
        style={logoStyle}
        onClick={goHome}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-10deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
      />
      <img
        src={E}
        alt="Energy"
        style={iconStyle}
        onClick={() => goToSection("Energy")}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.5)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.9)}
      />
      <img
        src={CG}
        alt="Consumer Defensive"
        style={iconStyle}
        onClick={() => goToSection("Consumer")}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.5)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.9)}
      />
      <img
        src={T}
        alt="Technology"
        style={iconStyle}
        onClick={() => goToSection("Technology")}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.5)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.9)}
      />
    </div>
  );
};

export default Sidebar;
