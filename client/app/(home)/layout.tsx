import { Header } from "@/components/shared"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
