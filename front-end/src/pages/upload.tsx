import MainLayout from "@/layouts/MainLayout";
import { ReactElement } from "react";
import dynamic from "next/dynamic";
import UploadApi from "@/api/upload";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: ImageUploader } = await import("quill-image-uploader");
    const { default: ImageResize } = await import("quill-image-resize");
    RQ.Quill.register("modules/imageUploader", ImageUploader);
    RQ.Quill.register("modules/imageResize", ImageResize);
    return function forwardRef({ ...props }) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
  }
);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function Upload() {
  return (
    <div className="container max-w-5xl mx-auto my-28">
      <QuillNoSSRWrapper
        // @ts-ignore
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ size: [] }],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
            ],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
          imageUploader: {
            upload: async (file: File) => {
              const url = await UploadApi.upload({ file });
              if (url) {
                return url;
              } else {
                alert("Upload failed!");
              }
            },
          },
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        }}
        formats={formats}
        theme="snow"
        onChange={(content: any) => {
          console.log("CONTETN: ", content);
        }}
        style={{
          fontSize: 20,
          fontFamily: "inherit ",
        }}
      />
    </div>
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Upload;
