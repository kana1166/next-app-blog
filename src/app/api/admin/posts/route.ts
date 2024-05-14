/** @format */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/util/supabase";

const prisma = new PrismaClient();

// GETという命名にすることで、GETリクエストの時にこの関数が呼ばれる
export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
  try {
    // Postの一覧をDBから取得
    const posts = await prisma.post.findMany({
      include: {
        // カテゴリーも含めて取得
        postCategories: {
          include: {
            category: {
              // カテゴリーのidとnameだけ取得
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      // 作成日時の降順で取得
      orderBy: {
        createdAt: "desc",
      },
    });

    // レスポンスを返す
    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const POST = async (request: NextRequest, context: any) => {
  try {
    const body = await request.json();
    const { title, content, categories, thumbnailImageKey } = body;

    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailImageKey,
      },
    });

    const category = await prisma.category.findMany({
      where: {
        id: {
          in: categories,
        },
      },
    });

    const postCategories = category.map((category) => {
      return {
        categoryId: category.id,
      };
    });

    await prisma.postCategory.createMany({
      data: postCategories.map((postCategory) => {
        return {
          postId: data.id,
          categoryId: postCategory.categoryId,
        };
      }),
    });

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
