/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  mode: "new" | "edit";
  name: string;
  onSubmit: (data: { name: string }) => void | Promise<void>;
  onDelete?: () => void;
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  onSubmit,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: name || "",
    },
  });

  useEffect(() => {
    console.log("Form mode:", mode, "Name:", name); // 現在のモードと名前をログに出力
    setValue("name", name); // setValueを使ってフォームの値を設定
  }, [mode, name, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー名
        </label>
        <input
          {...register("name", { required: "カテゴリー名は必須です" })}
          type="text"
          id="name"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-[10px]"
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="flex justify-center gap-6">
        <button
          type="submit"
          className="py-2 px-4 text-white bg-gray-500 rounded-[10px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            className="py-2 px-4 text-white bg-gray-500 rounded-[10px] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={onDelete}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
