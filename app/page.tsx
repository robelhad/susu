import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImageUrl = "/static/shop.jpg";
  return (
        <div
      style={{
        position: "relative",
        background: `
          linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)),
          url('${heroImageUrl}') center/cover no-repeat
        `,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "800",
            color: "#ffffff",
            letterSpacing: "2px",
            textShadow: `
              0 4px 20px rgba(0,0,0,0.8),
              0 0 40px rgba(255,255,255,0.25)
            `,
            marginBottom: "1.5rem",
          }}
        >
          Welcome to Susu’s Macaroon Market
        </h1>

        <p
          style={{
            fontSize: "1.6rem",
            color: "#f8f9fa",
            marginBottom: "2.5rem",
            textShadow: "0 3px 15px rgba(0,0,0,0.7)",
          }}
        >
          Handcrafted macaroons made with love, elegance, and a touch of magic.
        </p>

        <Link
          href="/products"
          style={{
            display: "inline-block",
            padding: "18px 48px",
            fontSize: "1.3rem",
            fontWeight: "700",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #007bff, #0056d2)",
            color: "#ffffff",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(0,123,255,0.5)",
            transition: "all 0.3s ease",
          }}

        >
          Explore Our Products
        </Link>
      </div>
    </div>
  

  );
}
