import { Key } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="justify-between">
      <header className="px-4 lg:px-6 h-14 flex justify-between items-center">
        <a className="flex items-center justify-center" href="#">
          <Key className="h-6 w-6 mr-2" />
          <Link href="/">
            {" "}
            <span className=" font-semibold text-xl">APIVault</span>
          </Link>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm text-slate-900 font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm text-slate-900  font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </a>
          <a
            className="text-sm text-slate-900  font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
