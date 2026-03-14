import { useState } from "react";

const AddPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      return "";
    }

    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-blue-800 rounded-lg p-5 bg-[#f7fafc]"
    >
      <h3 className="text-xl font-bold text-blue-700 mb-2 text-center border-b-4 border-blue-800 border p-0.5">
        เพิ่มโพสต์ใหม่
      </h3>

      <div>
        <div className="mb-2">
          {title.length > 10 ? (
            <span className="flex items-center">
              <p className="text-green-500">{title.length}</p>/100
            </span>
          ) : (
            <span className="flex items-center">
              <p className="text-red-500">{title.length}</p>/100
            </span>
          )}
        </div>
        <input
          maxLength={100}
          type="text"
          placeholder="หัวข้อโพสต์"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-5 border border-blue-400 rounded-sm focus:outline-none focus:border-red-500"
        />
      </div>
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full p-2 mb-5 border border-blue-400 rounded-sm focus:outline-none focus:border-red-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-sm hover:bg-red-500 transition cursor-pointer active:brightness-80"
      >
        โพสต์
      </button>
    </form>
  );
};

export default AddPostForm;
