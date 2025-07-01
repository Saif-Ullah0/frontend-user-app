import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyApp',
  description: 'User Management App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
