import { PRODUCT_CATEGORIES } from "@/config";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";

const MobileNav = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden group -m-2 flex items-center p-2">
        <Menu className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <div className="flex flex-col pr-6 max-h-screen">
          <ScrollArea className="max-h-fit">
            <ul>
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                  <div className="border-b border-gray-200">
                    <div className="-mb-px flex">
                      <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                        {category.label}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-sm">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Image
                            fill
                            src={item.imageSrc}
                            alt="product category image"
                            className="object-cover object-center"
                          />
                        </div>
                        <SheetTrigger asChild>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </SheetTrigger>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Separator />
          <SheetFooter>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6 mb-5 text-right">
              {user ? (
                <UserAccountNav user={user} origin="mobilenav" />
              ) : (
                <>
                  <div className="flow-root">
                    <SheetTrigger asChild>
                      <Link
                        href="/sign-in"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </SheetTrigger>
                  </div>
                  <div className="flow-root">
                    <SheetTrigger asChild>
                      <Link
                        href="/sign-up"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create Account
                      </Link>
                    </SheetTrigger>
                  </div>
                </>
              )}
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
