import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
    return (
        <div className="px-4 sm:px-8 py-16 rounded shadow-xl bg-white text-black ">
            {children}
        </div>
    );
}