import { SessionContext } from "blitz"
import db, { PostDeleteArgs } from "db"

type DeletePostInput = {
  where: PostDeleteArgs["where"]
}

export default async function deletePost(
  { where }: DeletePostInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const post = await db.post.delete({ where })

  return post
}
