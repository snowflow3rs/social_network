"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className=" bottombar_container ">
        {sidebarLinks.map((link) => {
          //select active btn
          const isActived =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActived && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {/* regrex split( /\s+/)[0] */}
                {link.label.split("Thread")}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
