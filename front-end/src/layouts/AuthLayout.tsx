import Image from 'next/image';
import { ReactNode } from 'react';
import Banner from '@/assets/images/banner-auth.gif';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux';
import { useRouter } from 'next/router';

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isLogin = useSelector((state: AppState) => state.user.isLogin);

  if (isLogin && router.pathname !== '/change-password') {
    router.replace('/');
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-screen h-screen overflow-hidden">
      <div className="min-h-full w-full bg-red-200 overflow-y-auto flex flex-col items-center justify-center">
        <div className="py-8 px-4 w-full max-w-3xl flex justify-center">
          {children}
        </div>
      </div>
      <div className="hidden md:block h-screen overflow-hidden">
        <Image
          className="h-full w-full object-cover object-center"
          src={Banner}
          alt="banner"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
