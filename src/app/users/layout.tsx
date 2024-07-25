import { Metadata } from "next";
import "@/assets/globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User title",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
