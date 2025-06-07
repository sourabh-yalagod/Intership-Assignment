import { useState } from "react";
import {
  useUser,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function NavBar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          TaskScheduler
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to={user ? `/schedule/${user.id}` : "/signin"}
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Schedule
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-indigo-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to={user ? `/schedule/${user.id}` : "/signin"}
            className="block text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Schedule
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      )}
    </nav>
  );
}
