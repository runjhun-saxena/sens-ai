import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark} from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"]});



export const metadata = {
  title: "SensAI",
  description: "AI Career Coach",
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
   <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.className} `}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />

           <main className="min-h-screen"> {children}</main>
           <Toaster />

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
