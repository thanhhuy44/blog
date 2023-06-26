import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Moon, PenNib, Sun, UserCircle } from "@phosphor-icons/react";
import { setTheme } from "../redux/theme";

function Header() {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleChangeTheme = (theme: string) => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(theme));
  };

  return (
    <div className="py-8 flex items-center justify-between">
      <div>
        <Link
          to={"/"}
          className="text-4xl font-semibold text-text-primary-light dark:text-text-primary-dark hover:text"
        >
          My Blog
        </Link>
      </div>
      <div className="flex items-center gap-x-4 ">
        <Link
          className="text-text-primary-light dark:text-text-primary-dark"
          to={"/"}
        >
          Blog
        </Link>
        <Link
          to={"/upload"}
          className="flex items-center py-1 px-3 gap-x-2 border border-gray-300 rounded-full hover:border-sky-300 duration-300 text-text-primary-light dark:text-text-primary-dark"
        >
          <PenNib size={20} />
          <p>Create Post</p>
        </Link>
        <div className="flex items-center justify-center cursor-pointer text-text-primary-light dark:text-text-primary-dark hover:text-sky-300 duration-200">
          <UserCircle size={40} />
        </div>
        <div className="flex items-center justify-center gap-x-4 cursor-pointer text-text-primary-light dark:text-text-primary-dark hover:text-sky-300 duration-200">
          {isDarkMode ? (
            <Sun
              size={32}
              onClick={() => {
                handleChangeTheme("light");
              }}
            />
          ) : (
            <Moon
              size={32}
              onClick={() => {
                handleChangeTheme("dark");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
