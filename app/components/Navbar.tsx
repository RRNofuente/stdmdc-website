'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; 

interface LinkProps {
  name: string;
  href: string;
}

const links: LinkProps[] = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT US", href: "#about" },
  { name: "SERVICES", href: "#services" },
  { name: "ACCREDITATION", href: "#accreditation" },
  { name: "CONTACT US", href: "#contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname(); 

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Change this value to adjust when the effect occurs
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Menu onClick={toggleMobileMenu} className="w-6 h-6 text-white cursor-pointer transition-opacity duration-300 hover:opacity-75" />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center lg:hidden"
        >
          <X onClick={toggleMobileMenu} className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer z-60" />
          <ul className="flex flex-col items-center gap-y-4 text-white text-base">
            {links.map((link, idx) => (
              <li key={idx} onClick={toggleMobileMenu}>
                <Link href={link.href} className="text-white text-lg">{link.name}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Main Navbar */}
      <motion.div
  initial={{ opacity: 0, y: -100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className={`navbar fixed top-0 left-0 right-0 z-50 w-full px-4 py-3 flex items-center justify-between transition-all duration-300 
    bg-green-900 shadow-[0px_4px_10px_rgba(0,0,0,0.6)]
  `}
>

        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Link href="/" className="w-24">
              <motion.div 
                whileHover={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(95%) saturate(900%) hue-rotate(10deg)" }}
                transition={{ duration: 0.3 }}
              >
                <Image src={Logo} alt="Logo" priority width={80} height={80} />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            className="font-serif text-xl font-bold text-white hidden md:block"
            whileHover={{ color: "#FFD700", scale: 1.1 }} // Changes color to yellow on hover
            transition={{ duration: 0.3 }}
          >
            ST. THOMAS DIAGNOSTIC
            <br />
            MEDICAL AND DENTAL CLINIC, INC.
          </motion.div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="lg:flex gap-x-4 ml-10 hidden font-serif">
          {links.map((link, idx) => (
            <motion.li key={idx} className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={link.href} className={`${pathName === link.href ? "text-green-500 font-semibold" : "text-white"} text-sm transition-all duration-300 group-hover:text-green-300`}>
                {link.name}
              </Link>
              <span className={`${pathName === link.href ? "w-full" : "w-0"} group-hover:w-full transition-all duration-300 absolute left-0 bottom-0 h-0.5 bg-green-500`} />
            </motion.li>
          ))}
        </ul>

        {/* Bell Icon & Dropdown for Notifications (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="h-5 w-5 text-white cursor-pointer hover:text-green-300 transition-transform duration-300 transform hover:scale-110" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 bg-gray-800 text-white rounded-md shadow-md">
              <DropdownMenuLabel className="text-xs">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 hover:bg-gray-700 text-xs">
                <p>New updates are coming</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </>
  );
}
