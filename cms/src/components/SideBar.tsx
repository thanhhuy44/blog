import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { Book, House, Icon, User, Chat } from "@phosphor-icons/react";

type ISideBar = {
  title: string;
  link: string;
  icon: Icon;
};

const items: ISideBar[] = [
  {
    title: "Home",
    link: "/",
    icon: House,
  },
  {
    title: "Blog",
    link: "/blogs",
    icon: Book,
  },
  {
    title: "User",
    link: "/users",
    icon: User,
  },
  {
    title: "Comment",
    link: "/comments",
    icon: Chat,
  },
];

function SideBar() {
  const { pathname } = useLocation();

  return (
    <div className="w-[280px] h-full flex flex-col">
      <Link
        to={"/"}
        className="flex items-center justify-center gap-x-2 py-2 select-none"
      >
        <img className="w-[80px]" src={Logo} alt="logo" />
        <h1 className="text-2xl font-bold uppercase ">BLOG</h1>
      </Link>
      <ul className="menu rounded-box mt-8">
        {items.map((item, index) => {
          const IconElement = item.icon;
          const isActive = pathname === item.link;
          return (
            <li key={index}>
              <Link
                to={item.link}
                className={`flex items-center gap-x-3 text-lg font-medium ${
                  isActive ? "active" : ""
                }`}
              >
                <IconElement size={24} weight="fill" />
                <p>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
