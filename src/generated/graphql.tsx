import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  admins: Array<Admin>;
  expertises: Array<Expertise>;
  individuals: Array<Individual>;
  industries: Array<Industry>;
  mentor: Mentor;
  mentors: Array<Mentor>;
  sessions: Array<Session>;
  mentorSessions: Array<Session>;
  skills: Array<Skill>;
  me?: Maybe<Users>;
  workExperiences: Array<WorkExperience>;
};


export type QueryExpertisesArgs = {
  mentorId: Scalars['Int'];
};


export type QueryMentorArgs = {
  mentorId: Scalars['Int'];
};


export type QueryMentorsArgs = {
  industries: Array<Scalars['String']>;
  skills: Array<Scalars['String']>;
};


export type QueryWorkExperiencesArgs = {
  mentorId: Scalars['Int'];
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  user: Users;
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['Int'];
  email: Scalars['String'];
  activated: Scalars['Boolean'];
  type: Scalars['String'];
  avatar: Scalars['String'];
  mentor?: Maybe<Mentor>;
  individual?: Maybe<Individual>;
  admin?: Maybe<Admin>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mentor = {
  __typename?: 'Mentor';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  languages?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
  user: Users;
  workExperience: Array<WorkExperience>;
  sessions: Array<Session>;
  expertises: Array<Expertise>;
  sessionCount?: Maybe<Scalars['Int']>;
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  id: Scalars['Int'];
  role: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  from: Scalars['String'];
  untill: Scalars['String'];
  industries?: Maybe<Array<Industry>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Industry = {
  __typename?: 'Industry';
  id: Scalars['Int'];
  name: Scalars['String'];
  nameLowercase: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['Int'];
  date: Scalars['DateTime'];
  individual: Individual;
  mentor: Mentor;
  creator: Admin;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Individual = {
  __typename?: 'Individual';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  premium: Scalars['Boolean'];
  user: Users;
};

export type Expertise = {
  __typename?: 'Expertise';
  id: Scalars['Int'];
  description: Scalars['String'];
  skill: Skill;
  mentor: Mentor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExpertise: ExpertiseResponse;
  setMentorDetails: MentorResponse;
  setBio: MentorResponse;
  createSession: SessionResponse;
  registerIndividual: UserResponse;
  registerMentor: UserResponse;
  registerAdmin: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createWorkExperience: WorkExperience;
};


export type MutationCreateExpertiseArgs = {
  description: Scalars['String'];
  skillId: Scalars['Int'];
};


export type MutationSetMentorDetailsArgs = {
  options: MentorDetailsInput;
};


export type MutationSetBioArgs = {
  bio: Scalars['String'];
};


export type MutationCreateSessionArgs = {
  input: SessionInput;
};


export type MutationRegisterIndividualArgs = {
  options: RegisterInput;
};


export type MutationRegisterMentorArgs = {
  options: RegisterInput;
};


export type MutationRegisterAdminArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateWorkExperienceArgs = {
  input: WorkExperienceInput;
};

export type ExpertiseResponse = {
  __typename?: 'ExpertiseResponse';
  errorMsg?: Maybe<Scalars['String']>;
  expertise?: Maybe<Expertise>;
};

export type MentorResponse = {
  __typename?: 'MentorResponse';
  error?: Maybe<ErrorMessage>;
  mentor?: Maybe<Mentor>;
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message: Scalars['String'];
};

export type MentorDetailsInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String'];
  rate: Scalars['String'];
  location: Scalars['String'];
  languages: Scalars['String'];
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  error?: Maybe<SessionError>;
  session?: Maybe<Session>;
};

export type SessionError = {
  __typename?: 'SessionError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type SessionInput = {
  mentorId: Scalars['Float'];
  userId: Scalars['Float'];
  date: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type WorkExperienceInput = {
  role: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  from: Scalars['String'];
  untill: Scalars['String'];
  industries: Array<Scalars['String']>;
};

export type RegisterAdminMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterAdminMutation = (
  { __typename?: 'Mutation' }
  & { registerAdmin: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'activated' | 'avatar'>
      & { admin?: Maybe<(
        { __typename?: 'Admin' }
        & Pick<Admin, 'firstName' | 'lastName'>
      )> }
    )> }
  ) }
);

export type CreateExpertiseMutationVariables = Exact<{
  skillId: Scalars['Int'];
  description: Scalars['String'];
}>;


export type CreateExpertiseMutation = (
  { __typename?: 'Mutation' }
  & { createExpertise: (
    { __typename?: 'ExpertiseResponse' }
    & Pick<ExpertiseResponse, 'errorMsg'>
    & { expertise?: Maybe<(
      { __typename?: 'Expertise' }
      & Pick<Expertise, 'id' | 'description'>
    )> }
  ) }
);

export type CreateSessionMutationVariables = Exact<{
  input: SessionInput;
}>;


export type CreateSessionMutation = (
  { __typename?: 'Mutation' }
  & { createSession: (
    { __typename?: 'SessionResponse' }
    & { error?: Maybe<(
      { __typename?: 'SessionError' }
      & Pick<SessionError, 'field' | 'message'>
    )>, session?: Maybe<(
      { __typename?: 'Session' }
      & Pick<Session, 'id'>
    )> }
  ) }
);

export type CreateWorkExperienceMutationVariables = Exact<{
  input: WorkExperienceInput;
}>;


export type CreateWorkExperienceMutation = (
  { __typename?: 'Mutation' }
  & { createWorkExperience: (
    { __typename?: 'WorkExperience' }
    & Pick<WorkExperience, 'role' | 'companyName' | 'description' | 'from' | 'untill'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email'>
      & { mentor?: Maybe<(
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'id' | 'firstName' | 'lastName'>
      )>, individual?: Maybe<(
        { __typename?: 'Individual' }
        & Pick<Individual, 'id' | 'firstName' | 'lastName'>
      )>, admin?: Maybe<(
        { __typename?: 'Admin' }
        & Pick<Admin, 'id' | 'firstName' | 'lastName'>
      )> }
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MentorRegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type MentorRegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerMentor: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email'>
      & { mentor?: Maybe<(
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'firstName'>
      )> }
    )> }
  ) }
);

export type SetBioMutationVariables = Exact<{
  bio: Scalars['String'];
}>;


export type SetBioMutation = (
  { __typename?: 'Mutation' }
  & { setBio: (
    { __typename?: 'MentorResponse' }
    & { error?: Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>, mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName' | 'bio'>
    )> }
  ) }
);

export type SetMentorDetailsMutationVariables = Exact<{
  options: MentorDetailsInput;
}>;


export type SetMentorDetailsMutation = (
  { __typename?: 'Mutation' }
  & { setMentorDetails: (
    { __typename?: 'MentorResponse' }
    & { error?: Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>, mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'rate'>
    )> }
  ) }
);

export type AdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminsQuery = (
  { __typename?: 'Query' }
  & { admins: Array<(
    { __typename?: 'Admin' }
    & Pick<Admin, 'id' | 'firstName' | 'lastName'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'activated' | 'avatar' | 'email'>
    ) }
  )> }
);

export type ExpertisesQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type ExpertisesQuery = (
  { __typename?: 'Query' }
  & { expertises: Array<(
    { __typename?: 'Expertise' }
    & Pick<Expertise, 'id' | 'description'>
    & { skill: (
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
    ) }
  )> }
);

export type IndividualsQueryVariables = Exact<{ [key: string]: never; }>;


export type IndividualsQuery = (
  { __typename?: 'Query' }
  & { individuals: Array<(
    { __typename?: 'Individual' }
    & Pick<Individual, 'id' | 'firstName' | 'lastName' | 'premium'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'activated' | 'avatar'>
    ) }
  )> }
);

export type IndustriesQueryVariables = Exact<{ [key: string]: never; }>;


export type IndustriesQuery = (
  { __typename?: 'Query' }
  & { industries: Array<(
    { __typename?: 'Industry' }
    & Pick<Industry, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'email' | 'activated' | 'avatar' | 'createdAt'>
    & { mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'bio' | 'title' | 'location' | 'languages' | 'rate'>
    )>, individual?: Maybe<(
      { __typename?: 'Individual' }
      & Pick<Individual, 'id' | 'firstName' | 'lastName'>
    )>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type MentorQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type MentorQuery = (
  { __typename?: 'Query' }
  & { mentor: (
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'rate' | 'bio' | 'location' | 'languages'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'avatar'>
    ) }
  ) }
);

export type MentorSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MentorSessionsQuery = (
  { __typename?: 'Query' }
  & { mentorSessions: Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'date'>
    & { mentor: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName'>
    ), individual: (
      { __typename?: 'Individual' }
      & Pick<Individual, 'firstName' | 'lastName'>
    ) }
  )> }
);

export type MentorsQueryVariables = Exact<{
  skills: Array<Scalars['String']>;
  industries: Array<Scalars['String']>;
}>;


export type MentorsQuery = (
  { __typename?: 'Query' }
  & { mentors: Array<(
    { __typename?: 'Mentor' }
    & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'rate' | 'bio' | 'sessionCount'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'avatar'>
    ), expertises: Array<(
      { __typename?: 'Expertise' }
      & { skill: (
        { __typename?: 'Skill' }
        & Pick<Skill, 'name'>
      ) }
    )>, workExperience: Array<(
      { __typename?: 'WorkExperience' }
      & { industries?: Maybe<Array<(
        { __typename?: 'Industry' }
        & Pick<Industry, 'name'>
      )>> }
    )> }
  )> }
);

export type SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsQuery = (
  { __typename?: 'Query' }
  & { sessions: Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'date'>
    & { individual: (
      { __typename?: 'Individual' }
      & Pick<Individual, 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
    ), creator: (
      { __typename?: 'Admin' }
      & Pick<Admin, 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
    ), mentor: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
    ) }
  )> }
);

export type SkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsQuery = (
  { __typename?: 'Query' }
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name'>
  )> }
);

export type WorkExperiencesQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type WorkExperiencesQuery = (
  { __typename?: 'Query' }
  & { workExperiences: Array<(
    { __typename?: 'WorkExperience' }
    & Pick<WorkExperience, 'id' | 'role' | 'companyName' | 'from' | 'untill' | 'createdAt' | 'updatedAt' | 'description'>
    & { industries?: Maybe<Array<(
      { __typename?: 'Industry' }
      & Pick<Industry, 'name'>
    )>> }
  )> }
);


export const RegisterAdminDocument = gql`
    mutation RegisterAdmin($options: RegisterInput!) {
  registerAdmin(options: $options) {
    errors {
      field
      message
    }
    user {
      email
      activated
      avatar
      admin {
        firstName
        lastName
      }
    }
  }
}
    `;
export type RegisterAdminMutationFn = Apollo.MutationFunction<RegisterAdminMutation, RegisterAdminMutationVariables>;

/**
 * __useRegisterAdminMutation__
 *
 * To run a mutation, you first call `useRegisterAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAdminMutation, { data, loading, error }] = useRegisterAdminMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterAdminMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAdminMutation, RegisterAdminMutationVariables>) {
        return Apollo.useMutation<RegisterAdminMutation, RegisterAdminMutationVariables>(RegisterAdminDocument, baseOptions);
      }
export type RegisterAdminMutationHookResult = ReturnType<typeof useRegisterAdminMutation>;
export type RegisterAdminMutationResult = Apollo.MutationResult<RegisterAdminMutation>;
export type RegisterAdminMutationOptions = Apollo.BaseMutationOptions<RegisterAdminMutation, RegisterAdminMutationVariables>;
export const CreateExpertiseDocument = gql`
    mutation CreateExpertise($skillId: Int!, $description: String!) {
  createExpertise(skillId: $skillId, description: $description) {
    errorMsg
    expertise {
      id
      description
    }
  }
}
    `;
export type CreateExpertiseMutationFn = Apollo.MutationFunction<CreateExpertiseMutation, CreateExpertiseMutationVariables>;

/**
 * __useCreateExpertiseMutation__
 *
 * To run a mutation, you first call `useCreateExpertiseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpertiseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpertiseMutation, { data, loading, error }] = useCreateExpertiseMutation({
 *   variables: {
 *      skillId: // value for 'skillId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateExpertiseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpertiseMutation, CreateExpertiseMutationVariables>) {
        return Apollo.useMutation<CreateExpertiseMutation, CreateExpertiseMutationVariables>(CreateExpertiseDocument, baseOptions);
      }
export type CreateExpertiseMutationHookResult = ReturnType<typeof useCreateExpertiseMutation>;
export type CreateExpertiseMutationResult = Apollo.MutationResult<CreateExpertiseMutation>;
export type CreateExpertiseMutationOptions = Apollo.BaseMutationOptions<CreateExpertiseMutation, CreateExpertiseMutationVariables>;
export const CreateSessionDocument = gql`
    mutation CreateSession($input: SessionInput!) {
  createSession(input: $input) {
    error {
      field
      message
    }
    session {
      id
    }
  }
}
    `;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, baseOptions);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const CreateWorkExperienceDocument = gql`
    mutation CreateWorkExperience($input: WorkExperienceInput!) {
  createWorkExperience(input: $input) {
    role
    companyName
    description
    from
    untill
  }
}
    `;
export type CreateWorkExperienceMutationFn = Apollo.MutationFunction<CreateWorkExperienceMutation, CreateWorkExperienceMutationVariables>;

/**
 * __useCreateWorkExperienceMutation__
 *
 * To run a mutation, you first call `useCreateWorkExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkExperienceMutation, { data, loading, error }] = useCreateWorkExperienceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkExperienceMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkExperienceMutation, CreateWorkExperienceMutationVariables>) {
        return Apollo.useMutation<CreateWorkExperienceMutation, CreateWorkExperienceMutationVariables>(CreateWorkExperienceDocument, baseOptions);
      }
export type CreateWorkExperienceMutationHookResult = ReturnType<typeof useCreateWorkExperienceMutation>;
export type CreateWorkExperienceMutationResult = Apollo.MutationResult<CreateWorkExperienceMutation>;
export type CreateWorkExperienceMutationOptions = Apollo.BaseMutationOptions<CreateWorkExperienceMutation, CreateWorkExperienceMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      mentor {
        id
        firstName
        lastName
      }
      individual {
        id
        firstName
        lastName
      }
      admin {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MentorRegisterDocument = gql`
    mutation MentorRegister($options: RegisterInput!) {
  registerMentor(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      email
      mentor {
        firstName
      }
    }
  }
}
    `;
export type MentorRegisterMutationFn = Apollo.MutationFunction<MentorRegisterMutation, MentorRegisterMutationVariables>;

/**
 * __useMentorRegisterMutation__
 *
 * To run a mutation, you first call `useMentorRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMentorRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mentorRegisterMutation, { data, loading, error }] = useMentorRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMentorRegisterMutation(baseOptions?: Apollo.MutationHookOptions<MentorRegisterMutation, MentorRegisterMutationVariables>) {
        return Apollo.useMutation<MentorRegisterMutation, MentorRegisterMutationVariables>(MentorRegisterDocument, baseOptions);
      }
export type MentorRegisterMutationHookResult = ReturnType<typeof useMentorRegisterMutation>;
export type MentorRegisterMutationResult = Apollo.MutationResult<MentorRegisterMutation>;
export type MentorRegisterMutationOptions = Apollo.BaseMutationOptions<MentorRegisterMutation, MentorRegisterMutationVariables>;
export const SetBioDocument = gql`
    mutation SetBio($bio: String!) {
  setBio(bio: $bio) {
    error {
      message
    }
    mentor {
      firstName
      lastName
      bio
    }
  }
}
    `;
export type SetBioMutationFn = Apollo.MutationFunction<SetBioMutation, SetBioMutationVariables>;

/**
 * __useSetBioMutation__
 *
 * To run a mutation, you first call `useSetBioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetBioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBioMutation, { data, loading, error }] = useSetBioMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useSetBioMutation(baseOptions?: Apollo.MutationHookOptions<SetBioMutation, SetBioMutationVariables>) {
        return Apollo.useMutation<SetBioMutation, SetBioMutationVariables>(SetBioDocument, baseOptions);
      }
export type SetBioMutationHookResult = ReturnType<typeof useSetBioMutation>;
export type SetBioMutationResult = Apollo.MutationResult<SetBioMutation>;
export type SetBioMutationOptions = Apollo.BaseMutationOptions<SetBioMutation, SetBioMutationVariables>;
export const SetMentorDetailsDocument = gql`
    mutation SetMentorDetails($options: MentorDetailsInput!) {
  setMentorDetails(options: $options) {
    error {
      message
    }
    mentor {
      firstName
      lastName
      title
      location
      languages
      rate
    }
  }
}
    `;
export type SetMentorDetailsMutationFn = Apollo.MutationFunction<SetMentorDetailsMutation, SetMentorDetailsMutationVariables>;

/**
 * __useSetMentorDetailsMutation__
 *
 * To run a mutation, you first call `useSetMentorDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMentorDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMentorDetailsMutation, { data, loading, error }] = useSetMentorDetailsMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSetMentorDetailsMutation(baseOptions?: Apollo.MutationHookOptions<SetMentorDetailsMutation, SetMentorDetailsMutationVariables>) {
        return Apollo.useMutation<SetMentorDetailsMutation, SetMentorDetailsMutationVariables>(SetMentorDetailsDocument, baseOptions);
      }
export type SetMentorDetailsMutationHookResult = ReturnType<typeof useSetMentorDetailsMutation>;
export type SetMentorDetailsMutationResult = Apollo.MutationResult<SetMentorDetailsMutation>;
export type SetMentorDetailsMutationOptions = Apollo.BaseMutationOptions<SetMentorDetailsMutation, SetMentorDetailsMutationVariables>;
export const AdminsDocument = gql`
    query Admins {
  admins {
    id
    firstName
    lastName
    user {
      activated
      avatar
      email
    }
  }
}
    `;

/**
 * __useAdminsQuery__
 *
 * To run a query within a React component, call `useAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminsQuery(baseOptions?: Apollo.QueryHookOptions<AdminsQuery, AdminsQueryVariables>) {
        return Apollo.useQuery<AdminsQuery, AdminsQueryVariables>(AdminsDocument, baseOptions);
      }
export function useAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminsQuery, AdminsQueryVariables>) {
          return Apollo.useLazyQuery<AdminsQuery, AdminsQueryVariables>(AdminsDocument, baseOptions);
        }
export type AdminsQueryHookResult = ReturnType<typeof useAdminsQuery>;
export type AdminsLazyQueryHookResult = ReturnType<typeof useAdminsLazyQuery>;
export type AdminsQueryResult = Apollo.QueryResult<AdminsQuery, AdminsQueryVariables>;
export const ExpertisesDocument = gql`
    query Expertises($mentorId: Int!) {
  expertises(mentorId: $mentorId) {
    id
    description
    skill {
      id
      name
    }
  }
}
    `;

/**
 * __useExpertisesQuery__
 *
 * To run a query within a React component, call `useExpertisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpertisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpertisesQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useExpertisesQuery(baseOptions?: Apollo.QueryHookOptions<ExpertisesQuery, ExpertisesQueryVariables>) {
        return Apollo.useQuery<ExpertisesQuery, ExpertisesQueryVariables>(ExpertisesDocument, baseOptions);
      }
export function useExpertisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpertisesQuery, ExpertisesQueryVariables>) {
          return Apollo.useLazyQuery<ExpertisesQuery, ExpertisesQueryVariables>(ExpertisesDocument, baseOptions);
        }
export type ExpertisesQueryHookResult = ReturnType<typeof useExpertisesQuery>;
export type ExpertisesLazyQueryHookResult = ReturnType<typeof useExpertisesLazyQuery>;
export type ExpertisesQueryResult = Apollo.QueryResult<ExpertisesQuery, ExpertisesQueryVariables>;
export const IndividualsDocument = gql`
    query Individuals {
  individuals {
    id
    firstName
    lastName
    premium
    user {
      email
      activated
      avatar
    }
  }
}
    `;

/**
 * __useIndividualsQuery__
 *
 * To run a query within a React component, call `useIndividualsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualsQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndividualsQuery(baseOptions?: Apollo.QueryHookOptions<IndividualsQuery, IndividualsQueryVariables>) {
        return Apollo.useQuery<IndividualsQuery, IndividualsQueryVariables>(IndividualsDocument, baseOptions);
      }
export function useIndividualsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualsQuery, IndividualsQueryVariables>) {
          return Apollo.useLazyQuery<IndividualsQuery, IndividualsQueryVariables>(IndividualsDocument, baseOptions);
        }
export type IndividualsQueryHookResult = ReturnType<typeof useIndividualsQuery>;
export type IndividualsLazyQueryHookResult = ReturnType<typeof useIndividualsLazyQuery>;
export type IndividualsQueryResult = Apollo.QueryResult<IndividualsQuery, IndividualsQueryVariables>;
export const IndustriesDocument = gql`
    query Industries {
  industries {
    id
    name
  }
}
    `;

/**
 * __useIndustriesQuery__
 *
 * To run a query within a React component, call `useIndustriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndustriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndustriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndustriesQuery(baseOptions?: Apollo.QueryHookOptions<IndustriesQuery, IndustriesQueryVariables>) {
        return Apollo.useQuery<IndustriesQuery, IndustriesQueryVariables>(IndustriesDocument, baseOptions);
      }
export function useIndustriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndustriesQuery, IndustriesQueryVariables>) {
          return Apollo.useLazyQuery<IndustriesQuery, IndustriesQueryVariables>(IndustriesDocument, baseOptions);
        }
export type IndustriesQueryHookResult = ReturnType<typeof useIndustriesQuery>;
export type IndustriesLazyQueryHookResult = ReturnType<typeof useIndustriesLazyQuery>;
export type IndustriesQueryResult = Apollo.QueryResult<IndustriesQuery, IndustriesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    activated
    avatar
    createdAt
    mentor {
      id
      firstName
      lastName
      bio
      title
      location
      languages
      rate
    }
    individual {
      id
      firstName
      lastName
    }
    admin {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MentorDocument = gql`
    query Mentor($mentorId: Int!) {
  mentor(mentorId: $mentorId) {
    id
    firstName
    lastName
    title
    rate
    bio
    location
    languages
    user {
      avatar
    }
  }
}
    `;

/**
 * __useMentorQuery__
 *
 * To run a query within a React component, call `useMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentorQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useMentorQuery(baseOptions?: Apollo.QueryHookOptions<MentorQuery, MentorQueryVariables>) {
        return Apollo.useQuery<MentorQuery, MentorQueryVariables>(MentorDocument, baseOptions);
      }
export function useMentorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentorQuery, MentorQueryVariables>) {
          return Apollo.useLazyQuery<MentorQuery, MentorQueryVariables>(MentorDocument, baseOptions);
        }
export type MentorQueryHookResult = ReturnType<typeof useMentorQuery>;
export type MentorLazyQueryHookResult = ReturnType<typeof useMentorLazyQuery>;
export type MentorQueryResult = Apollo.QueryResult<MentorQuery, MentorQueryVariables>;
export const MentorSessionsDocument = gql`
    query MentorSessions {
  mentorSessions {
    id
    date
    mentor {
      firstName
      lastName
    }
    individual {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useMentorSessionsQuery__
 *
 * To run a query within a React component, call `useMentorSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentorSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentorSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMentorSessionsQuery(baseOptions?: Apollo.QueryHookOptions<MentorSessionsQuery, MentorSessionsQueryVariables>) {
        return Apollo.useQuery<MentorSessionsQuery, MentorSessionsQueryVariables>(MentorSessionsDocument, baseOptions);
      }
export function useMentorSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentorSessionsQuery, MentorSessionsQueryVariables>) {
          return Apollo.useLazyQuery<MentorSessionsQuery, MentorSessionsQueryVariables>(MentorSessionsDocument, baseOptions);
        }
export type MentorSessionsQueryHookResult = ReturnType<typeof useMentorSessionsQuery>;
export type MentorSessionsLazyQueryHookResult = ReturnType<typeof useMentorSessionsLazyQuery>;
export type MentorSessionsQueryResult = Apollo.QueryResult<MentorSessionsQuery, MentorSessionsQueryVariables>;
export const MentorsDocument = gql`
    query Mentors($skills: [String!]!, $industries: [String!]!) {
  mentors(skills: $skills, industries: $industries) {
    id
    firstName
    lastName
    title
    location
    languages
    rate
    bio
    user {
      email
      avatar
    }
    expertises {
      skill {
        name
      }
    }
    workExperience {
      industries {
        name
      }
    }
    sessionCount
  }
}
    `;

/**
 * __useMentorsQuery__
 *
 * To run a query within a React component, call `useMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMentorsQuery({
 *   variables: {
 *      skills: // value for 'skills'
 *      industries: // value for 'industries'
 *   },
 * });
 */
export function useMentorsQuery(baseOptions?: Apollo.QueryHookOptions<MentorsQuery, MentorsQueryVariables>) {
        return Apollo.useQuery<MentorsQuery, MentorsQueryVariables>(MentorsDocument, baseOptions);
      }
export function useMentorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MentorsQuery, MentorsQueryVariables>) {
          return Apollo.useLazyQuery<MentorsQuery, MentorsQueryVariables>(MentorsDocument, baseOptions);
        }
export type MentorsQueryHookResult = ReturnType<typeof useMentorsQuery>;
export type MentorsLazyQueryHookResult = ReturnType<typeof useMentorsLazyQuery>;
export type MentorsQueryResult = Apollo.QueryResult<MentorsQuery, MentorsQueryVariables>;
export const SessionsDocument = gql`
    query Sessions {
  sessions {
    id
    date
    individual {
      firstName
      lastName
      user {
        email
        avatar
      }
    }
    creator {
      firstName
      lastName
      user {
        email
        avatar
      }
    }
    mentor {
      firstName
      lastName
      user {
        email
        avatar
      }
    }
  }
}
    `;

/**
 * __useSessionsQuery__
 *
 * To run a query within a React component, call `useSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionsQuery(baseOptions?: Apollo.QueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
        return Apollo.useQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
      }
export function useSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
          return Apollo.useLazyQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
        }
export type SessionsQueryHookResult = ReturnType<typeof useSessionsQuery>;
export type SessionsLazyQueryHookResult = ReturnType<typeof useSessionsLazyQuery>;
export type SessionsQueryResult = Apollo.QueryResult<SessionsQuery, SessionsQueryVariables>;
export const SkillsDocument = gql`
    query Skills {
  skills {
    id
    name
  }
}
    `;

/**
 * __useSkillsQuery__
 *
 * To run a query within a React component, call `useSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsQuery(baseOptions?: Apollo.QueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
        return Apollo.useQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, baseOptions);
      }
export function useSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          return Apollo.useLazyQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, baseOptions);
        }
export type SkillsQueryHookResult = ReturnType<typeof useSkillsQuery>;
export type SkillsLazyQueryHookResult = ReturnType<typeof useSkillsLazyQuery>;
export type SkillsQueryResult = Apollo.QueryResult<SkillsQuery, SkillsQueryVariables>;
export const WorkExperiencesDocument = gql`
    query WorkExperiences($mentorId: Int!) {
  workExperiences(mentorId: $mentorId) {
    id
    role
    companyName
    from
    untill
    createdAt
    updatedAt
    description
    industries {
      name
    }
  }
}
    `;

/**
 * __useWorkExperiencesQuery__
 *
 * To run a query within a React component, call `useWorkExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkExperiencesQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useWorkExperiencesQuery(baseOptions?: Apollo.QueryHookOptions<WorkExperiencesQuery, WorkExperiencesQueryVariables>) {
        return Apollo.useQuery<WorkExperiencesQuery, WorkExperiencesQueryVariables>(WorkExperiencesDocument, baseOptions);
      }
export function useWorkExperiencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkExperiencesQuery, WorkExperiencesQueryVariables>) {
          return Apollo.useLazyQuery<WorkExperiencesQuery, WorkExperiencesQueryVariables>(WorkExperiencesDocument, baseOptions);
        }
export type WorkExperiencesQueryHookResult = ReturnType<typeof useWorkExperiencesQuery>;
export type WorkExperiencesLazyQueryHookResult = ReturnType<typeof useWorkExperiencesLazyQuery>;
export type WorkExperiencesQueryResult = Apollo.QueryResult<WorkExperiencesQuery, WorkExperiencesQueryVariables>;