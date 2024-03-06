import styles from "./globals.css";

export const metadata = {
  title: 'klob0t',
  description: "airlangga k's personal page"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
