"use client";
import { Button } from "@/components/ui";
import { cn } from "@/libs/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {};

const OrganizationSidebar: React.FC<Props> = ({}) => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div
      className="
        hidden lg:flex flex-col space-y-6
        w-[206px]
        pl-5 pt-5"
    >
      <Link href="/" passHref>
        <div className="flex items-center gap-x-2 justify-center">
          <Image src="/ziro-boards-logo.svg" alt="logo" height={60} width={60} />

          <span className={cn("font-semibold text-xl", font.className)}>Ziro Boards</span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: ".5rem",
              width: "100%",
              borderRadius: ".5rem",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "@fff",
            },
          },
        }}
      />

      <div className="space-y-1 w-full">
        <Button
          className="font-normal justify-start px-2 w-full"
          asChild
          size="lg"
          variant={favorites ? "ghost" : "secondary"}
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>

        <Button
          className="font-normal justify-start px-2 w-full"
          asChild
          size="lg"
          variant={favorites ? "secondary" : "ghost"}
        >
          <Link href="/favorites">
            <Star className="h-4 w-4 mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSidebar;
