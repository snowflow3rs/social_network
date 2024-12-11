import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignOutButton, OrganizationSwitcher, currentUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { SearchBar } from './SearchBar';
import { MessageSquareQuoteIcon } from 'lucide-react';
const TopBar = async () => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/logo.png" alt="" width={60} height={60} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden ">DNE</p>
            </Link>

            <>
                <SearchBar routeType="search" tabIndex={100} />
            </>
            <div className="flex items-center gap-1">
                <div className="block md:hidden ">
                    {/* using library clerk for sign out */}

                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="" width={24} height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <Link href="/message" className="ml-2 p-2 hover:bg-purple-300 rounded-md">
                    <MessageSquareQuoteIcon size={24} className="text-white " />
                </Link>
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: 'py-2 px-4',
                        },
                    }}
                />
            </div>
        </nav>
    );
};

export default TopBar;
