import { ClerkProvider } from '@clerk/nextjs';
import TopBar from '@/components/shared/TopBar';

import '../globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <div className=" flex h-screen">
                        <TopBar />
                        <section className=" flex h-full min-h-screen w-full pt-[84px]  bg-[#131418]      ">
                            <div className="w-full">{children}</div>
                        </section>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
