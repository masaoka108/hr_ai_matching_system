import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (session.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.status(200).json({ message: "管理者のみアクセス可能なデータです" });
} 