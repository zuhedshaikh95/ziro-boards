import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    organizationId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_organization", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["organizationId"],
    }),

  favoriteBoards: defineTable({
    organizationId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
  })
    .index("by_board", ["boardId"])
    .index("by_user_organization", ["organizationId", "userId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_organization", ["boardId", "organizationId", "userId"]),
});
