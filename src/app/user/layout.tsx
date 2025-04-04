import Sidebar from "@/components/navigation/side-bar";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      {/* Sidebar */}
      <h1>SIDEBAR</h1>
      <Sidebar />
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
