"use client";

import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { SheetTrigger } from "./ui/sheet";

interface UserAccountNavProps {
  user: User;
  origin?: string;
}

const UserAccountNav = ({ user, origin }: UserAccountNavProps) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          {origin === "mobilenav" ? (
            <SheetTrigger asChild>
              <Link href="/sell">Seller Dashboard</Link>
            </SheetTrigger>
          ) : (
            <Link href="/sell">Seller Dashboard</Link>
          )}
        </DropdownMenuItem>

        {origin === "mobilenav" ? (
          <SheetTrigger asChild>
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </SheetTrigger>
        ) : (
          <DropdownMenuItem onClick={signOut} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
