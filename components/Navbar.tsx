"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      startTransition(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      });
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    if (typeof document === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && !target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [mobileMenuOpen]);

  // Hover-based dropdown handlers (desktop only)
  const handleMouseEnter = (item: string) => {
    setActiveDropdown(item);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Dropdown toggle handler
  const handleDropdownToggle = (item: string) => {
    setActiveDropdown((prev) => (prev === item ? null : item));
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#059669] text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center flex-nowrap space-x-5 xl:space-x-7 text-sm font-medium uppercase tracking-wide">
            <li className="whitespace-nowrap">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded transition-all duration-200 ${
                  isActive("/") 
                    ? "bg-[#047857] text-white" 
                    : "hover:bg-[#047857] hover:text-white"
                }`}
              >
                HOME
              </Link>
            </li>

            {/* About/Meet April with dropdown */}
            <li 
              className="relative whitespace-nowrap" 
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link 
                  href="/about" 
                  className={`px-3 py-2 rounded transition-all duration-200 ${
                    isActive("/about") 
                      ? "bg-[#047857] text-white" 
                      : "hover:bg-[#047857] hover:text-white"
                  }`}
                >
                  ABOUT
                </Link>
                <button
                  onClick={() => handleDropdownToggle("about")}
                  className="ml-1 p-1"
                  aria-label="Toggle About menu"
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === "about" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`absolute left-0 pt-1 w-52 z-50 ${
                  activeDropdown === "about" 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2 pointer-events-none lg:pointer-events-auto"
                }`}
              >
                <div className="bg-[#059669] text-white rounded-md shadow-lg py-2 border border-white/30 transition-all duration-300">
                  <ul>
                    <li>
                      <Link
                        href="/about"
                        className="block px-5 py-3 text-base hover:bg-white/10 transition-colors"
                      >
                        Meet April
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Services */}
            <li
              className="relative whitespace-nowrap"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`px-3 py-2 rounded transition-all duration-200 ${
                    isActive("/services")
                      ? "bg-[#047857] text-white"
                      : "hover:bg-[#047857] hover:text-white"
                  }`}
                >
                  SERVICES
                </Link>
                <button
                  onClick={() => handleDropdownToggle("services")}
                  className="ml-1 p-1"
                  aria-label="Toggle Services menu"
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === "services" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`absolute left-0 pt-1 w-60 z-50 ${
                  activeDropdown === "services"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none lg:pointer-events-auto"
                }`}
              >
                <div className="bg-[#059669] text-white rounded-md shadow-lg py-2 border border-white/30 transition-all duration-300">
                  <ul>
                    <li>
                      <Link
                        href="/spravato"
                        className="block px-5 py-3 text-base hover:bg-white/10 transition-colors"
                      >
                        SPRAVATO® Treatment
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Insurance & Payments */}
            <li className="whitespace-nowrap">
              <Link 
                href="/insurance-payments" 
                className={`px-3 py-2 rounded transition-all duration-200 ${
                  isActive("/insurance-payments") 
                    ? "bg-[#047857] text-white" 
                    : "hover:bg-[#047857] hover:text-white"
                }`}
              >
                INSURANCE &amp; PAYMENTS
              </Link>
            </li>

            {/* Contact/Request an Appointment with dropdown */}
            <li 
              className="relative whitespace-nowrap" 
              onMouseEnter={() => handleMouseEnter("contact")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link 
                  href="/contact" 
                  className={`px-3 py-2 rounded transition-all duration-200 ${
                    isActive("/contact") 
                      ? "bg-[#047857] text-white" 
                      : "hover:bg-[#047857] hover:text-white"
                  }`}
                >
                  CONTACT
                </Link>
                <button
                  onClick={() => handleDropdownToggle("contact")}
                  className="ml-1 p-1"
                  aria-label="Toggle Contact menu"
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === "contact" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`absolute left-0 pt-1 w-72 z-50 ${
                  activeDropdown === "contact" 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2 pointer-events-none lg:pointer-events-auto"
                }`}
              >
                <div className="bg-[#059669] text-white rounded-md shadow-lg py-2 border border-white/30 transition-all duration-300">
                  <ul>
                    <li>
                      <Link
                        href="/contact"
                        className="block px-5 py-3 text-base hover:bg-white/10 transition-colors"
                      >
                        Request an Appointment
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Resources */}
            <li className="whitespace-nowrap">
              <Link 
                href="/resources" 
                className={`px-3 py-2 rounded transition-all duration-200 ${
                  isActive("/resources") 
                    ? "bg-[#047857] text-white" 
                    : "hover:bg-[#047857] hover:text-white"
                }`}
              >
                RESOURCES
              </Link>
            </li>

            {/* Blog */}
            <li className="whitespace-nowrap">
              <Link 
                href="/blog" 
                className={`px-3 py-2 rounded transition-all duration-200 ${
                  isActive("/blog") 
                    ? "bg-[#047857] text-white" 
                    : "hover:bg-[#047857] hover:text-white"
                }`}
              >
                BLOG
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#059669]"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-semibold rounded-full border border-white/40 text-white hover:bg-[#047857] transition"
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-semibold rounded-full border border-white/40 text-white hover:bg-[#047857] transition"
              >
                CONTACT
              </Link>
            </div>
          </div>

          {/* Desktop Right side: Social Icons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 ml-8 xl:ml-16">
            <div className="flex items-center space-x-3 xl:space-x-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/findyourlightpsychiatry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors p-2"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/findyourlightpsychiatry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors p-2"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/findyourlightpsychiatry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors p-2"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@findyourlightpsychiatry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors p-2"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@findyourlightpsychiatry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors p-2"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 pb-4 space-y-1 border-t border-white/20">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                isActive("/")
                  ? "bg-[#047857] text-white"
                  : "text-white hover:bg-[#047857]"
              }`}
            >
              HOME
            </Link>

            {/* About with dropdown */}
            <div>
              <div
                className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive("/about")
                    ? "bg-[#047857] text-white"
                    : "text-white hover:bg-[#047857]"
                }`}
              >
                <Link href="/about" className="flex-1 text-left">
                  ABOUT
                </Link>
                <button
                  type="button"
                  onClick={() => handleDropdownToggle("about")}
                  className="ml-2 p-1 rounded hover:bg-white/10 focus-visible:outline focus-visible:outline-white/70"
                  aria-label="Toggle About menu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "about" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {activeDropdown === "about" && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded-md"
                  >
                    Meet April
                  </Link>
                </div>
              )}
            </div>

            {/* Services with dropdown */}
            <div>
              <div
                className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive("/services")
                    ? "bg-[#047857] text-white"
                    : "text-white hover:bg-[#047857]"
                }`}
              >
                <Link href="/services" className="flex-1 text-left">
                  SERVICES
                </Link>
                <button
                  type="button"
                  onClick={() => handleDropdownToggle("services")}
                  className="ml-2 p-1 rounded hover:bg-white/10 focus-visible:outline focus-visible:outline-white/70"
                  aria-label="Toggle Services menu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "services" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {activeDropdown === "services" && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    href="/spravato"
                    className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded-md"
                  >
                    SPRAVATO® Treatment
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/insurance-payments"
              className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                isActive("/insurance-payments")
                  ? "bg-[#047857] text-white"
                  : "text-white hover:bg-[#047857]"
              }`}
            >
              INSURANCE &amp; PAYMENTS
            </Link>

            {/* Contact with dropdown */}
            <div>
              <div
                className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive("/contact")
                    ? "bg-[#047857] text-white"
                    : "text-white hover:bg-[#047857]"
                }`}
              >
                <Link href="/contact" className="flex-1 text-left">
                  CONTACT
                </Link>
                <button
                  type="button"
                  onClick={() => handleDropdownToggle("contact")}
                  className="ml-2 p-1 rounded hover:bg-white/10 focus-visible:outline focus-visible:outline-white/70"
                  aria-label="Toggle Contact menu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "contact" ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {activeDropdown === "contact" && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded-md"
                  >
                    Request an Appointment
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/resources"
              className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                isActive("/resources")
                  ? "bg-[#047857] text-white"
                  : "text-white hover:bg-[#047857]"
              }`}
            >
              RESOURCES
            </Link>

            <Link
              href="/blog"
              className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                isActive("/blog")
                  ? "bg-[#047857] text-white"
                  : "text-white hover:bg-[#047857]"
              }`}
            >
              BLOG
            </Link>

            {/* Mobile Social Icons */}
            <div className="pt-4 border-t border-white/20 mt-4">
              <div className="flex items-center justify-center space-x-6 px-4">
                <a href="https://www.facebook.com/findyourlightpsychiatry" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors p-2" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/findyourlightpsychiatry" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors p-2" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/findyourlightpsychiatry" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors p-2" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
