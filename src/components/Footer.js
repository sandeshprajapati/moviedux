import React from "react";
import "../styles.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        @{getFullYear()} Moviesdux, All rights reserved.
      </p>
    </footer>
  );
}

function getFullYear() {
  return new Date().getFullYear();
}
