"use client";

import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import From from "next/form";
import {
  ClerkLoaded,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import useBasketStore from "../../../store/store"; // Import the basket store

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user } = useUser();
  const [value, setValue] = useState<string>("Home");

  const basketItemsCount = useBasketStore((state) => state.items.length); // Get the number of items in the cart



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error creating passkey:", JSON.stringify(error, null, 2));
    }
  };


  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold text-slate-800">
            NextCart
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setValue(item.name)}
            >
              <Link
                href={item.href}
                className={`text-gray-600 hover:text-slate-500 transition-colors font-semibold ${
                  item.name === value ? "text-slate-800" : ""
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Search and Cart Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative mt-[5px]">
            <button
              aria-label="Search"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleSearch}
            >
              <Search />
            </button>
            <AnimatePresence>
              {isSearchVisible && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "200px" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-full mt-2"
                >
                  <From action="/search">
                    <input
                      type="text"
                      name="query"
                      placeholder="Search..."
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </From>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href={"/cart"}>
            <button
              aria-label="Shopping Cart"
              className="text-gray-600 hover:text-blue-600 transition-colors relative"
            >
              <ShoppingCart />
              {basketItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 rounded-full bg-red-500 text-white text-xs w-4 h-4 ">
                  {basketItemsCount}
                </span>
              )}
            </button>
          </Link>
          <ClerkLoaded>


            {user ? (
              <div className="flex items-center space-x-2 font-bold">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400 ">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {user?.passkeys.length === 0 && (
              <button
                className="bg-white hover:bg-blue-500 text-black hover:text-white animate-pulse font-bold py-2 px-4 rounded border border-blue-300"
                onClick={createClerkPasskey}
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-2">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
