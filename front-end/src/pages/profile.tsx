import UserApi from '@/api/user';
import MyProfile from '@/components/MyProfile';
import { User } from '@/interface';
import MainLayout from '@/layouts/MainLayout';
import { AppDispatch, AppState } from '@/redux';
import { setUser } from '@/redux/states/auth';
import { CircleNotch, PencilLine } from '@phosphor-icons/react';
import Head from 'next/head';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.user.user);
  const [mount, setMount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isChangeAvt, setIsChangeAvt] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<number>(1);

  const handleGetData = async (id: string) => {
    const response = await UserApi.getDetail(id);
    if (response) {
      setTimeout(() => {
        dispatch(response as User);
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleUpdateAvtar = async (file: FileList) => {
    setIsChangeAvt(true);
    const response = await UserApi.updateAvatar(file[0]);
    if (response) {
      dispatch(setUser(response as User));
      setTimeout(() => {
        toast.success('Update avatar success!');
        setIsChangeAvt(false);
      }, 1500);
    } else {
      setTimeout(() => {
        toast.error('Update avatar error!');
        setIsChangeAvt(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (user) {
      handleGetData(user._id);
    }
    setMount(true);
  }, []);

  return mount ? (
    <div className="container mx-auto px-2 my-12 max-w-5xl">
      <div className="flex items-center gap-x-5">
        {loading ? null : (
          <Head>
            <title>Profile | {user?.fullname}</title>
            <meta name="description" content={`profile ${user?.fullname}`} />
          </Head>
        )}
        {loading ? (
          <Skeleton circle className="w-20 h-20 aspect-square" />
        ) : (
          <div className="relative">
            <Image
              src={user?.avatar as string}
              fill
              className="!static !w-20 aspect-square rounded-full object-cover"
              alt="avatar"
            />
            <label
              htmlFor="avatar"
              className={`absolute left-0 right-0 bottom-0 top-0 z-10 cursor-pointer bg-black/30 rounded-full opacity-0 hover:opacity-100 ${
                isChangeAvt ? '!opacity-100' : ''
              } duration-300 flex items-center justify-center text-white select-none`}>
              {isChangeAvt ? (
                <CircleNotch size={24} className="animate-spin" />
              ) : (
                <PencilLine size={24} />
              )}
            </label>
            <input
              disabled={isChangeAvt}
              hidden
              id="avatar"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  handleUpdateAvtar(e.target.files);
                }
              }}
            />
          </div>
        )}
        {loading ? (
          <div className="flex-1 flex flex-col gap-y-3">
            <Skeleton count={2} className="w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-bold">{user?.fullname}</h1>
            <p className="text-[#333] text-base">{user?.email}</p>
          </div>
        )}
      </div>
      <div className="mt-12 mb-4 flex items-center border-b border-b-secondary w-fit">
        <div
          onClick={() => setTabActive(1)}
          className={`select-none px-8 py-2 border-b-2 ${
            tabActive === 1
              ? 'border-primary bg-gray-400'
              : 'border-transparent hover:bg-gray-300'
          } cursor-pointer duration-300`}>
          My profile
        </div>
        <div
          onClick={() => setTabActive(2)}
          className={`select-none px-8 py-2 border-b-2 ${
            tabActive === 2
              ? 'border-primary bg-gray-400'
              : 'border-transparent hover:bg-gray-300'
          } cursor-pointer duration-300`}>
          My blogs
        </div>
        <div
          onClick={() => setTabActive(3)}
          className={`select-none px-8 py-2 border-b-2 ${
            tabActive === 3
              ? 'border-primary bg-gray-400'
              : 'border-transparent hover:bg-gray-300'
          } cursor-pointer duration-300`}>
          Liked blogs
        </div>
      </div>
      <div>{tabActive === 1 ? <MyProfile user={user as User} /> : null}</div>
    </div>
  ) : null;
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Profile;
