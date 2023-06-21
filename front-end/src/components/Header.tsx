import { Link } from "react-router-dom";
import { Moon, PenNib, Sun, UserCircle } from "@phosphor-icons/react";

function Header() {
  return (
    <div className="py-8 flex items-center justify-between">
      <div>
        <Link
          to={"/"}
          className="text-4xl font-semibold text-primary-light dark:text-primary-dark hover:text"
        >
          My Blog
        </Link>
      </div>
      <div className="flex items-center gap-x-4 ">
        <Link className="text-primary-light dark:text-primary-dark" to={"/"}>
          Blog
        </Link>
        <Link
          to={"#"}
          className="flex items-center py-1 px-3 gap-x-2 border border-gray-300 rounded-full hover:border-sky-300 duration-300"
        >
          <PenNib size={20} />
          <p>Create Post</p>
        </Link>
        <div className="flex items-center justify-center cursor-pointer text-primary-light dark:text-primary-dark hover:text-sky-300 duration-200">
          <UserCircle size={40} />
        </div>
        <div className="flex items-center justify-center cursor-pointer text-primary-light dark:text-primary-dark hover:text-sky-300 duration-200">
          <Sun size={32} />
          {/* <Moon size={32} /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
