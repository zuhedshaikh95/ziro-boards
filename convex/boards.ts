import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    organizationId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized!");

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("favoriteBoards")
        .withIndex("by_user_organization", (q) =>
          q.eq("organizationId", args.organizationId).eq("userId", identity.subject)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((board) => board.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({ ...board, isFavorite: true }));
    }

    let boards = [];
    const title = args.search as string;

    if (title) {
      // TODO: Query with search index
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) => q.search("title", title).eq("organizationId", args.organizationId))
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_organization", (query) => query.eq("organizationId", args.organizationId))
        .order("desc")
        .collect();
    }

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("favoriteBoards")
        .withIndex("by_user_board", (q) => q.eq("userId", identity.subject).eq("boardId", board._id))
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavoriteBoolean;
  },
});
