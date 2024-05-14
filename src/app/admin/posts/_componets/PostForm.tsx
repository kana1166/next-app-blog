/** @format */

import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "@/types/Category";
import { supabase } from "@/util/supabase";
import { v4 as uuidv4 } from "uuid"; // 固有IDを生成するライブラリ
import Image from "next/image";
import { FormData } from "@/types/FormData";

interface Props {
  mode: "new" | "edit";
  title: string;
  content: string;
  categories: Category[];
  thumbnailImageKey: string;
  setThumbnailImageKey: (thumbnailImageKey: string) => void;
  onSubmit: (data: FormData) => void;
  onDelete?: () => void;
}

const PostForm: React.FC<Props> = ({
  mode,
  title,
  content,
  categories,
  thumbnailImageKey,
  setThumbnailImageKey,
  onSubmit,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: title,
      content: content,
      category: categories[0]?.id || 0, // カテゴリーの初期値を設定、存在しない場合は0
      thumbnailImageKey: thumbnailImageKey,
    },
  });
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  useEffect(() => {
    if (!thumbnailImageKey) return; // アップロード時に取得した、thumbnailImageKeyを用いて画像のURLを取得

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey]);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files[0]; // 選択された画像を取得
    const filePath = `private/${uuidv4()}`; // ファイルパスを指定

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from("blog") // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message);
      return;
    }

    setThumbnailImageKey(data.path);
    setValue("thumbnailImageKey", data.path);
  };

  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          {...register("title", { required: "タイトルは必須です" })}
          type="text"
          id="title"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-[10px]"
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          本文
        </label>
        <textarea
          {...register("content", { required: "本文は必須です" })}
          id="content"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-[10px]"
        />
        {errors.content && (
          <p className="text-red-500 text-xs">{errors.content.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="thumbnailImageKey"
          className="block text-sm font-medium text-gray-700"
        >
          サムネイルURL
        </label>
        <input
          type="file"
          id="tthumbnailImageKey"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-[10px]"
        />
        {thumbnailImageKey ? (
          <Image
            src={`https://qxsmvoftnuaqdbtoqkug.supabase.co/storage/v1/object/public/blog/${thumbnailImageKey}`}
            alt={title}
            width={200}
            height={200}
            className="w-[200px] h-auto"
          />
        ) : null}
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー
        </label>
        <select
          {...register("category", { required: "カテゴリーは必須です" })}
          id="category"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-[10px]"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
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

export default PostForm;
