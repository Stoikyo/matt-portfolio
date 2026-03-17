import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Matt Grant Portfolio</h1>
      <p>
        Hidden folio experiment: <Link href="/pay">AIce AIce Baby</Link>
      </p>
    </main>
  );
}
