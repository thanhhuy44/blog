import MainLayout from '@/layouts/MainLayout';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import Banner from '@/assets/images/banner.png';
import { useRouter } from 'next/router';
import BlogApi from '@/api/blog';
import { Blog } from '@/interface';
import Skeleton from 'react-loading-skeleton';
import dayjs from 'dayjs';
function BlogDetail() {
  const router = useRouter();
  const query = router.query.id;

  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetData = async (id: string) => {
    const response = await BlogApi.getDetail(id);
    if (response) {
      setBlog(response as Blog);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setBlog(undefined);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      handleGetData(router.query.id as string);
    }
  }, [router.query.id]);

  return (
    <div className="my-32 container max-w-4xl mx-auto">
      <div className=" flex flex-col gap-y-4">
        {loading ? (
          <Skeleton className="max-w-xs" />
        ) : (
          <p className="text-[#495057] text-xs font-light leading-5">
            {dayjs(blog?.createdAt).format('DD/MM/YYYY')}
          </p>
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <h1 className="text-[#212529] text-2xl font-bold leading-10">
            {blog?.title}
          </h1>
        )}
        {loading ? (
          <Skeleton count={2} />
        ) : (
          <p className="text-[#495057] text-xs font-light leading-5">
            {blog?.description}
          </p>
        )}
        <span className="w-full h-[1px] bg-[#141416]"></span>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="flex items-center gap-x-3">
            <img
              className="w-8"
              src={blog?.author.avatar}
              alt="author avatar"
            />
            <p className="text-[#495057] text-xs font-light leading-5">
              {blog?.author.fullname}
            </p>
          </div>
        )}
        {loading ? (
          <Skeleton className="aspect-video" />
        ) : (
          <img
            className="w-full my-16"
            src={blog?.banner as string}
            alt="banner"
          />
        )}
        {loading ? (
          <Skeleton count={12} />
        ) : (
          <div
            className="font-normal text-lg whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: blog?.content as string,
            }}></div>
        )}
      </div>
    </div>
  );
}

BlogDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default BlogDetail;
