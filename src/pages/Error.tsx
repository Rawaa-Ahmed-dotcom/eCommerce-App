import { Link } from "react-router-dom";
import {
    Search,
    Home,
    LayoutGrid,
    Package,
    User,
    Menu,
    ShoppingBag,
} from "lucide-react";
import { useState } from "react";

const Error = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const quickNavLinks = [
        { label: "Shop Women", href: "/shop/women" },
        { label: "Shop Men", href: "/shop/men" },
        { label: "Shop Kids", href: "/shop/kids" },
    ];

    const bottomNavItems = [
        { icon: Home, label: "HOME", href: "/" },
        { icon: LayoutGrid, label: "SHOP", href: "/shop" },
        { icon: Search, label: "SEARCH", href: "/search", active: true },
        { icon: Package, label: "ORDERS", href: "/orders" },
        { icon: User, label: "PROFILE", href: "/profile" },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans']">
            {/* ===================== HEADER ===================== */}
            <header className="flex items-center justify-between px-5 py-4 md:px-10 lg:px-20">
                <button className="text-[#1D3557] lg:hidden" aria-label="Menu">
                    <Menu size={24} />
                </button>

                {/* Desktop nav links (hidden on mobile) */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link
                        to="/shop/women"
                        className="text-[#1D3557] text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
                    >
                        Women
                    </Link>
                    <Link
                        to="/shop/men"
                        className="text-[#1D3557] text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
                    >
                        Men
                    </Link>
                    <Link
                        to="/shop/kids"
                        className="text-[#1D3557] text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
                    >
                        Kids
                    </Link>
                </nav>

                <Link
                    to="/"
                    className="text-[#1D3557] font-extrabold text-xl md:text-2xl tracking-tight"
                >
                    WearAll
                </Link>

                <button className="text-[#1D3557]" aria-label="Cart">
                    <ShoppingBag size={24} />
                </button>
            </header>

            {/* ===================== MAIN CONTENT ===================== */}
            <main className="flex-1 flex flex-col items-center px-5 md:px-10 lg:px-0">
                {/* --- Desktop Layout --- */}
                <div className="hidden lg:flex flex-col lg:flex-row items-center justify-center gap-16 xl:gap-24 w-full max-w-5xl mx-auto mt-16 mb-12">
                    {/* Left side - Text & Search */}
                    <div className="flex flex-col items-start max-w-md">
                        <h1 className="text-[#1D3557] text-5xl xl:text-6xl font-bold italic leading-tight mb-4">
                            Oops, it's not here.
                        </h1>
                        <p className="text-[#555555] text-base leading-relaxed mb-8">
                            The page you're looking for has moved or is no longer part of our
                            collection.
                        </p>

                        {/* Search Bar */}
                        <div className="w-full relative mb-10">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search our collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1D3557] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1D3557] transition-colors"
                            />
                        </div>

                        {/* Return to Home */}
                        <Link
                            to="/"
                            className="text-[#1D3557] text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                            Return to Home
                        </Link>
                    </div>

                    {/* Right side - Quick Navigation */}
                    <div className="flex flex-col items-center min-w-[280px]">
                        <p className="text-[#9CA3AF] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                            Quick Navigation
                        </p>
                        <div className="flex flex-col gap-3 w-full">
                            {quickNavLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="w-full bg-[#1D3557] text-white text-center py-4 rounded-lg text-sm font-semibold tracking-wide hover:bg-[#15294a] active:scale-[0.98] transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Mobile Layout --- */}
                <div className="flex lg:hidden flex-col items-center w-full max-w-sm mx-auto mt-10 mb-8">
                    <h1 className="text-[#1D3557] text-3xl sm:text-4xl font-bold italic leading-tight mb-3 text-left w-full">
                        Oops, it's not here.
                    </h1>
                    <p className="text-[#555555] text-sm leading-relaxed mb-8 text-center">
                        The page you're looking for has moved or
                        <br />
                        is no longer part of our collection.
                    </p>

                    {/* Search Bar */}
                    <div className="w-full relative mb-8">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search our collection..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1D3557] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1D3557] transition-colors"
                        />
                    </div>

                    {/* Quick Navigation */}
                    <p className="text-[#9CA3AF] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                        Quick Navigation
                    </p>
                    <div className="flex flex-col gap-3 w-full">
                        {quickNavLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="w-full bg-[#1D3557] text-white text-center py-4 rounded-lg text-sm font-semibold tracking-wide hover:bg-[#15294a] active:scale-[0.98] transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Return to Home */}
                    <Link
                        to="/"
                        className="mt-5 text-[#1D3557] text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                        Return to Home
                    </Link>
                </div>
            </main>

            {/* ===================== BOTTOM NAVIGATION (Mobile Only) ===================== */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] flex items-center justify-around py-2 z-50">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            to={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 ${item.active ? "relative" : ""
                                }`}
                        >
                            {item.active && (
                                <span className="absolute -top-5 w-12 h-12 bg-[#1D3557] rounded-full flex items-center justify-center shadow-lg">
                                    <Icon size={20} className="text-white" />
                                </span>
                            )}
                            {!item.active && (
                                <Icon size={20} className="text-[#64748B]" />
                            )}
                            <span
                                className={`text-[10px] font-semibold tracking-wide ${item.active
                                        ? "text-[#1D3557] mt-5 font-bold"
                                        : "text-[#64748B]"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Spacer to prevent content from hiding behind bottom nav on mobile */}
            <div className="h-20 lg:hidden" />
        </div>
    );
};

export default Error;
