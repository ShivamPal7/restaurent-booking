import React from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container mx-auto py-4 px-4 md:px-6 sticky top-0 bg-white z-50 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-medium text-sm">
          <li>
            <a href="#home" className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
              About
            </a>
          </li>
          <li>
            <a href="#food" className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
              Food
            </a>
          </li>
          <li>
            <a href="#dish" className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
              Dish
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
              Contact
            </a>
          </li>
          <Link href="/booking">
          <Button variant="default" className="bg-accent text-white px-6 py-2 rounded-full">
            Book a Table
          </Button>
          </Link>
        </ul>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden" aria-label="Open menu">
            <AiOutlineMenu className="text-accent" size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-md">
            <DropdownMenuItem>
              <a href="#home" className="block w-full text-sm hover:bg-gray-100 p-2">
                Home
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#about" className="block w-full text-sm hover:bg-gray-100 p-2">
                About
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#food" className="block w-full text-sm hover:bg-gray-100 p-2">
                Food
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#dish" className="block w-full text-sm hover:bg-gray-100 p-2">
                Dish
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#contact" className="block w-full text-sm hover:bg-gray-100 p-2">
                Contact
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="default" className="w-full text-sm bg-accent text-white py-2">
                Book a Table
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
