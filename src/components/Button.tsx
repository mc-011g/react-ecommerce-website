import { ReactNode } from "react";

export default function Button({ size, color, outline, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size: string, color: string, outline: string, children: ReactNode }) {
    const sizeVariant = size === 'large' ? 'px-8 py-3' : 'px-4 py-2';
    const colorVariant = color === 'light' ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800';
    const outlineVariant = outline === 'outline' ? 'border border-gray-700 text-gray-700 hover:bg-gray-100' : '';
    const disabledVariant = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button {...props} className={`${sizeVariant} ${colorVariant} ${outlineVariant} ${disabledVariant} rounded-xl cursor-pointer font-semibold transition duration-150 ease-in-out w-full`}>
            {children}
        </button>
    );
}