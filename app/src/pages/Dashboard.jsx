import React from "react";
import { Navbar1 } from "../components/navbar-01";

export default function Dashboard() {
  React.useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#000" }}>
      <header className="navbar">
        <Navbar1 />
      </header>
      <main style={{ flex: "1 1 auto", minHeight: 0 }}>
        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            src="https://arad-me746.ondigitalocean.app/"
            title="ARAD Dashboard"
            frameBorder="0"
            style={{ width: "100%", height: "100%", display: "block", border: "none" }}
          />
        </div>
      </main>
    </div>
  );
}
