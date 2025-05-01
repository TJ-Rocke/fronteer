import { Concert_One } from "next/font/google";
import "./globals.css";
import MixpanelInit from "@/components/MixpanelInit";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-concert_one",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "fronteer | Interview prep for frontend engineers",
  description: "Leetcode for frontend engineers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${concertOne.variable} antialiased`}>
        <MixpanelInit />
        {children}
      </body>
    </html>
  );
}
