import React from "react";

interface Props {
  mode: "new" | "edit";
  name: string;
  setName: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー名
        </label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
        />
      </div>
      <div className="flex justify-center gap-6">
        <button
          type="submit"
          className="py-2 px-4  text-white bg-gray-500 rounded-[10px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 "
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            className="py-2 px-4  text-white bg-gray-500 rounded-[10px] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 "
            onClick={onDelete}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
