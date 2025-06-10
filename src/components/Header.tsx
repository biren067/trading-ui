"use client";

import Link from "next/link";
import { usePathname,useRouter, } from "next/navigation";
import { useAuth } from '@/store/AuthContext';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
//   { name: "Contact", href: "/contact" },
  // { name: "Login", href: "/login" },
  // { name: "Logout", href: "/logout" },
];




export default function Header() {
  const { isLoggedIn,logout} = useAuth();    
  const pathname = usePathname();
  // const router = useRouter();
  const handleLogout = () => {
    logout();               // call logout function from context
  };

  return (
    <header className="w-full text-white shadow-md sticky top-0 z-50 bg-black">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Trading
        </Link>
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium hover:text-blue-600 py-auto ${
                pathname === item.href ? "text-yellow-300 " : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {/* Show Login or Logout based on auth status */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`text-sm font-medium hover:text-blue-600 ${
                pathname === "/logout" ? "text-yellow-300" : "text-white"
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-medium hover:text-blue-600 ${
                pathname === "/login" ? "text-yellow-300" : "text-white"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
