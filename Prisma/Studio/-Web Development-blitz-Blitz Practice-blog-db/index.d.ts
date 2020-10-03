import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.8.0
 * Query Engine version: e6c9b4b2b7fa162d0d459d1863321f547498fcfe
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): SessionDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  email: 'email',
  hashedPassword: 'hashedPassword',
  role: 'role'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const SessionDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  expiresAt: 'expiresAt',
  handle: 'handle',
  userId: 'userId',
  hashedSessionToken: 'hashedSessionToken',
  antiCSRFToken: 'antiCSRFToken',
  publicData: 'publicData',
  privateData: 'privateData'
};

export declare type SessionDistinctFieldEnum = (typeof SessionDistinctFieldEnum)[keyof typeof SessionDistinctFieldEnum]


export declare const PostDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title',
  description: 'description',
  imageUrl: 'imageUrl',
  userId: 'userId'
};

export declare type PostDistinctFieldEnum = (typeof PostDistinctFieldEnum)[keyof typeof PostDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model User
 */

export type User = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string | null
  email: string
  hashedPassword: string | null
  role: string
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  email?: boolean
  hashedPassword?: boolean
  role?: boolean
  sessions?: boolean | FindManySessionArgs
  Post?: boolean | FindManyPostArgs
}

export type UserInclude = {
  sessions?: boolean | FindManySessionArgs
  Post?: boolean | FindManyPostArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'sessions'
      ? Array<SessionGetPayload<S['include'][P]>> :
      P extends 'Post'
      ? Array<PostGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'sessions'
      ? Array<SessionGetPayload<S['select'][P]>> :
      P extends 'Post'
      ? Array<PostGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  sessions<T extends FindManySessionArgs = {}>(args?: Subset<T, FindManySessionArgs>): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>;

  Post<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Session
 */

export type Session = {
  id: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date | null
  handle: string
  userId: number | null
  hashedSessionToken: string | null
  antiCSRFToken: string | null
  publicData: string | null
  privateData: string | null
}


export type AggregateSession = {
  count: number
  avg: SessionAvgAggregateOutputType | null
  sum: SessionSumAggregateOutputType | null
  min: SessionMinAggregateOutputType | null
  max: SessionMaxAggregateOutputType | null
}

export type SessionAvgAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionSumAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionMinAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionMaxAggregateOutputType = {
  id: number
  userId: number | null
}


export type SessionAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionSumAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMinAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateSessionArgs = {
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
  count?: true
  avg?: SessionAvgAggregateInputType
  sum?: SessionSumAggregateInputType
  min?: SessionMinAggregateInputType
  max?: SessionMaxAggregateInputType
}

export type GetSessionAggregateType<T extends AggregateSessionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSessionAggregateScalarType<T[P]>
}

export type GetSessionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SessionAvgAggregateOutputType ? SessionAvgAggregateOutputType[P] : never
}
    
    

export type SessionSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  expiresAt?: boolean
  handle?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  hashedSessionToken?: boolean
  antiCSRFToken?: boolean
  publicData?: boolean
  privateData?: boolean
}

export type SessionInclude = {
  user?: boolean | UserArgs
}

export type SessionGetPayload<
  S extends boolean | null | undefined | SessionArgs,
  U = keyof S
> = S extends true
  ? Session
  : S extends undefined
  ? never
  : S extends SessionArgs | FindManySessionArgs
  ? 'include' extends U
    ? Session  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Session ? Session[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : Session
: Session


export interface SessionDelegate {
  /**
   * Find zero or one Session that matches the filter.
   * @param {FindOneSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSessionArgs>(
    args: Subset<T, FindOneSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session | null>, Prisma__SessionClient<SessionGetPayload<T> | null>>
  /**
   * Find the first Session that matches the filter.
   * @param {FindFirstSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSessionArgs>(
    args: Subset<T, FindFirstSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Find zero or more Sessions that matches the filter.
   * @param {FindManySessionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sessions
   * const sessions = await prisma.session.findMany()
   * 
   * // Get first 10 Sessions
   * const sessions = await prisma.session.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySessionArgs>(
    args?: Subset<T, FindManySessionArgs>
  ): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>
  /**
   * Create a Session.
   * @param {SessionCreateArgs} args - Arguments to create a Session.
   * @example
   * // Create one Session
   * const Session = await prisma.session.create({
   *   data: {
   *     // ... data to create a Session
   *   }
   * })
   * 
  **/
  create<T extends SessionCreateArgs>(
    args: Subset<T, SessionCreateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete a Session.
   * @param {SessionDeleteArgs} args - Arguments to delete one Session.
   * @example
   * // Delete one Session
   * const Session = await prisma.session.delete({
   *   where: {
   *     // ... filter to delete one Session
   *   }
   * })
   * 
  **/
  delete<T extends SessionDeleteArgs>(
    args: Subset<T, SessionDeleteArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Update one Session.
   * @param {SessionUpdateArgs} args - Arguments to update one Session.
   * @example
   * // Update one Session
   * const session = await prisma.session.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SessionUpdateArgs>(
    args: Subset<T, SessionUpdateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete zero or more Sessions.
   * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
   * @example
   * // Delete a few Sessions
   * const { count } = await prisma.session.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SessionDeleteManyArgs>(
    args: Subset<T, SessionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sessions.
   * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sessions
   * const session = await prisma.session.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SessionUpdateManyArgs>(
    args: Subset<T, SessionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Session.
   * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
   * @example
   * // Update or create a Session
   * const session = await prisma.session.upsert({
   *   create: {
   *     // ... data to create a Session
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Session we want to update
   *   }
   * })
  **/
  upsert<T extends SessionUpsertArgs>(
    args: Subset<T, SessionUpsertArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySessionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSessionArgs>(args: Subset<T, AggregateSessionArgs>): Promise<GetSessionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Session.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SessionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Session findOne
 */
export type FindOneSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session findFirst
 */
export type FindFirstSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session findMany
 */
export type FindManySessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Sessions to fetch.
  **/
  where?: SessionWhereInput
  /**
   * Determine the order of the Sessions to fetch.
  **/
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  /**
   * Sets the position for listing Sessions.
  **/
  cursor?: SessionWhereUniqueInput
  /**
   * The number of Sessions to fetch. If negative number, it will take Sessions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Sessions.
  **/
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session create
 */
export type SessionCreateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to create a Session.
  **/
  data: SessionCreateInput
}


/**
 * Session update
 */
export type SessionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to update a Session.
  **/
  data: SessionUpdateInput
  /**
   * Choose, which Session to update.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session updateMany
 */
export type SessionUpdateManyArgs = {
  data: SessionUpdateManyMutationInput
  where?: SessionWhereInput
}


/**
 * Session upsert
 */
export type SessionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The filter to search for the Session to update in case it exists.
  **/
  where: SessionWhereUniqueInput
  /**
   * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
  **/
  create: SessionCreateInput
  /**
   * In case the Session was found with the provided `where` argument, update it with this data.
  **/
  update: SessionUpdateInput
}


/**
 * Session delete
 */
export type SessionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter which Session to delete.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session deleteMany
 */
export type SessionDeleteManyArgs = {
  where?: SessionWhereInput
}


/**
 * Session without action
 */
export type SessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  imageUrl: string
  userId: number
}


export type AggregatePost = {
  count: number
  avg: PostAvgAggregateOutputType | null
  sum: PostSumAggregateOutputType | null
  min: PostMinAggregateOutputType | null
  max: PostMaxAggregateOutputType | null
}

export type PostAvgAggregateOutputType = {
  id: number
  userId: number
}

export type PostSumAggregateOutputType = {
  id: number
  userId: number
}

export type PostMinAggregateOutputType = {
  id: number
  userId: number
}

export type PostMaxAggregateOutputType = {
  id: number
  userId: number
}


export type PostAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type PostSumAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMinAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregatePostArgs = {
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
  count?: true
  avg?: PostAvgAggregateInputType
  sum?: PostSumAggregateInputType
  min?: PostMinAggregateInputType
  max?: PostMaxAggregateInputType
}

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
}

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
}
    
    

export type PostSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  title?: boolean
  description?: boolean
  imageUrl?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type PostInclude = {
  user?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post that matches the filter.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find the first Post that matches the filter.
   * @param {FindFirstPostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPostArgs>(
    args: Subset<T, FindFirstPostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Find zero or more Posts that matches the filter.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findFirst
 */
export type FindFirstPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  name?: StringNullableFilter | string | null
  email?: StringFilter | string
  hashedPassword?: StringNullableFilter | string | null
  role?: StringFilter | string
  sessions?: SessionListRelationFilter
  Post?: PostListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  name?: SortOrder
  email?: SortOrder
  hashedPassword?: SortOrder
  role?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type SessionWhereInput = {
  AND?: SessionWhereInput | Enumerable<SessionWhereInput>
  OR?: SessionWhereInput | Enumerable<SessionWhereInput>
  NOT?: SessionWhereInput | Enumerable<SessionWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  expiresAt?: DateTimeNullableFilter | Date | string | null
  handle?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput | null
  userId?: IntNullableFilter | number | null
  hashedSessionToken?: StringNullableFilter | string | null
  antiCSRFToken?: StringNullableFilter | string | null
  publicData?: StringNullableFilter | string | null
  privateData?: StringNullableFilter | string | null
}

export type SessionOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  expiresAt?: SortOrder
  handle?: SortOrder
  userId?: SortOrder
  hashedSessionToken?: SortOrder
  antiCSRFToken?: SortOrder
  publicData?: SortOrder
  privateData?: SortOrder
}

export type SessionWhereUniqueInput = {
  id?: number
  handle?: string
}

export type PostWhereInput = {
  AND?: PostWhereInput | Enumerable<PostWhereInput>
  OR?: PostWhereInput | Enumerable<PostWhereInput>
  NOT?: PostWhereInput | Enumerable<PostWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  title?: StringFilter | string
  description?: StringFilter | string
  imageUrl?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
}

export type PostOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  title?: SortOrder
  description?: SortOrder
  imageUrl?: SortOrder
  userId?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: number
}

export type UserCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: string
  sessions?: SessionCreateManyWithoutUserInput
  Post?: PostCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: string | StringFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
  Post?: PostUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: string | StringFieldUpdateOperationsInput
}

export type SessionCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  expiresAt?: Date | string | null
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
  user?: UserCreateOneWithoutSessionsInput
}

export type SessionUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
  user?: UserUpdateOneWithoutSessionsInput
}

export type SessionUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type PostCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  title: string
  description: string
  imageUrl: string
  user: UserCreateOneWithoutPostInput
}

export type PostUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutPostInput
}

export type PostUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type SessionListRelationFilter = {
  every?: SessionWhereInput
  some?: SessionWhereInput
  none?: SessionWhereInput
}

export type PostListRelationFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type SessionCreateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
}

export type PostCreateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type SessionUpdateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  set?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  disconnect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  delete?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  update?: SessionUpdateWithWhereUniqueWithoutUserInput | Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: SessionUpdateManyWithWhereNestedInput | Enumerable<SessionUpdateManyWithWhereNestedInput>
  deleteMany?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
}

export type PostUpdateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  update?: PostUpdateWithWhereUniqueWithoutUserInput | Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: PostUpdateManyWithWhereNestedInput | Enumerable<PostUpdateManyWithWhereNestedInput>
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  upsert?: PostUpsertWithWhereUniqueWithoutUserInput | Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>
}

export type UserCreateOneWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type UserUpdateOneWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutSessionsDataInput
  upsert?: UserUpsertWithoutSessionsInput
}

export type UserCreateOneWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutPostInput = {
  create?: UserCreateWithoutPostInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostDataInput
  upsert?: UserUpsertWithoutPostInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type SessionCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  expiresAt?: Date | string | null
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
}

export type PostCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  title: string
  description: string
  imageUrl: string
}

export type SessionUpdateWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  data: SessionUpdateWithoutUserDataInput
}

export type SessionUpdateManyWithWhereNestedInput = {
  where: SessionScalarWhereInput
  data: SessionUpdateManyDataInput
}

export type SessionScalarWhereInput = {
  AND?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  OR?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  NOT?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  expiresAt?: DateTimeNullableFilter | Date | string | null
  handle?: StringFilter | string
  userId?: IntNullableFilter | number | null
  hashedSessionToken?: StringNullableFilter | string | null
  antiCSRFToken?: StringNullableFilter | string | null
  publicData?: StringNullableFilter | string | null
  privateData?: StringNullableFilter | string | null
}

export type SessionUpsertWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  update: SessionUpdateWithoutUserDataInput
  create: SessionCreateWithoutUserInput
}

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutUserDataInput
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostScalarWhereInput = {
  AND?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  OR?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  NOT?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  title?: StringFilter | string
  description?: StringFilter | string
  imageUrl?: StringFilter | string
  userId?: IntFilter | number
}

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutUserDataInput
  create: PostCreateWithoutUserInput
}

export type UserCreateWithoutSessionsInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: string
  Post?: PostCreateManyWithoutUserInput
}

export type UserUpdateWithoutSessionsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: string | StringFieldUpdateOperationsInput
  Post?: PostUpdateManyWithoutUserInput
}

export type UserUpsertWithoutSessionsInput = {
  update: UserUpdateWithoutSessionsDataInput
  create: UserCreateWithoutSessionsInput
}

export type UserCreateWithoutPostInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: string
  sessions?: SessionCreateManyWithoutUserInput
}

export type UserUpdateWithoutPostDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: string | StringFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
}

export type UserUpsertWithoutPostInput = {
  update: UserUpdateWithoutPostDataInput
  create: UserCreateWithoutPostInput
}

export type SessionUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SessionUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type PostUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
}

export type PostUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
