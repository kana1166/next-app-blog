"use client";
import { useState } from "react";

const useFormValidation = () => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = (name: string, email: string, message: string) => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    // 名前のバリデーション
    if (!name.trim()) {
      errors.name = "名前は必須です";
      isValid = false;
    } else if (name.length > 30) {
      errors.name = "名前は30文字以内で入力してください";
      isValid = false;
    }

    // メールアドレスのバリデーション
    if (!email) {
      errors.email = "メールアドレスは必須です";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "メールアドレスが無効です";
      isValid = false;
    }

    // メッセージのバリデーション
    if (!message.trim()) {
      errors.message = "メッセージは必須です";
      isValid = false;
    } else if (message.length > 500) {
      errors.message = "メッセージは500文字以内で入力してください";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return { formErrors, validateForm };
};

export default useFormValidation;
