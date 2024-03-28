"use client";

import React, { useState } from "react";
import InputField from "./_components/Input";
import TextareaField from "./_components/Textarea";
import useFormValidation from "./_components/useFormValidation";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { formErrors, validateForm } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // useFormValidation フックを使用したバリデーション
    if (!validateForm(name, email, message)) {
      return; // バリデーション失敗時
    }
    // バリデーション成功時の処理
    console.log(name, email, message);

    try {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );
      if (response.ok) {
        alert("送信しました");
        handleClear();
      } else {
        alert("送信に失敗しました");
      }
    } catch (error) {
      console.error("送信エラー", error);
      alert("送信中にエラーが発生しました");
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className="m-10 text-2xl">お問い合わせフォーム</div>
      <form
        className="flex flex-col items-center space-y-8 m-16"
        onSubmit={handleSubmit}
      >
        <InputField
          id="name"
          label="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={formErrors.name}
        />
        <InputField
          id="email"
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
        />
        <TextareaField
          id="message"
          label="メッセージ"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={formErrors.message}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          送信
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          クリア
        </button>
      </form>
    </>
  );
};

export default Contact;
