import { Inter, Roboto, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Outro from '@/Components/Outro';
import { StateProvider } from './(root)/Admin/Context';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: 'Oyster Estate',
  description: 'Buy, Rent, Invest in Real Estate',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Outro />
        <Footer />
      </body>
    </html>
  );
}
