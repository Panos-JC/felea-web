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
  expertisesById: Array<Expertise>;
  individuals: Array<Individual>;
  industries: Array<Industry>;
  mentor: MentorInfoResponse;
  loggedInMentor: MentorInfoResponse;
  allMentors: Array<MentorsResponse>;
  mentors: Array<MentorsResponse>;
  isProfileComplete: IsProfileCompleteResponse;
  reviewsById: Array<Review>;
  skills: Array<Skill>;
  me?: Maybe<Users>;
  workExperiences: Array<WorkExperience>;
  requestsByMentor: RequestsByMentorResponse;
  sessionRequests: Array<SessionRequest>;
  sessionRequestById: SessionRequestByIdResponse;
  companies: Array<Company>;
};


export type QueryExpertisesByIdArgs = {
  mentorId: Scalars['Int'];
};


export type QueryMentorArgs = {
  mentorId: Scalars['Int'];
};


export type QueryMentorsArgs = {
  industries: Array<Scalars['String']>;
  skills: Array<Scalars['String']>;
};


export type QueryReviewsByIdArgs = {
  mentorId: Scalars['Int'];
};


export type QueryWorkExperiencesArgs = {
  mentorId: Scalars['Int'];
};


export type QuerySessionRequestByIdArgs = {
  requestId: Scalars['Int'];
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
  avatar?: Maybe<Scalars['String']>;
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
  profileComplete: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  languages?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  user: Users;
  workExperience: Array<WorkExperience>;
  expertises: Array<Expertise>;
  reviews: Array<Review>;
  sessionRequests: Array<SessionRequest>;
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

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  message: Scalars['String'];
  rating: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  mentor: Mentor;
  individual: Individual;
};


export type Individual = {
  __typename?: 'Individual';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  premium: Scalars['Boolean'];
  stripeCustomerId: Scalars['String'];
  stripePaymentMethodId: Scalars['String'];
  subscriptionId: Scalars['String'];
  user: Users;
  company: Company;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  name: Scalars['String'];
  boughtAccounts: Scalars['Float'];
  remainingAccounts: Scalars['Float'];
  code: Scalars['String'];
  admin: Admin;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SessionRequest = {
  __typename?: 'SessionRequest';
  id: Scalars['Int'];
  objective: Scalars['String'];
  headline: Scalars['String'];
  communicationTool: Scalars['String'];
  email: Scalars['String'];
  communicationToolId: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['String'];
  ammount: Scalars['Float'];
  stripePaymentIntentId: Scalars['String'];
  individual: Individual;
  mentor: Mentor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MentorInfoResponse = {
  __typename?: 'MentorInfoResponse';
  avg?: Maybe<Scalars['Float']>;
  sessionCount: Scalars['Float'];
  info: Mentor;
};

export type MentorsResponse = {
  __typename?: 'MentorsResponse';
  mentor: Mentor;
  sessions: Scalars['Float'];
  avg?: Maybe<Scalars['Float']>;
};

export type IsProfileCompleteResponse = {
  __typename?: 'IsProfileCompleteResponse';
  messages: Array<Scalars['String']>;
  isComplete: Scalars['Boolean'];
};

export type RequestsByMentorResponse = {
  __typename?: 'RequestsByMentorResponse';
  requests?: Maybe<RequestsTypes>;
  errorMsg?: Maybe<Scalars['String']>;
};

export type RequestsTypes = {
  __typename?: 'RequestsTypes';
  pending: Array<SessionRequest>;
  accepted: Array<SessionRequest>;
  declined: Array<SessionRequest>;
  completed: Array<SessionRequest>;
};

export type SessionRequestByIdResponse = {
  __typename?: 'SessionRequestByIdResponse';
  data?: Maybe<SessionRequestByIdData>;
  errorMsg?: Maybe<Scalars['String']>;
};

export type SessionRequestByIdData = {
  __typename?: 'SessionRequestByIdData';
  individual: Individual;
  mentor: Mentor;
  ammount: Scalars['Float'];
  status: Scalars['String'];
  paymentStatus: Scalars['String'];
  date: Scalars['DateTime'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateMentor: GenerateMentorResponse;
  createExpertise: ExpertiseResponse;
  deleteExpertise: DeleteResponse;
  createSubscription: Individual;
  setMentorDetails: MentorResponse;
  setMentorLinks: MentorResponse;
  setBio: MentorResponse;
  createReview: ReviewResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  registerIndividual: UserResponse;
  registerMentor: UserResponse;
  registerAdmin: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addAvatar: UserResponse;
  createWorkExperience: WorkExperience;
  createSessionRequest: CreateRequestResponse;
  acceptRequest: RequestActionResponse;
  declineRequest: RequestActionResponse;
  setRequestComplete: SetRequestCompleteResponse;
  createCompany: CreateCompanyResponse;
};


export type MutationGenerateMentorArgs = {
  email: Scalars['String'];
};


export type MutationCreateExpertiseArgs = {
  description: Scalars['String'];
  skillId: Scalars['Int'];
};


export type MutationDeleteExpertiseArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSubscriptionArgs = {
  token: Scalars['String'];
};


export type MutationSetMentorDetailsArgs = {
  options: MentorDetailsInput;
};


export type MutationSetMentorLinksArgs = {
  links: SocialLinksInput;
};


export type MutationSetBioArgs = {
  bio: Scalars['String'];
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterIndividualArgs = {
  options: RegisterInput;
};


export type MutationRegisterMentorArgs = {
  token: Scalars['String'];
  options: RegisterInput;
};


export type MutationRegisterAdminArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddAvatarArgs = {
  publicId: Scalars['String'];
  avatarUrl: Scalars['String'];
};


export type MutationCreateWorkExperienceArgs = {
  input: WorkExperienceInput;
};


export type MutationCreateSessionRequestArgs = {
  input: SessionRequestInput;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['Int'];
};


export type MutationDeclineRequestArgs = {
  requestId: Scalars['Int'];
};


export type MutationSetRequestCompleteArgs = {
  requestId: Scalars['Int'];
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};

export type GenerateMentorResponse = {
  __typename?: 'GenerateMentorResponse';
  errorMsg?: Maybe<Scalars['String']>;
  emailSent?: Maybe<Scalars['Boolean']>;
};

export type ExpertiseResponse = {
  __typename?: 'ExpertiseResponse';
  errorMsg?: Maybe<Scalars['String']>;
  expertise?: Maybe<Expertise>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  errorMsg?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
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

export type SocialLinksInput = {
  medium: Scalars['String'];
  linkedin: Scalars['String'];
  facebook: Scalars['String'];
  twitter: Scalars['String'];
  instagram: Scalars['String'];
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  errorMsg?: Maybe<Scalars['String']>;
  review?: Maybe<Review>;
};

export type ReviewInput = {
  message: Scalars['String'];
  rating: Scalars['Float'];
  mentorId: Scalars['Float'];
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
  code?: Maybe<Scalars['String']>;
};

export type WorkExperienceInput = {
  role: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  from: Scalars['String'];
  untill: Scalars['String'];
  industries: Array<Scalars['String']>;
};

export type CreateRequestResponse = {
  __typename?: 'CreateRequestResponse';
  errorMsg?: Maybe<Scalars['String']>;
  sessionRequest?: Maybe<SessionRequest>;
};

export type SessionRequestInput = {
  objective: Scalars['String'];
  headline: Scalars['String'];
  email: Scalars['String'];
  communicationTool: Scalars['String'];
  communicationToolId: Scalars['String'];
  message: Scalars['String'];
  ammount: Scalars['Float'];
  mentorId: Scalars['Float'];
  token: Scalars['String'];
};

export type RequestActionResponse = {
  __typename?: 'RequestActionResponse';
  errorMsg?: Maybe<Scalars['String']>;
  accepted?: Maybe<Scalars['Boolean']>;
  declined?: Maybe<Scalars['Boolean']>;
};

export type SetRequestCompleteResponse = {
  __typename?: 'SetRequestCompleteResponse';
  complete?: Maybe<Scalars['Boolean']>;
  errorMsg?: Maybe<Scalars['String']>;
};

export type CreateCompanyResponse = {
  __typename?: 'createCompanyResponse';
  errorMsg?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  accounts: Scalars['Float'];
};

export type SessionRequestFragmentFragment = (
  { __typename?: 'SessionRequest' }
  & Pick<SessionRequest, 'id' | 'objective' | 'headline' | 'communicationTool' | 'communicationToolId' | 'email' | 'message' | 'status' | 'createdAt'>
  & { individual: (
    { __typename?: 'Individual' }
    & Pick<Individual, 'firstName' | 'lastName' | 'premium'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'avatar'>
    ) }
  ) }
);

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type AcceptRequestMutation = (
  { __typename?: 'Mutation' }
  & { acceptRequest: (
    { __typename?: 'RequestActionResponse' }
    & Pick<RequestActionResponse, 'errorMsg' | 'accepted'>
  ) }
);

export type AddAvatarMutationVariables = Exact<{
  avatarUrl: Scalars['String'];
  publicId: Scalars['String'];
}>;


export type AddAvatarMutation = (
  { __typename?: 'Mutation' }
  & { addAvatar: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'avatar'>
    )> }
  ) }
);

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

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email'>
    )> }
  ) }
);

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = (
  { __typename?: 'Mutation' }
  & { createCompany: (
    { __typename?: 'createCompanyResponse' }
    & Pick<CreateCompanyResponse, 'errorMsg'>
    & { company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'name' | 'boughtAccounts' | 'remainingAccounts' | 'code'>
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

export type CreateReviewMutationVariables = Exact<{
  input: ReviewInput;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'ReviewResponse' }
    & Pick<ReviewResponse, 'errorMsg'>
    & { review?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'message' | 'rating' | 'createdAt'>
    )> }
  ) }
);

export type CreateSessionRequestMutationVariables = Exact<{
  input: SessionRequestInput;
}>;


export type CreateSessionRequestMutation = (
  { __typename?: 'Mutation' }
  & { createSessionRequest: (
    { __typename?: 'CreateRequestResponse' }
    & Pick<CreateRequestResponse, 'errorMsg'>
    & { sessionRequest?: Maybe<(
      { __typename?: 'SessionRequest' }
      & Pick<SessionRequest, 'id' | 'headline'>
    )> }
  ) }
);

export type CreateSubscriptionMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type CreateSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { createSubscription: (
    { __typename?: 'Individual' }
    & Pick<Individual, 'id' | 'firstName' | 'lastName'>
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

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type DeclineRequestMutation = (
  { __typename?: 'Mutation' }
  & { declineRequest: (
    { __typename?: 'RequestActionResponse' }
    & Pick<RequestActionResponse, 'errorMsg' | 'declined'>
  ) }
);

export type DeleteExpertiseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExpertiseMutation = (
  { __typename?: 'Mutation' }
  & { deleteExpertise: (
    { __typename?: 'DeleteResponse' }
    & Pick<DeleteResponse, 'errorMsg' | 'deleted'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GenerateMentorMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type GenerateMentorMutation = (
  { __typename?: 'Mutation' }
  & { generateMentor: (
    { __typename?: 'GenerateMentorResponse' }
    & Pick<GenerateMentorResponse, 'errorMsg' | 'emailSent'>
  ) }
);

export type RegisterIndividualMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterIndividualMutation = (
  { __typename?: 'Mutation' }
  & { registerIndividual: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'activated'>
    )> }
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
  token: Scalars['String'];
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

export type SetMentorLinksMutationVariables = Exact<{
  links: SocialLinksInput;
}>;


export type SetMentorLinksMutation = (
  { __typename?: 'Mutation' }
  & { setMentorLinks: (
    { __typename?: 'MentorResponse' }
    & { error?: Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>, mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'facebook' | 'medium' | 'linkedin' | 'twitter' | 'instagram'>
    )> }
  ) }
);

export type SetRequestCompleteMutationVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type SetRequestCompleteMutation = (
  { __typename?: 'Mutation' }
  & { setRequestComplete: (
    { __typename?: 'SetRequestCompleteResponse' }
    & Pick<SetRequestCompleteResponse, 'errorMsg' | 'complete'>
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

export type AllMentorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMentorsQuery = (
  { __typename?: 'Query' }
  & { allMentors: Array<(
    { __typename?: 'MentorsResponse' }
    & Pick<MentorsResponse, 'sessions' | 'avg'>
    & { mentor: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
    ) }
  )> }
);

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = (
  { __typename?: 'Query' }
  & { companies: Array<(
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'name' | 'boughtAccounts' | 'remainingAccounts' | 'code' | 'createdAt'>
    & { admin: (
      { __typename?: 'Admin' }
      & Pick<Admin, 'firstName' | 'lastName'>
    ) }
  )> }
);

export type ExpertisesQueryVariables = Exact<{ [key: string]: never; }>;


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

export type ExpertisesByIdQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type ExpertisesByIdQuery = (
  { __typename?: 'Query' }
  & { expertisesById: Array<(
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

export type IsProfileCompleteQueryVariables = Exact<{ [key: string]: never; }>;


export type IsProfileCompleteQuery = (
  { __typename?: 'Query' }
  & { isProfileComplete: (
    { __typename?: 'IsProfileCompleteResponse' }
    & Pick<IsProfileCompleteResponse, 'messages' | 'isComplete'>
  ) }
);

export type LoggedInMentorQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInMentorQuery = (
  { __typename?: 'Query' }
  & { loggedInMentor: (
    { __typename?: 'MentorInfoResponse' }
    & Pick<MentorInfoResponse, 'avg' | 'sessionCount'>
    & { info: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'bio' | 'rate' | 'profileComplete' | 'medium' | 'facebook' | 'linkedin' | 'twitter' | 'instagram'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'avatar'>
      ) }
    ) }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'email' | 'activated' | 'avatar' | 'createdAt'>
    & { mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'bio' | 'title' | 'location' | 'languages' | 'rate' | 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'medium'>
    )>, individual?: Maybe<(
      { __typename?: 'Individual' }
      & Pick<Individual, 'id' | 'firstName' | 'lastName' | 'premium'>
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
    { __typename?: 'MentorInfoResponse' }
    & Pick<MentorInfoResponse, 'avg' | 'sessionCount'>
    & { info: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'bio' | 'rate' | 'medium' | 'facebook' | 'linkedin' | 'twitter' | 'instagram'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'avatar'>
      ) }
    ) }
  ) }
);

export type MentorsQueryVariables = Exact<{
  skills: Array<Scalars['String']>;
  industries: Array<Scalars['String']>;
}>;


export type MentorsQuery = (
  { __typename?: 'Query' }
  & { mentors: Array<(
    { __typename?: 'MentorsResponse' }
    & Pick<MentorsResponse, 'avg' | 'sessions'>
    & { mentor: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'bio' | 'rate'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'avatar' | 'email'>
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
    ) }
  )> }
);

export type RequestsByMentorQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestsByMentorQuery = (
  { __typename?: 'Query' }
  & { requestsByMentor: (
    { __typename?: 'RequestsByMentorResponse' }
    & Pick<RequestsByMentorResponse, 'errorMsg'>
    & { requests?: Maybe<(
      { __typename?: 'RequestsTypes' }
      & { pending: Array<(
        { __typename?: 'SessionRequest' }
        & SessionRequestFragmentFragment
      )>, accepted: Array<(
        { __typename?: 'SessionRequest' }
        & SessionRequestFragmentFragment
      )>, declined: Array<(
        { __typename?: 'SessionRequest' }
        & SessionRequestFragmentFragment
      )>, completed: Array<(
        { __typename?: 'SessionRequest' }
        & SessionRequestFragmentFragment
      )> }
    )> }
  ) }
);

export type ReviewsByIdQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type ReviewsByIdQuery = (
  { __typename?: 'Query' }
  & { reviewsById: Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'message' | 'rating' | 'createdAt'>
    & { individual: (
      { __typename?: 'Individual' }
      & Pick<Individual, 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'avatar'>
      ) }
    ) }
  )> }
);

export type SessionRequestByIdQueryVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type SessionRequestByIdQuery = (
  { __typename?: 'Query' }
  & { sessionRequestById: (
    { __typename?: 'SessionRequestByIdResponse' }
    & Pick<SessionRequestByIdResponse, 'errorMsg'>
    & { data?: Maybe<(
      { __typename?: 'SessionRequestByIdData' }
      & Pick<SessionRequestByIdData, 'ammount' | 'status' | 'paymentStatus' | 'date' | 'message'>
      & { individual: (
        { __typename?: 'Individual' }
        & Pick<Individual, 'firstName' | 'lastName'>
        & { user: (
          { __typename?: 'Users' }
          & Pick<Users, 'email'>
        ) }
      ), mentor: (
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'firstName' | 'lastName'>
        & { user: (
          { __typename?: 'Users' }
          & Pick<Users, 'email'>
        ) }
      ) }
    )> }
  ) }
);

export type SessionRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionRequestsQuery = (
  { __typename?: 'Query' }
  & { sessionRequests: Array<(
    { __typename?: 'SessionRequest' }
    & Pick<SessionRequest, 'id' | 'objective' | 'headline' | 'message' | 'communicationTool' | 'communicationToolId' | 'email' | 'status' | 'ammount' | 'createdAt'>
    & { mentor: (
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
    ), individual: (
      { __typename?: 'Individual' }
      & Pick<Individual, 'firstName' | 'lastName'>
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

export const SessionRequestFragmentFragmentDoc = gql`
    fragment SessionRequestFragment on SessionRequest {
  id
  objective
  headline
  communicationTool
  communicationToolId
  email
  message
  status
  createdAt
  individual {
    firstName
    lastName
    premium
    user {
      email
      avatar
    }
  }
}
    `;
export const AcceptRequestDocument = gql`
    mutation AcceptRequest($requestId: Int!) {
  acceptRequest(requestId: $requestId) {
    errorMsg
    accepted
  }
}
    `;
export type AcceptRequestMutationFn = Apollo.MutationFunction<AcceptRequestMutation, AcceptRequestMutationVariables>;

/**
 * __useAcceptRequestMutation__
 *
 * To run a mutation, you first call `useAcceptRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRequestMutation, { data, loading, error }] = useAcceptRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useAcceptRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptRequestMutation, AcceptRequestMutationVariables>) {
        return Apollo.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument, baseOptions);
      }
export type AcceptRequestMutationHookResult = ReturnType<typeof useAcceptRequestMutation>;
export type AcceptRequestMutationResult = Apollo.MutationResult<AcceptRequestMutation>;
export type AcceptRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRequestMutation, AcceptRequestMutationVariables>;
export const AddAvatarDocument = gql`
    mutation AddAvatar($avatarUrl: String!, $publicId: String!) {
  addAvatar(avatarUrl: $avatarUrl, publicId: $publicId) {
    errors {
      field
      message
    }
    user {
      avatar
    }
  }
}
    `;
export type AddAvatarMutationFn = Apollo.MutationFunction<AddAvatarMutation, AddAvatarMutationVariables>;

/**
 * __useAddAvatarMutation__
 *
 * To run a mutation, you first call `useAddAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAvatarMutation, { data, loading, error }] = useAddAvatarMutation({
 *   variables: {
 *      avatarUrl: // value for 'avatarUrl'
 *      publicId: // value for 'publicId'
 *   },
 * });
 */
export function useAddAvatarMutation(baseOptions?: Apollo.MutationHookOptions<AddAvatarMutation, AddAvatarMutationVariables>) {
        return Apollo.useMutation<AddAvatarMutation, AddAvatarMutationVariables>(AddAvatarDocument, baseOptions);
      }
export type AddAvatarMutationHookResult = ReturnType<typeof useAddAvatarMutation>;
export type AddAvatarMutationResult = Apollo.MutationResult<AddAvatarMutation>;
export type AddAvatarMutationOptions = Apollo.BaseMutationOptions<AddAvatarMutation, AddAvatarMutationVariables>;
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
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    errorMsg
    company {
      id
      name
      boughtAccounts
      remainingAccounts
      code
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, baseOptions);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
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
export const CreateReviewDocument = gql`
    mutation CreateReview($input: ReviewInput!) {
  createReview(input: $input) {
    errorMsg
    review {
      id
      message
      rating
      createdAt
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, baseOptions);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateSessionRequestDocument = gql`
    mutation CreateSessionRequest($input: SessionRequestInput!) {
  createSessionRequest(input: $input) {
    errorMsg
    sessionRequest {
      id
      headline
    }
  }
}
    `;
export type CreateSessionRequestMutationFn = Apollo.MutationFunction<CreateSessionRequestMutation, CreateSessionRequestMutationVariables>;

/**
 * __useCreateSessionRequestMutation__
 *
 * To run a mutation, you first call `useCreateSessionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionRequestMutation, { data, loading, error }] = useCreateSessionRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSessionRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionRequestMutation, CreateSessionRequestMutationVariables>) {
        return Apollo.useMutation<CreateSessionRequestMutation, CreateSessionRequestMutationVariables>(CreateSessionRequestDocument, baseOptions);
      }
export type CreateSessionRequestMutationHookResult = ReturnType<typeof useCreateSessionRequestMutation>;
export type CreateSessionRequestMutationResult = Apollo.MutationResult<CreateSessionRequestMutation>;
export type CreateSessionRequestMutationOptions = Apollo.BaseMutationOptions<CreateSessionRequestMutation, CreateSessionRequestMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($token: String!) {
  createSubscription(token: $token) {
    id
    firstName
    lastName
  }
}
    `;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, baseOptions);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
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
export const DeclineRequestDocument = gql`
    mutation DeclineRequest($requestId: Int!) {
  declineRequest(requestId: $requestId) {
    errorMsg
    declined
  }
}
    `;
export type DeclineRequestMutationFn = Apollo.MutationFunction<DeclineRequestMutation, DeclineRequestMutationVariables>;

/**
 * __useDeclineRequestMutation__
 *
 * To run a mutation, you first call `useDeclineRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineRequestMutation, { data, loading, error }] = useDeclineRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useDeclineRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineRequestMutation, DeclineRequestMutationVariables>) {
        return Apollo.useMutation<DeclineRequestMutation, DeclineRequestMutationVariables>(DeclineRequestDocument, baseOptions);
      }
export type DeclineRequestMutationHookResult = ReturnType<typeof useDeclineRequestMutation>;
export type DeclineRequestMutationResult = Apollo.MutationResult<DeclineRequestMutation>;
export type DeclineRequestMutationOptions = Apollo.BaseMutationOptions<DeclineRequestMutation, DeclineRequestMutationVariables>;
export const DeleteExpertiseDocument = gql`
    mutation DeleteExpertise($id: Int!) {
  deleteExpertise(id: $id) {
    errorMsg
    deleted
  }
}
    `;
export type DeleteExpertiseMutationFn = Apollo.MutationFunction<DeleteExpertiseMutation, DeleteExpertiseMutationVariables>;

/**
 * __useDeleteExpertiseMutation__
 *
 * To run a mutation, you first call `useDeleteExpertiseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpertiseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpertiseMutation, { data, loading, error }] = useDeleteExpertiseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExpertiseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpertiseMutation, DeleteExpertiseMutationVariables>) {
        return Apollo.useMutation<DeleteExpertiseMutation, DeleteExpertiseMutationVariables>(DeleteExpertiseDocument, baseOptions);
      }
export type DeleteExpertiseMutationHookResult = ReturnType<typeof useDeleteExpertiseMutation>;
export type DeleteExpertiseMutationResult = Apollo.MutationResult<DeleteExpertiseMutation>;
export type DeleteExpertiseMutationOptions = Apollo.BaseMutationOptions<DeleteExpertiseMutation, DeleteExpertiseMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GenerateMentorDocument = gql`
    mutation GenerateMentor($email: String!) {
  generateMentor(email: $email) {
    errorMsg
    emailSent
  }
}
    `;
export type GenerateMentorMutationFn = Apollo.MutationFunction<GenerateMentorMutation, GenerateMentorMutationVariables>;

/**
 * __useGenerateMentorMutation__
 *
 * To run a mutation, you first call `useGenerateMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateMentorMutation, { data, loading, error }] = useGenerateMentorMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGenerateMentorMutation(baseOptions?: Apollo.MutationHookOptions<GenerateMentorMutation, GenerateMentorMutationVariables>) {
        return Apollo.useMutation<GenerateMentorMutation, GenerateMentorMutationVariables>(GenerateMentorDocument, baseOptions);
      }
export type GenerateMentorMutationHookResult = ReturnType<typeof useGenerateMentorMutation>;
export type GenerateMentorMutationResult = Apollo.MutationResult<GenerateMentorMutation>;
export type GenerateMentorMutationOptions = Apollo.BaseMutationOptions<GenerateMentorMutation, GenerateMentorMutationVariables>;
export const RegisterIndividualDocument = gql`
    mutation RegisterIndividual($options: RegisterInput!) {
  registerIndividual(options: $options) {
    errors {
      field
      message
    }
    user {
      email
      activated
    }
  }
}
    `;
export type RegisterIndividualMutationFn = Apollo.MutationFunction<RegisterIndividualMutation, RegisterIndividualMutationVariables>;

/**
 * __useRegisterIndividualMutation__
 *
 * To run a mutation, you first call `useRegisterIndividualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterIndividualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerIndividualMutation, { data, loading, error }] = useRegisterIndividualMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterIndividualMutation(baseOptions?: Apollo.MutationHookOptions<RegisterIndividualMutation, RegisterIndividualMutationVariables>) {
        return Apollo.useMutation<RegisterIndividualMutation, RegisterIndividualMutationVariables>(RegisterIndividualDocument, baseOptions);
      }
export type RegisterIndividualMutationHookResult = ReturnType<typeof useRegisterIndividualMutation>;
export type RegisterIndividualMutationResult = Apollo.MutationResult<RegisterIndividualMutation>;
export type RegisterIndividualMutationOptions = Apollo.BaseMutationOptions<RegisterIndividualMutation, RegisterIndividualMutationVariables>;
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
    mutation MentorRegister($options: RegisterInput!, $token: String!) {
  registerMentor(options: $options, token: $token) {
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
 *      token: // value for 'token'
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
export const SetMentorLinksDocument = gql`
    mutation SetMentorLinks($links: SocialLinksInput!) {
  setMentorLinks(links: $links) {
    error {
      message
    }
    mentor {
      facebook
      medium
      linkedin
      twitter
      instagram
    }
  }
}
    `;
export type SetMentorLinksMutationFn = Apollo.MutationFunction<SetMentorLinksMutation, SetMentorLinksMutationVariables>;

/**
 * __useSetMentorLinksMutation__
 *
 * To run a mutation, you first call `useSetMentorLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMentorLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMentorLinksMutation, { data, loading, error }] = useSetMentorLinksMutation({
 *   variables: {
 *      links: // value for 'links'
 *   },
 * });
 */
export function useSetMentorLinksMutation(baseOptions?: Apollo.MutationHookOptions<SetMentorLinksMutation, SetMentorLinksMutationVariables>) {
        return Apollo.useMutation<SetMentorLinksMutation, SetMentorLinksMutationVariables>(SetMentorLinksDocument, baseOptions);
      }
export type SetMentorLinksMutationHookResult = ReturnType<typeof useSetMentorLinksMutation>;
export type SetMentorLinksMutationResult = Apollo.MutationResult<SetMentorLinksMutation>;
export type SetMentorLinksMutationOptions = Apollo.BaseMutationOptions<SetMentorLinksMutation, SetMentorLinksMutationVariables>;
export const SetRequestCompleteDocument = gql`
    mutation SetRequestComplete($requestId: Int!) {
  setRequestComplete(requestId: $requestId) {
    errorMsg
    complete
  }
}
    `;
export type SetRequestCompleteMutationFn = Apollo.MutationFunction<SetRequestCompleteMutation, SetRequestCompleteMutationVariables>;

/**
 * __useSetRequestCompleteMutation__
 *
 * To run a mutation, you first call `useSetRequestCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRequestCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRequestCompleteMutation, { data, loading, error }] = useSetRequestCompleteMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useSetRequestCompleteMutation(baseOptions?: Apollo.MutationHookOptions<SetRequestCompleteMutation, SetRequestCompleteMutationVariables>) {
        return Apollo.useMutation<SetRequestCompleteMutation, SetRequestCompleteMutationVariables>(SetRequestCompleteDocument, baseOptions);
      }
export type SetRequestCompleteMutationHookResult = ReturnType<typeof useSetRequestCompleteMutation>;
export type SetRequestCompleteMutationResult = Apollo.MutationResult<SetRequestCompleteMutation>;
export type SetRequestCompleteMutationOptions = Apollo.BaseMutationOptions<SetRequestCompleteMutation, SetRequestCompleteMutationVariables>;
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
export const AllMentorsDocument = gql`
    query AllMentors {
  allMentors {
    mentor {
      id
      firstName
      lastName
      user {
        email
        avatar
      }
    }
    sessions
    avg
  }
}
    `;

/**
 * __useAllMentorsQuery__
 *
 * To run a query within a React component, call `useAllMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMentorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMentorsQuery(baseOptions?: Apollo.QueryHookOptions<AllMentorsQuery, AllMentorsQueryVariables>) {
        return Apollo.useQuery<AllMentorsQuery, AllMentorsQueryVariables>(AllMentorsDocument, baseOptions);
      }
export function useAllMentorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMentorsQuery, AllMentorsQueryVariables>) {
          return Apollo.useLazyQuery<AllMentorsQuery, AllMentorsQueryVariables>(AllMentorsDocument, baseOptions);
        }
export type AllMentorsQueryHookResult = ReturnType<typeof useAllMentorsQuery>;
export type AllMentorsLazyQueryHookResult = ReturnType<typeof useAllMentorsLazyQuery>;
export type AllMentorsQueryResult = Apollo.QueryResult<AllMentorsQuery, AllMentorsQueryVariables>;
export const CompaniesDocument = gql`
    query Companies {
  companies {
    id
    name
    boughtAccounts
    remainingAccounts
    code
    createdAt
    admin {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const ExpertisesDocument = gql`
    query Expertises {
  expertises {
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
export const ExpertisesByIdDocument = gql`
    query ExpertisesById($mentorId: Int!) {
  expertisesById(mentorId: $mentorId) {
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
 * __useExpertisesByIdQuery__
 *
 * To run a query within a React component, call `useExpertisesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpertisesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpertisesByIdQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useExpertisesByIdQuery(baseOptions?: Apollo.QueryHookOptions<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>) {
        return Apollo.useQuery<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>(ExpertisesByIdDocument, baseOptions);
      }
export function useExpertisesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>) {
          return Apollo.useLazyQuery<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>(ExpertisesByIdDocument, baseOptions);
        }
export type ExpertisesByIdQueryHookResult = ReturnType<typeof useExpertisesByIdQuery>;
export type ExpertisesByIdLazyQueryHookResult = ReturnType<typeof useExpertisesByIdLazyQuery>;
export type ExpertisesByIdQueryResult = Apollo.QueryResult<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>;
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
export const IsProfileCompleteDocument = gql`
    query IsProfileComplete {
  isProfileComplete {
    messages
    isComplete
  }
}
    `;

/**
 * __useIsProfileCompleteQuery__
 *
 * To run a query within a React component, call `useIsProfileCompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsProfileCompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsProfileCompleteQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsProfileCompleteQuery(baseOptions?: Apollo.QueryHookOptions<IsProfileCompleteQuery, IsProfileCompleteQueryVariables>) {
        return Apollo.useQuery<IsProfileCompleteQuery, IsProfileCompleteQueryVariables>(IsProfileCompleteDocument, baseOptions);
      }
export function useIsProfileCompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsProfileCompleteQuery, IsProfileCompleteQueryVariables>) {
          return Apollo.useLazyQuery<IsProfileCompleteQuery, IsProfileCompleteQueryVariables>(IsProfileCompleteDocument, baseOptions);
        }
export type IsProfileCompleteQueryHookResult = ReturnType<typeof useIsProfileCompleteQuery>;
export type IsProfileCompleteLazyQueryHookResult = ReturnType<typeof useIsProfileCompleteLazyQuery>;
export type IsProfileCompleteQueryResult = Apollo.QueryResult<IsProfileCompleteQuery, IsProfileCompleteQueryVariables>;
export const LoggedInMentorDocument = gql`
    query LoggedInMentor {
  loggedInMentor {
    avg
    sessionCount
    info {
      id
      firstName
      lastName
      title
      location
      languages
      bio
      rate
      profileComplete
      medium
      facebook
      linkedin
      twitter
      instagram
      user {
        avatar
      }
    }
  }
}
    `;

/**
 * __useLoggedInMentorQuery__
 *
 * To run a query within a React component, call `useLoggedInMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInMentorQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInMentorQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInMentorQuery, LoggedInMentorQueryVariables>) {
        return Apollo.useQuery<LoggedInMentorQuery, LoggedInMentorQueryVariables>(LoggedInMentorDocument, baseOptions);
      }
export function useLoggedInMentorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInMentorQuery, LoggedInMentorQueryVariables>) {
          return Apollo.useLazyQuery<LoggedInMentorQuery, LoggedInMentorQueryVariables>(LoggedInMentorDocument, baseOptions);
        }
export type LoggedInMentorQueryHookResult = ReturnType<typeof useLoggedInMentorQuery>;
export type LoggedInMentorLazyQueryHookResult = ReturnType<typeof useLoggedInMentorLazyQuery>;
export type LoggedInMentorQueryResult = Apollo.QueryResult<LoggedInMentorQuery, LoggedInMentorQueryVariables>;
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
      facebook
      twitter
      instagram
      linkedin
      medium
    }
    individual {
      id
      firstName
      lastName
      premium
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
    avg
    sessionCount
    info {
      id
      firstName
      lastName
      title
      location
      languages
      bio
      rate
      medium
      facebook
      linkedin
      twitter
      instagram
      user {
        avatar
      }
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
export const MentorsDocument = gql`
    query Mentors($skills: [String!]!, $industries: [String!]!) {
  mentors(skills: $skills, industries: $industries) {
    avg
    sessions
    mentor {
      id
      firstName
      lastName
      title
      location
      languages
      bio
      rate
      user {
        avatar
        email
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
    }
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
export const RequestsByMentorDocument = gql`
    query RequestsByMentor {
  requestsByMentor {
    errorMsg
    requests {
      pending {
        ...SessionRequestFragment
      }
      accepted {
        ...SessionRequestFragment
      }
      declined {
        ...SessionRequestFragment
      }
      completed {
        ...SessionRequestFragment
      }
    }
  }
}
    ${SessionRequestFragmentFragmentDoc}`;

/**
 * __useRequestsByMentorQuery__
 *
 * To run a query within a React component, call `useRequestsByMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsByMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsByMentorQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestsByMentorQuery(baseOptions?: Apollo.QueryHookOptions<RequestsByMentorQuery, RequestsByMentorQueryVariables>) {
        return Apollo.useQuery<RequestsByMentorQuery, RequestsByMentorQueryVariables>(RequestsByMentorDocument, baseOptions);
      }
export function useRequestsByMentorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsByMentorQuery, RequestsByMentorQueryVariables>) {
          return Apollo.useLazyQuery<RequestsByMentorQuery, RequestsByMentorQueryVariables>(RequestsByMentorDocument, baseOptions);
        }
export type RequestsByMentorQueryHookResult = ReturnType<typeof useRequestsByMentorQuery>;
export type RequestsByMentorLazyQueryHookResult = ReturnType<typeof useRequestsByMentorLazyQuery>;
export type RequestsByMentorQueryResult = Apollo.QueryResult<RequestsByMentorQuery, RequestsByMentorQueryVariables>;
export const ReviewsByIdDocument = gql`
    query ReviewsById($mentorId: Int!) {
  reviewsById(mentorId: $mentorId) {
    id
    message
    rating
    createdAt
    individual {
      firstName
      lastName
      user {
        avatar
      }
    }
  }
}
    `;

/**
 * __useReviewsByIdQuery__
 *
 * To run a query within a React component, call `useReviewsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsByIdQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useReviewsByIdQuery(baseOptions?: Apollo.QueryHookOptions<ReviewsByIdQuery, ReviewsByIdQueryVariables>) {
        return Apollo.useQuery<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, baseOptions);
      }
export function useReviewsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsByIdQuery, ReviewsByIdQueryVariables>) {
          return Apollo.useLazyQuery<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, baseOptions);
        }
export type ReviewsByIdQueryHookResult = ReturnType<typeof useReviewsByIdQuery>;
export type ReviewsByIdLazyQueryHookResult = ReturnType<typeof useReviewsByIdLazyQuery>;
export type ReviewsByIdQueryResult = Apollo.QueryResult<ReviewsByIdQuery, ReviewsByIdQueryVariables>;
export const SessionRequestByIdDocument = gql`
    query SessionRequestById($requestId: Int!) {
  sessionRequestById(requestId: $requestId) {
    errorMsg
    data {
      individual {
        firstName
        lastName
        user {
          email
        }
      }
      mentor {
        firstName
        lastName
        user {
          email
        }
      }
      ammount
      status
      paymentStatus
      date
      message
    }
  }
}
    `;

/**
 * __useSessionRequestByIdQuery__
 *
 * To run a query within a React component, call `useSessionRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionRequestByIdQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useSessionRequestByIdQuery(baseOptions?: Apollo.QueryHookOptions<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>) {
        return Apollo.useQuery<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>(SessionRequestByIdDocument, baseOptions);
      }
export function useSessionRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>) {
          return Apollo.useLazyQuery<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>(SessionRequestByIdDocument, baseOptions);
        }
export type SessionRequestByIdQueryHookResult = ReturnType<typeof useSessionRequestByIdQuery>;
export type SessionRequestByIdLazyQueryHookResult = ReturnType<typeof useSessionRequestByIdLazyQuery>;
export type SessionRequestByIdQueryResult = Apollo.QueryResult<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>;
export const SessionRequestsDocument = gql`
    query SessionRequests {
  sessionRequests {
    id
    objective
    headline
    message
    communicationTool
    communicationToolId
    email
    status
    ammount
    createdAt
    mentor {
      firstName
      lastName
      user {
        email
        avatar
      }
    }
    individual {
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
 * __useSessionRequestsQuery__
 *
 * To run a query within a React component, call `useSessionRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionRequestsQuery(baseOptions?: Apollo.QueryHookOptions<SessionRequestsQuery, SessionRequestsQueryVariables>) {
        return Apollo.useQuery<SessionRequestsQuery, SessionRequestsQueryVariables>(SessionRequestsDocument, baseOptions);
      }
export function useSessionRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionRequestsQuery, SessionRequestsQueryVariables>) {
          return Apollo.useLazyQuery<SessionRequestsQuery, SessionRequestsQueryVariables>(SessionRequestsDocument, baseOptions);
        }
export type SessionRequestsQueryHookResult = ReturnType<typeof useSessionRequestsQuery>;
export type SessionRequestsLazyQueryHookResult = ReturnType<typeof useSessionRequestsLazyQuery>;
export type SessionRequestsQueryResult = Apollo.QueryResult<SessionRequestsQuery, SessionRequestsQueryVariables>;
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