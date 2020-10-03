import { NotFoundError, SessionContext } from "blitz"
import db, { FindOnePostArgs } from "db"

type GetPostInput = {
  where: FindOnePostArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOnePostArgs['include']
}

export default async function getPost({ where /* include */ }: GetPostInput) {
  // ctx: { session?: SessionContext } = {}
  // ctx.session!.authorize()

  const post = await db.post.findOne({ where })

  if (!post) throw new NotFoundError()

  return post
}
