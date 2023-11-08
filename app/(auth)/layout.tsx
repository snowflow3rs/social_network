import { Inter } from 'next/font/google';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Image from 'next/image';
export const metadata = {
    title: 'social',
    description: 'A social network',
};

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className}  bg-dark-1`}>
                    <div className=" w-full flex justify-between h-screen">
                        {/* <div className="flex flex-1 justify-center items-center h-screen "> */}
                        {children}
                        {/* </div> */}

                        {/* <img src="/img_intro.jpg" alt="" className=' hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'/> */}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
