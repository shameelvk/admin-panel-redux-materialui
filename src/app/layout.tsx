import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./components/AppThemeProvider";
import SearchAppBar from "./components/AppBar";
import Login from "./login/page";
import { cookies } from "next/headers";
import ReduxProvider from "./components/ReduxProvider/ReduxProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies();
  const acessKiy = cookieStore.get("access_token");
  console.log(acessKiy);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <AppThemeProvider>

          {!acessKiy?.value ? <Login /> : <>
            <SearchAppBar />
            {children}</>
          }

        </AppThemeProvider>
        </ReduxProvider>
       

      </body>
    </html>
  );
}
