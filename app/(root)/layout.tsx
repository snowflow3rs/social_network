import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import TopBar from '@/components/shared/TopBar';
import BottomBar from '@/components/shared/BottomBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import '../globals.css';
import RightSidebar from '@/components/shared/RightSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'social',
    description: 'A social network',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <TopBar />
                    <main className="flex flex-row">
                        <LeftSideBar />
                        <section className="main-container ">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        <RightSidebar />
                    </main>
                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    );
}
