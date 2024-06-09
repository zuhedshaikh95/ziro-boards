import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse, type NextRequest } from "next/server";

import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user)
    return NextResponse.json({ message: "Unauthorized!", success: false, error: true }, { status: 401 });

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { _id: room });

  if (board?.organizationId !== authorization.orgId)
    return NextResponse.json({ message: "Unauthorized!", success: false, error: true }, { status: 401 });

  const userInfo = {
    name: user.firstName || "Member",
    avatar: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();

  return NextResponse.json(JSON.parse(body), { status });
}
