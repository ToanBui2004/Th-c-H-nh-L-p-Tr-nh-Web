import "./globals.css";

export const metadata = {
  title: "Personal Blog",
  description: "Personal blog starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
