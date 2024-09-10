/** @format */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postCategories: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ status: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "OK", post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { status: "Failed to fetch post" },
      { status: 400 }
    );
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const { title, content, categories, thumbnailImageKey } =
    await request.json();

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        thumbnailImageKey,
      },
    });

    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
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
        postId: post.id,
        categoryId: category.id,
      };
    });

    await prisma.postCategory.createMany({
      data: postCategories,
    });

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
