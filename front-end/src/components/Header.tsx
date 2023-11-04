import Link from 'next/link';
import { MagnifyingGlass, SignOut } from '@phosphor-icons/react';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '@/redux';
import { setIslogin, setUser } from '@/redux/states/auth';
import { useRouter } from 'next/router';
import { useClickAway } from '@uidotdev/usehooks';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector((state: AppState) => state.user.isLogin);
  const user = useSelector((state: AppState) => state.user.user);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>('');
  // const handleScroll = (e: any) => {
  //   setIsScrolling(true);
  //   handleEndScroll();
  // };
  const dropdownRef = useClickAway(() => {
    setDropdown(false);
  });

  // const handleEndScroll = useMemo(
  //   () => _.debounce(() => setIsScrolling(false), 500),
  //   []
  // );

  const handleSearch = async (text: string) => {
    console.log(text);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setIslogin(false));
    dispatch(setUser(null));
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div
      className={`static top-0 left-0 right-0 bg-white z-[2] px-2 ${
        isScrolling ? '-translate-y-full' : 'translate-y-0'
      } duration-500`}>
      <div className="container w-full mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            className="text-[#495057] text-lg font-bold leading-6"
            href={'/'}>
            VENCE
          </Link>
        </div>
        <div className="flex items-center gap-x-6 text-sm">
          <div className="flex items-center py-1 pr-2 pl-4 gap-x-3 bg-red-50 w-48 rounded-full">
            <input
              type="text"
              placeholder="Search..."
              size={1}
              className="flex-1 bg-transparent outline-none"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <MagnifyingGlass
              className={`${
                !textSearch
                  ? 'opacity-50 cursor-default'
                  : 'opacity-100 cursor-pointer'
              } `}
            />
          </div>
          {isLogin ? (
            <div
              ref={dropdownRef as LegacyRef<HTMLDivElement>}
              className="relative">
              <div
                onClick={() => setDropdown((prev) => !prev)}
                className="flex items-center gap-x-2 cursor-pointer hover:bg-slate-200 rounded-md duration-300 px-2 py-1 select-none">
                <img
                  alt="avatar"
                  src={user?.avatar}
                  className="aspect-square rounded-full shadow-lg w-6"
                />
                <p>{user?.fullname}</p>
              </div>
              <div
                className={`${
                  dropdown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                } duration-300 ease-in-out origin-top absolute w-[200px] top-full right-0 mt-2 shadow-lg rounded-md py-3 bg-white`}>
                <div
                  onClick={handleSignOut}
                  className="select-none p-2 flex items-center gap-x-2 cursor-pointer hover:bg-red-200 hover:text-red-500 duration-300">
                  <SignOut size={20} />
                  <p className="flex-1">Log Out</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link
                href={'/login'}
                className="text-[#495057] text-xs font-medium leading-6 rounded-full hover:bg-slate-100 py-1 px-4 duration-300">
                Login
              </Link>
              <Link
                href={'/register'}
                className="py-1 px-4 rounded-full bg-[#495057] hover:bg-slate-800 duration-300 text-white text-xs font-medium leading-6">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
