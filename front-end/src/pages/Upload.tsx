import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/quill.css";

function Upload() {
  return (
    <div>
      <h1 className="my-5 text-7xl uppercase font-bold text-center">
        Write Blog
      </h1>
      <form action="" className="mt-12 flex flex-col gap-y-8">
        <input
          placeholder="Your blog's title..."
          className="block w-full focus:outline-none py-2 px-4 text-3xl font-bold border focus:border-text-secondary-light focus:dark:border-text-secondary-dark bg-transparent rounded-md"
        />
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          className="block w-full focus:outline-none py-2 px-4 text-xl italic font-medium border focus:border-text-secondary-light focus:dark:border-text-secondary-dark bg-transparent rounded-md"
          placeholder="Description of your blog..."
        ></textarea>
        <ReactQuill placeholder="Your blog's content..." />
      </form>
    </div>
  );
}

export default Upload;
