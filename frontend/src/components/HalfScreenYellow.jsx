import React from "react";

const HalfScreenYellow = () => {
  return (
    <div className="bg-yellow-400" style={styles.container}>
      {/* Top Half */}
      <div style={styles.topHalf}>
        {/* Logo */}
        <img
          src={"icons/logo.png"}
          alt="Logo"
          style={styles.logo}
        />
      </div>

      {/* Bottom Half */}
      <div style={styles.bottomHalf}></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh", // Full screen height
    width: "35vw",   // 35% of screen width
    display: "flex",
    flexDirection: "column",
  },
  topHalf: {
    flex: 1,           // Takes half the height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "150px",    // Set the width of the logo
    height: "150px",   // Set the height of the logo (same as width for circular shape)
    borderRadius: "50%", // Makes the logo circular
    objectFit: "cover", // Ensures the image fills the circular area without distortion
  },
};

export default HalfScreenYellow;
