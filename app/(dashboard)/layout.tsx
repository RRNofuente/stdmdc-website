import { ReactNode } from "react";
import  Navbar  from "@/app/components/Navbar";

export default async function HomeLayout({
    children
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow w-full mx-auto sm:px-6 lg:px-0">
        {children}
      </main>
        </div>
    );
}