import type { Metadata } from "next";
import localFont from "next/font/local";
import AppHeader from "@/components/AppHeader";
import FilterRuleProvider from "@/context/FilterRuleProvider";
import ProposalListProvider from "@/context/ProposalListProvider";
import UIStateProvider from "@/context/UIStateProvider";
import CreateProposalProvider from "@/context/CreateProposalProvider"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "臺南市政府數位雙生提案簡易篩選",
  description: "TainanCity Digital Twin Proposal Filtering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UIStateProvider>
          <ProposalListProvider>
            <FilterRuleProvider>
              <CreateProposalProvider>
                <AppHeader />
                {children}
              </CreateProposalProvider>
            </FilterRuleProvider>
          </ProposalListProvider>
        </UIStateProvider>
      </body>
    </html>
  );
}
