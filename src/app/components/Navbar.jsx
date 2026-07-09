"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function LinkNavbar({ url, title }) {
    const isActive = mounted && pathName === url;
    const base = "px-5 2xl:px-6 py-2 2xl:py-[10px] rounded-full text-sm font-medium";
    const active = "bg-blue-600 text-white";
    const inactive = "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800";

    return (
      <Link href={url} className={`${base} ${isActive ? active : inactive}`}>
        {title}
      </Link>
    );
  }

  return (
    <header className="max-w-7xl mx-auto p-4 z-50">
      <nav className="flex justify-between items-center mx-4 bg-zinc-100 px-8 py-3 rounded-xl">
        <Link href="/">
          <h1 className="font-semibold text-lg text-blue-600">ClimateDash</h1>
        </Link>

        <div className="flex items-center gap-2 p-[6px] rounded-full bg-white">
          <LinkNavbar url="/" title="Home" />
          <LinkNavbar url="/historical" title="Historical" />
          <LinkNavbar url="/forecast" title="Forecast" />
          <LinkNavbar url="/indices" title="Indices" />
          <LinkNavbar url="/about" title="About" />
          <LinkNavbar url="/contact" title="Contact" />
        </div>
      </nav>
    </header>
  );
}
