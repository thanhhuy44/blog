import UserApi from '@/api/user';
import { User } from '@/interface';
import MainLayout from '@/layouts/MainLayout';
import { AppState } from '@/redux';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state: AppState) => state.user.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User>();

  const handleGetData = async (id: string) => {
    const response = await UserApi.getDetail(id);
    if (response) {
      setTimeout(() => {
        setData(response as User);
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (user) {
      handleGetData(user._id);
    }
  }, []);

  return (
    <div className="container mx-auto px-2 my-12 max-w-5xl">
      {loading ? (
        <Skeleton className="w-20 h-20 rounded-full" />
      ) : (
        <div className="flex items-center gap-x-5">
          <Image
            src={data?.avatar as string}
            fill
            className="!static !w-20 aspect-square rounded-full"
            alt="avatar"
          />
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-bold">{data?.fullname}</h1>
            <p className="text-[#333] text-base">{data?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Profile;
