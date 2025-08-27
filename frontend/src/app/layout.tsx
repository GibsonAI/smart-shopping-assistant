import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart Shopping Assistant | DigitalOcean + Memori",
  description: "AI-powered shopping assistant with memory - Experience personalized shopping with intelligent recommendations",
  keywords: ["shopping", "AI", "assistant", "DigitalOcean", "Memori", "ecommerce"],
  authors: [{ name: "DigitalOcean + Memori Team" }],
  openGraph: {
    title: "Smart Shopping Assistant",
    description: "AI-powered shopping with memory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="antialiased font-sans bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
        suppressHydrationWarning={true}
      >
        <div className="relative">
          {/* Background Pattern */}
          <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk1RjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none" />
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
