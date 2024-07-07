import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Outro from "@/Components/Outro";
import { StateProvider } from "./(root)/Admin/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oyster Estate",
  description: "Buy, Rent, Invest in Real Estate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      {children}
        <Outro />
      <Footer />
      </body>
    </html>
  );
}
