import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    organizationId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      authorId: identity.subject,
      authorName: identity.name! || identity.nickname! || identity.email!,
      imageUrl: randomImage,
      organizationId: args.organizationId,
      title: args.title,
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) => q.eq("userId", userId).eq("boardId", args.id))
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const title = args.title.trim();

    if (!title) {
      throw new Error("`title` arg is required!");
    }

    if (title.length >= 50) {
      throw new Error("`title` arg cannot be greater than 50 chars!");
    }

    const board = await ctx.db.patch(args.id, {
      title: title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { _id: v.id("boards"), organizationId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const board = await ctx.db.get(args._id);

    if (!board) throw new Error("The board you're looking for may have been renamed, deleted or moved elsewhere!");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) => q.eq("userId", userId).eq("boardId", board._id))
      .unique();

    if (existingFavorite) throw new Error("This board had already been marked as favorite!");

    await ctx.db.insert("favoriteBoards", {
      userId,
      boardId: board._id,
      organizationId: args.organizationId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { _id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    const board = await ctx.db.get(args._id);

    if (!board) throw new Error("The board you're looking for may have been renamed, deleted or moved elsewhere!");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("favoriteBoards")
      .withIndex("by_user_board", (q) => q.eq("userId", userId).eq("boardId", board._id))
      .unique();

    if (!existingFavorite) throw new Error("This board was never been marked as favorited!");

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
