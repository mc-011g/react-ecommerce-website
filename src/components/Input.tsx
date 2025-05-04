export default function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
    return (
        <input
            {...props}
            className={`border border-gray-400 rounded px-4 py-2 w-full focus:ring-2 focus:ring-blue-300" ${className}`}
        />
    );
}