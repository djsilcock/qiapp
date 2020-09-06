import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};


export enum Flag {
  NeedsVetting = 'needsVetting',
  IsVetted = 'isVetted',
  NeedsLead = 'needsLead',
  IsRecruiting = 'isRecruiting',
  IsCompleted = 'isCompleted',
  HasCaldicott = 'hasCaldicott',
  HasResearch = 'hasResearch',
  MaybeCaldicott = 'maybeCaldicott',
  MaybeResearch = 'maybeResearch',
  PendingCaldicott = 'pendingCaldicott',
  PendingResearch = 'pendingResearch',
  NotCaldicott = 'notCaldicott',
  NotResearch = 'notResearch',
  CriticalIncident = 'criticalIncident',
  CanDisplay = 'canDisplay',
  Hidden = 'hidden',
  RecentlyUpdated = 'recentlyUpdated',
  All = 'all'
}

export type Mutation = {
  __typename?: 'Mutation';
  addProject?: Maybe<Project>;
  addUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddProjectArgs = {
  project?: Maybe<ProjectInput>;
};


export type MutationAddUserArgs = {
  user?: Maybe<UserInput>;
};


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  rev: Scalars['ID'];
  title: Scalars['String'];
  people?: Maybe<ProjectPeople>;
  description: Scalars['String'];
  dates?: Maybe<ProjectDates>;
  methodology: Scalars['String'];
  category?: Maybe<Array<Maybe<Category>>>;
  email?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['Date']>;
  lastUpdatedBy?: Maybe<User>;
  flags?: Maybe<Array<Maybe<Flag>>>;
};

export type ProjectDates = {
  __typename?: 'ProjectDates';
  proposed?: Maybe<Scalars['Date']>;
  start?: Maybe<Scalars['Date']>;
  finish?: Maybe<Scalars['Date']>;
};

export type ProjectDatesInput = {
  proposed?: Maybe<Scalars['Date']>;
  start?: Maybe<Scalars['Date']>;
  finish?: Maybe<Scalars['Date']>;
};

export type ProjectInput = {
  id?: Maybe<Scalars['ID']>;
  rev?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  people?: Maybe<ProjectPeopleInput>;
  description: Scalars['String'];
  methodology: Scalars['String'];
  category?: Maybe<Array<Maybe<Scalars['ID']>>>;
  othertags?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  advertise?: Maybe<YesNoPending>;
  mm_or_ci?: Maybe<YesNoPending>;
  caldicott?: Maybe<YesNoPending>;
  research?: Maybe<YesNoPending>;
  dates?: Maybe<ProjectDatesInput>;
  canDisplay?: Maybe<YesNoPending>;
};

export type ProjectPeople = {
  __typename?: 'ProjectPeople';
  proposers?: Maybe<Array<Maybe<User>>>;
  leaders?: Maybe<Array<Maybe<User>>>;
  involved?: Maybe<Array<Maybe<User>>>;
};

export type ProjectPeopleInput = {
  proposers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  leaders?: Maybe<Array<Maybe<Scalars['ID']>>>;
  involved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  new?: Maybe<Array<Maybe<UserInput>>>;
};

export type Query = {
  __typename?: 'Query';
  getLoggedInUser?: Maybe<User>;
  getProject?: Maybe<Project>;
  projectList?: Maybe<Array<Maybe<Project>>>;
  allUsers: Array<User>;
  getUser?: Maybe<User>;
};


export type QueryGetProjectArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryProjectListArgs = {
  filter?: Maybe<Array<Maybe<Flag>>>;
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['ID']>;
};

export enum StaffType {
  Fy1 = 'FY1',
  Fy2 = 'FY2',
  Accs = 'ACCS',
  Core = 'Core',
  Int = 'Int',
  Higher = 'Higher',
  Sas = 'SAS',
  Consultant = 'Consultant'
}

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  rev?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  category?: Maybe<StaffType>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>;
  rev?: Maybe<Scalars['ID']>;
  realName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  category?: Maybe<StaffType>;
};

export enum YesNoPending {
  Yes = 'Yes',
  No = 'No',
  Pending = 'Pending',
  DontKnow = 'DontKnow'
}

export type AddProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'flags'>
    & { people?: Maybe<(
      { __typename?: 'ProjectPeople' }
      & { leaders?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>>, involved?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>> }
    )>, category?: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name'>
    )>>> }
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'realName' | 'email' | 'category' | 'isAdmin'>
  )> }
);

export type CurrentuserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentuserQuery = (
  { __typename?: 'Query' }
  & { getLoggedInUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'realName' | 'email' | 'isAdmin'>
  )> }
);

export type GetProjectQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'flags'>
    & { people?: Maybe<(
      { __typename?: 'ProjectPeople' }
      & { leaders?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>>, involved?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>> }
    )>, category?: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name'>
    )>>> }
  )> }
);

export type GetUserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'realName' | 'email' | 'isAdmin'>
  )> }
);

export type ProjectListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectListQuery = (
  { __typename?: 'Query' }
  & { projectList?: Maybe<Array<Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'rev' | 'title' | 'description' | 'flags'>
    & { people?: Maybe<(
      { __typename?: 'ProjectPeople' }
      & { proposers?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>>, leaders?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>>, involved?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'realName' | 'userName'>
      )>>> }
    )>, category?: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name'>
    )>>> }
  )>>> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StaffType: StaffType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectPeople: ResolverTypeWrapper<ProjectPeople>;
  ProjectDates: ResolverTypeWrapper<ProjectDates>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Category: ResolverTypeWrapper<Category>;
  Flag: Flag;
  Mutation: ResolverTypeWrapper<{}>;
  ProjectInput: ProjectInput;
  ProjectPeopleInput: ProjectPeopleInput;
  UserInput: UserInput;
  YesNoPending: YesNoPending;
  ProjectDatesInput: ProjectDatesInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Project: Project;
  ProjectPeople: ProjectPeople;
  ProjectDates: ProjectDates;
  Date: Scalars['Date'];
  Category: Category;
  Mutation: {};
  ProjectInput: ProjectInput;
  ProjectPeopleInput: ProjectPeopleInput;
  UserInput: UserInput;
  ProjectDatesInput: ProjectDatesInput;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationAddProjectArgs, never>>;
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, never>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rev?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Maybe<ResolversTypes['ProjectPeople']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dates?: Resolver<Maybe<ResolversTypes['ProjectDates']>, ParentType, ContextType>;
  methodology?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  flags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Flag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ProjectDatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectDates'] = ResolversParentTypes['ProjectDates']> = {
  proposed?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  finish?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ProjectPeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectPeople'] = ResolversParentTypes['ProjectPeople']> = {
  proposers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  leaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  involved?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getLoggedInUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryGetProjectArgs, never>>;
  projectList?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType, RequireFields<QueryProjectListArgs, never>>;
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, never>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  rev?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  realName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['StaffType']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectDates?: ProjectDatesResolvers<ContextType>;
  ProjectPeople?: ProjectPeopleResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const AddProjectDocument = gql`
    mutation addProject($project: ProjectInput!) {
  addProject(project: $project) {
    id
    title
    people {
      leaders {
        id
        realName
        userName
      }
      involved {
        id
        realName
        userName
      }
    }
    description
    category {
      name
    }
    flags
  }
}
    `;
export type AddProjectMutationFn = ApolloReactCommon.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;
export type AddProjectComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddProjectMutation, AddProjectMutationVariables>, 'mutation'>;

    export const AddProjectComponent = (props: AddProjectComponentProps) => (
      <ApolloReactComponents.Mutation<AddProjectMutation, AddProjectMutationVariables> mutation={AddProjectDocument} {...props} />
    );
    
export type AddProjectProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddProjectMutation, AddProjectMutationVariables>
    } & TChildProps;
export function withAddProject<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddProjectMutation,
  AddProjectMutationVariables,
  AddProjectProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddProjectMutation, AddProjectMutationVariables, AddProjectProps<TChildProps, TDataName>>(AddProjectDocument, {
      alias: 'addProject',
      ...operationOptions
    });
};
export type AddProjectMutationResult = ApolloReactCommon.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
    userName
    realName
    email
    category
    isAdmin
  }
}
    `;
export type AllUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllUsersQuery, AllUsersQueryVariables>, 'query'>;

    export const AllUsersComponent = (props: AllUsersComponentProps) => (
      <ApolloReactComponents.Query<AllUsersQuery, AllUsersQueryVariables> query={AllUsersDocument} {...props} />
    );
    
export type AllUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AllUsersQuery, AllUsersQueryVariables>
    } & TChildProps;
export function withAllUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllUsersQuery,
  AllUsersQueryVariables,
  AllUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AllUsersQuery, AllUsersQueryVariables, AllUsersProps<TChildProps, TDataName>>(AllUsersDocument, {
      alias: 'allUsers',
      ...operationOptions
    });
};
export type AllUsersQueryResult = ApolloReactCommon.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const CurrentuserDocument = gql`
    query currentuser {
  getLoggedInUser {
    id
    userName
    realName
    email
    isAdmin
  }
}
    `;
export type CurrentuserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CurrentuserQuery, CurrentuserQueryVariables>, 'query'>;

    export const CurrentuserComponent = (props: CurrentuserComponentProps) => (
      <ApolloReactComponents.Query<CurrentuserQuery, CurrentuserQueryVariables> query={CurrentuserDocument} {...props} />
    );
    
export type CurrentuserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CurrentuserQuery, CurrentuserQueryVariables>
    } & TChildProps;
export function withCurrentuser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CurrentuserQuery,
  CurrentuserQueryVariables,
  CurrentuserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CurrentuserQuery, CurrentuserQueryVariables, CurrentuserProps<TChildProps, TDataName>>(CurrentuserDocument, {
      alias: 'currentuser',
      ...operationOptions
    });
};
export type CurrentuserQueryResult = ApolloReactCommon.QueryResult<CurrentuserQuery, CurrentuserQueryVariables>;
export const GetProjectDocument = gql`
    query getProject($id: ID) {
  getProject(id: $id) {
    id
    title
    people {
      leaders {
        id
        realName
        userName
      }
      involved {
        id
        realName
        userName
      }
    }
    description
    category {
      name
    }
    flags
  }
}
    `;
export type GetProjectComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProjectQuery, GetProjectQueryVariables>, 'query'>;

    export const GetProjectComponent = (props: GetProjectComponentProps) => (
      <ApolloReactComponents.Query<GetProjectQuery, GetProjectQueryVariables> query={GetProjectDocument} {...props} />
    );
    
export type GetProjectProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetProjectQuery, GetProjectQueryVariables>
    } & TChildProps;
export function withGetProject<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetProjectQuery, GetProjectQueryVariables, GetProjectProps<TChildProps, TDataName>>(GetProjectDocument, {
      alias: 'getProject',
      ...operationOptions
    });
};
export type GetProjectQueryResult = ApolloReactCommon.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID) {
  getUser(id: $id) {
    id
    userName
    realName
    email
    isAdmin
  }
}
    `;
export type GetUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserQuery, GetUserQueryVariables>, 'query'>;

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ApolloReactComponents.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserQuery, GetUserQueryVariables>
    } & TChildProps;
export function withGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps, TDataName>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const ProjectListDocument = gql`
    query projectList {
  projectList {
    id
    rev
    title
    people {
      proposers {
        id
        realName
        userName
      }
      leaders {
        id
        realName
        userName
      }
      involved {
        id
        realName
        userName
      }
    }
    description
    category {
      name
    }
    flags
  }
}
    `;
export type ProjectListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ProjectListQuery, ProjectListQueryVariables>, 'query'>;

    export const ProjectListComponent = (props: ProjectListComponentProps) => (
      <ApolloReactComponents.Query<ProjectListQuery, ProjectListQueryVariables> query={ProjectListDocument} {...props} />
    );
    
export type ProjectListProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ProjectListQuery, ProjectListQueryVariables>
    } & TChildProps;
export function withProjectList<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ProjectListQuery,
  ProjectListQueryVariables,
  ProjectListProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ProjectListQuery, ProjectListQueryVariables, ProjectListProps<TChildProps, TDataName>>(ProjectListDocument, {
      alias: 'projectList',
      ...operationOptions
    });
};
export type ProjectListQueryResult = ApolloReactCommon.QueryResult<ProjectListQuery, ProjectListQueryVariables>;