import { SessionContext } from "blitz"
import db, { FindManyPostArgs } from "db"

type GetPostsInput = {
  where?: FindManyPostArgs["where"]
  orderBy?: FindManyPostArgs["orderBy"]
  skip?: FindManyPostArgs["skip"]
  take?: FindManyPostArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyPostArgs['include']
}

export default async function getPosts(
  { where, orderBy, skip = 0, take }: GetPostsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const posts = await db.post.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.post.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    posts,
    nextPage,
    hasMore,
  }
}
