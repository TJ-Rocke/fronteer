import { Concert_One } from "next/font/google";
import "./globals.css";
import MixpanelProvider from "./MixpanelProvider";

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
      <head>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>
      <body className={`${concertOne.variable} antialiased`}>
        <MixpanelProvider>{children}</MixpanelProvider>
      </body>
    </html>
  );
}
