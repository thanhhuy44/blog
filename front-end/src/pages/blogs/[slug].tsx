import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Banner from "@/assets/images/banner.png";
import { useRouter } from "next/router";
import BlogApi from "@/api/blog";
import { Blog, Comment as CommentType } from "@/interface";
import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";
import Link from "next/link";
import { CircleNotch } from "@phosphor-icons/react";
import CommentApi from "@/api/comment";
import toast from "react-toastify";
import Comment from "@/components/Comment";

interface FormInputs {
  author: string;
  blog: string;
  content: string;
}
function BlogDetail() {
  const router = useRouter();
  const user = useSelector((state: AppState) => state.user.user);
  const isLogin = useSelector((state: AppState) => state.user.isLogin);
  const [mount, setMount] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isComment, setIsComment] = useState<boolean>(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();

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

  const handleComment = async (data: FormInputs) => {
    setIsComment(true);
    const comment = await CommentApi.create(data);
    if (comment) {
      console.log(
        "🚀 ~ file: [slug].tsx:61 ~ handleComment ~ comment:",
        comment
      );
    }

    setTimeout(() => {
      reset({
        content: "",
        author: data.author,
        blog: data.blog,
      });
      setIsComment(false);
    }, 1500);
  };

  useEffect(() => {
    if (router.query.id) {
      handleGetData(router.query.id as string);
      setValue("blog", router.query.id as string);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (isLogin && user) {
      setValue("author", user._id);
    }
  }, [isLogin, user]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div className="my-32 container max-w-4xl mx-auto px-2">
      <div className=" flex flex-col gap-y-4">
        {loading ? (
          <Skeleton className="max-w-xs" />
        ) : (
          <p className="text-[#495057] text-xs font-light leading-5">
            {dayjs(blog?.createdAt).format("DD/MM/YYYY")}
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
            <Image
              fill
              className="!w-8 !static"
              src={blog?.author.avatar as string}
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
          <Image
            fill
            className="w-full my-16 !static"
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
            }}
          ></div>
        )}
      </div>
      <div className="my-8 h-[1px] bg-[#333]"></div>
      {mount &&
        (isLogin ? (
          <div className="flex flex-col gap-y-4 items-end">
            <div className="flex items-start gap-x-4 flex-1 w-full">
              <Image
                fill
                alt="avatar"
                src={
                  "https://my-blog-assets.s3.us-east-005.backblazeb2.com/default_avatar.png"
                }
                className="!static !aspect-square !w-8"
              />
              <div className="flex-1">
                <textarea
                  disabled={isComment}
                  {...register("content", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  placeholder="Write a comment..."
                  rows={6}
                  className="w-full flex-1 border border-[#ccc] focus:!border-[#333] duration-300 focus:outline-0 focus:shadow-none p-3 resize-none"
                ></textarea>
                <p className="mt-1 text-xs text-[#FF0000]">
                  {errors.content ? errors.content.message : ""}
                </p>
              </div>
            </div>
            <div
              onClick={handleSubmit(handleComment)}
              className={`min-w-[150px] flex items-center justify-center py-2 px-6 text-white font-medium bg-[#141416] hover:bg-black/80 duration-300 select-none active:bg-slate-400 ${
                isComment ? "cursor-wait opacity-40" : " cursor-pointer"
              }`}
            >
              {isComment ? (
                <CircleNotch className="animate-spin" size={24} />
              ) : (
                "Comment"
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-1">
            <Link href={"/login"}>
              <p className="font-medium hover:underline">Login</p>
            </Link>
            <p>to comment.</p>
          </div>
        ))}
      {/* loading */}

      {/* list comment */}
      <div className="flex flex-col gap-y-4">
        {blog?.comments?.length
          ? blog.comments.map((comment, index) => (
              <Comment comment={comment} key={index} />
            ))
          : null}
      </div>
    </div>
  );
}

BlogDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default BlogDetail;
