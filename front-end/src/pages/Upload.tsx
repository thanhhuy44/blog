import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "../styles/quill.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FilePlus } from "@phosphor-icons/react";
import { useState } from "react";
import blogApi from "../api/blog";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // Text formatting
    [{ header: [1, 2, 3, 4, 5, 6, false] }, "blockquote", "code-block"], // Headers
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "image", "video"], // Links, images, and videos
    ["clean"], // Remove formatting
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "header",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];

type Inputs = {
  title: string;
  description: string;
  thumbnail: File | undefined;
  body: string;
  author: string;
  categories: [string];
};

function Upload() {
  const [image, setImage] = useState<File>();
  const [imageDataUrl, setImageDataUrl] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      author: "648ff9348a7f0ca6854e9bdf",
      categories: ["6490081154516f5bfdd29c16"],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(
      "🚀 ~ file: Upload.tsx:59 ~ constonSubmit:SubmitHandler<Inputs>= ~ data:",
      data
    );
    // try {
    //   const reponse = await blogApi.upload(data);
    //   console.log(
    //     "🚀 ~ file: Upload.tsx:64 ~ constonSubmit:SubmitHandler<Inputs>= ~ reponse:",
    //     reponse
    //   );
    // } catch (error) {
    //   console.log(
    //     "🚀 ~ file: Upload.tsx:65 ~ constonSubmit:SubmitHandler<Inputs>= ~ error:",
    //     error
    //   );
    // }
  };

  return (
    <div>
      <h1 className="my-5 text-7xl uppercase font-bold text-center">
        Write Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 flex flex-col gap-y-8"
      >
        <div>
          <input
            {...register("title", {
              required: "Title is required!",
            })}
            placeholder="Your blog's title..."
            className={`block w-full focus:outline-none py-2 px-4 text-3xl font-bold border focus:border-text-secondary-light focus:dark:border-text-secondary-dark bg-transparent rounded-md ${
              errors.title && "border-red-500 focus:border-red-500"
            }`}
          />
          <p className="text-sm mt-1 mx-2 text-red-500 italic">
            {errors.title?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="thumbnail"
            className={`w-full flex flex-col items-center justify-center border rounded-xl cursor-pointer text-2xl hover:bg-pink-50 duration-300 ${
              errors.thumbnail && "border-red-500"
            }`}
          >
            {image ? (
              <img alt="Thumbnail" src={imageDataUrl} />
            ) : (
              <div className="my-4">
                <FilePlus size={40} />
                <p className="text-base">Thumbnail</p>
              </div>
            )}
          </label>
          <p className="text-sm mt-1 mx-2 text-red-500 italic">
            {errors.thumbnail?.message}
          </p>
          <input
            hidden
            {...register("thumbnail", {
              required: "Thumbnail is required!",
            })}
            type="file"
            id="thumbnail"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                const url = URL.createObjectURL(file);
                setImageDataUrl(url);
                setValue("thumbnail", e.target.files?.[0]);
              }
            }}
          />
        </div>
        <div>
          <textarea
            id="description"
            cols={30}
            rows={5}
            className={`block w-full focus:outline-none py-2 px-4 text-xl italic font-medium border focus:border-text-secondary-light focus:dark:border-text-secondary-dark bg-transparent rounded-md ${
              errors.description && "border-red-500 focus:border-red-500"
            }`}
            placeholder="Description of your blog..."
            {...register("description", {
              required: "Description is required!",
              minLength: {
                value: 50,
                message: "Minimum 50 characters",
              },
            })}
          ></textarea>
          <p className="text-sm mt-1 mx-2 text-red-500 italic">
            {errors.description?.message}
          </p>
        </div>
        <div>
          <Controller
            {...register("body", {
              required: "Content is required!",
            })}
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                modules={modules}
                formats={formats}
                readOnly={false}
                className={`border min-h-[250px] rounded-lg focus-within:border-text-secondary-light focus-within:dark:border-text-secondary-dark ${
                  errors.body && "border-red-500 focus:border-red-500"
                }`}
                theme="bubble"
                placeholder="Your blog's content..."
              />
            )}
          />
          <p className="text-sm mt-1 mx-2 text-red-500 italic">
            {errors.body?.message}
          </p>
        </div>
        <div className="pb-5 flex w-full justify-end">
          <input
            className="bg-sky-900 py-2 px-6 rounded-xl text-white shadow-main cursor-pointer font-semibold"
            value={"Upload your blog"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default Upload;
