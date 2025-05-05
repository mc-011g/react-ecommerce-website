import Link from "next/link";

export default function NavLink({ link, children, ...props }: { link: string, children: React.ReactNode, }) {

    return (
        <Link
            {...props}
            href={link}
            className="hover:underline underline-offset-4"
            aria-current="page"
        >
            {children}
        </Link>
    )
}