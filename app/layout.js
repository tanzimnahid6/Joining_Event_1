import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { dbConnect } from "@/connectDb/mongoose";
import { AuthProvider } from "./providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events | Home",
  description: "Find your favorite event",
};

export default async function RootLayout({ children }) {
  // Connect mongodb=============start
  await dbConnect();
  // Connect mongodb=============end

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
