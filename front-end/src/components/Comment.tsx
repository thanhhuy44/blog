import { Comment, User } from "@/interface";
import { AppState } from "@/redux";
import { Heart, PaperPlaneRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Comment({ comment }: { comment: Comment }) {
  const isLogin = useSelector((state: AppState) => state.user.isLogin);
  const user = useSelector((state: AppState) => state.user.user);
  const [mount, setMount] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);

  const author = comment.author as User;

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    mount && (
      <div className="flex items-start gap-x-4 w-full">
        <Image
          src={
            "https://my-blog-assets.s3.us-east-005.backblazeb2.com/default_avatar.png"
          }
          alt="avatar"
          fill
          className="!static !w-8"
        />
        <div className="flex-1 block overflow-hidden">
          <div className="flex-1 max-w-full flex flex-col gap-y-1">
            <p className="leading-8 font-semibold">{author.fullname}</p>
            <span className="font-normal text-[#333] break-words inline-block">
              {comment.content}
            </span>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                {comment.like_count > 0 && <p>{comment.like_count}</p>}
                <Heart
                  size={24}
                  className="cursor-pointer hover:text-red-400"
                />
              </div>
              <div
                onClick={() => {
                  setReply((prev) => !prev);
                }}
                className="hover:underline cursor-pointer select-none"
              >
                <p>Reply</p>
              </div>
            </div>
            {reply ? (
              <div className="flex items-center gap-x-3 my-2">
                <Image
                  fill
                  alt="avatar"
                  src={user?.avatar as string}
                  className="!static !w-8 aspect-square rounded-full"
                />
                <div className="flex-1 flex items-center py-1 px-2 border focus-within:outline-0 focus-within:border-[#333] duration-300">
                  <input
                    type="text"
                    placeholder="Reply comment..."
                    className="flex-1 focus:outline-0"
                  />
                  <PaperPlaneRight
                    size={20}
                    weight="fill"
                    className="text-[#141416] cursor-pointer"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}

export default Comment;
