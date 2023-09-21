import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";

function Header() {
  const [isScrolling, setIsScrolling] = useState(false);
  const handleScroll = (e: any) => {
    setIsScrolling(true);
    handleEndScroll();
  };

  const handleEndScroll = useMemo(
    () => _.debounce(() => setIsScrolling(false), 500),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white z-[2] px-2 ${
        isScrolling ? "-translate-y-full" : "translate-y-0"
      } duration-500`}
    >
      <div className="container w-full mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            className="text-[#495057] text-lg font-bold leading-6"
            href={"/"}
          >
            VENCE
          </Link>
        </div>
        <div className="flex items-center gap-x-6 text-sm">
          <div className="flex items-center py-1 px-2 gap-x-3 bg-white/60 w-48 rounded">
            <input
              type="text"
              placeholder="Search..."
              size={1}
              className="flex-1 bg-transparent outline-none"
            />
            <MagnifyingGlass className="" />
          </div>
          <Link
            href={"/login"}
            className="text-[#495057] text-xs font-medium leading-6"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="py-1 px-4 rounded-full bg-[#495057] text-white text-xs font-medium leading-6"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
