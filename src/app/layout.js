import { Inter } from "next/font/google";
import "./globals.css";
import Context from "@/context/Context";
import { SkeletonTheme } from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Context>{children}</Context>
        {/* </SkeletonTheme> */}
      </body>
    </html>
  );
}
