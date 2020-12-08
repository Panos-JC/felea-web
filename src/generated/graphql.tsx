import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  individual: Individual;
  individuals: Array<Individual>;
  industries: Array<Industry>;
  mentor: MentorInfoResponse;
  loggedInMentor: MentorInfoResponse;
  allMentors: Array<MentorsResponse>;
  mentors: Array<MentorsResponse>;
  isProfileComplete: IsProfileCompleteResponse;
  reviewsById: Array<Review>;
  skills: Array<Skill>;
  workExperiences: WorkExperiencesResponse;
  requestsByMentor: RequestsByMentorResponse;
  sessionRequests: Array<SessionRequest>;
  sessionRequestById: SessionRequestByIdResponse;
  individualRequests: SessionRequestsResponse;
  individualRequestById: SessionRequestResponse;
  companies: Array<Company>;
  me?: Maybe<Users>;
  educations: EducationsResponse;
  certificates: CertificatesResponse;
  getBio: GetResponse;
  getAvatar: GetResponse;
  getMotto: GetResponse;
  getMentorInfo: Temp;
};


export type QueryExpertisesByIdArgs = {
  mentorId: Scalars['Int'];
};


export type QueryIndividualArgs = {
  individualId: Scalars['Int'];
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
  mentorId?: Maybe<Scalars['Int']>;
};


export type QuerySessionRequestByIdArgs = {
  requestId: Scalars['Int'];
};


export type QueryIndividualRequestByIdArgs = {
  requestId: Scalars['Int'];
};


export type QueryEducationsArgs = {
  mentorId?: Maybe<Scalars['Int']>;
};


export type QueryCertificatesArgs = {
  mentorId?: Maybe<Scalars['Int']>;
};


export type QueryGetBioArgs = {
  mentorId: Scalars['Int'];
};


export type QueryGetAvatarArgs = {
  mentorId: Scalars['Int'];
};


export type QueryGetMottoArgs = {
  mentorId: Scalars['Int'];
};


export type QueryGetMentorInfoArgs = {
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
  motto?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  languages?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
  availableDayFrom?: Maybe<Scalars['String']>;
  availableDayUntill?: Maybe<Scalars['String']>;
  availableTimeFrom?: Maybe<Scalars['DateTime']>;
  availableTimeUntill?: Maybe<Scalars['DateTime']>;
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
  from: Scalars['DateTime'];
  untill: Scalars['DateTime'];
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
  descriptionText: Scalars['String'];
  skill: Skill;
  mentor: Mentor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int'];
  name: Scalars['String'];
  nameLowercase: Scalars['String'];
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

export type WorkExperiencesResponse = {
  __typename?: 'WorkExperiencesResponse';
  errorMsg?: Maybe<Scalars['String']>;
  data?: Maybe<Array<WorkExperience>>;
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
  date: Scalars['DateTime'];
  message: Scalars['String'];
};

export type SessionRequestsResponse = {
  __typename?: 'SessionRequestsResponse';
  errorMsg?: Maybe<Scalars['String']>;
  data?: Maybe<Array<SessionRequest>>;
};

export type SessionRequestResponse = {
  __typename?: 'SessionRequestResponse';
  errorMsg?: Maybe<Scalars['String']>;
  data?: Maybe<SessionRequest>;
};

export type EducationsResponse = {
  __typename?: 'EducationsResponse';
  errorMsg?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Education>>;
};

export type Education = {
  __typename?: 'Education';
  id: Scalars['Int'];
  title: Scalars['String'];
  school: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  description: Scalars['String'];
  mentor: Mentor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CertificatesResponse = {
  __typename?: 'CertificatesResponse';
  errorMsg?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Certificate>>;
};

export type Certificate = {
  __typename?: 'Certificate';
  id: Scalars['Int'];
  title: Scalars['String'];
  organization: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  mentor: Mentor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GetResponse = {
  __typename?: 'GetResponse';
  result?: Maybe<Scalars['String']>;
};

export type Temp = {
  __typename?: 'Temp';
  errorMsg?: Maybe<Scalars['String']>;
  mentor?: Maybe<Mentor>;
};

export type Mutation = {
  __typename?: 'Mutation';
  generateMentor: GenerateUserResponse;
  generateAdmin: GenerateUserResponse;
  createExpertise: ExpertiseResponse;
  deleteExpertise: DeleteResponse;
  createReview: ReviewResponse;
  createWorkExperience: WorkExperienceResponse;
  updateWorkExperience: WorkExperienceResponse;
  deleteWorkExperience: Scalars['Boolean'];
  createCompany: CreateCompanyResponse;
  registerIndividual: UserResponse;
  registerMentor: UserResponse;
  registerAdmin: UserResponse;
  addAvatar: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  changeKnownPassword: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateIndividualInfo: UpdateIndividualInfoResponse;
  updateAdminInfo: UpdateAdminInfoResponse;
  createEducation: EducationResponse;
  updateEducation: EducationResponse;
  deleteEducation: Scalars['Boolean'];
  createCertificate: CertificateResponse;
  updateCertificate: CertificateResponse;
  deleteCertificate: Scalars['Boolean'];
  setMentorDetails: MentorResponse;
  setMentorLinks: MentorResponse;
  setBio: MentorResponse;
  setMotto: MentorResponse;
  acceptRequest: RequestActionResponse;
  declineRequest: RequestActionResponse;
  setRequestComplete: SetRequestCompleteResponse;
  createSessionRequest: CreateRequestResponse;
  confirmUser: Scalars['Boolean'];
  addAvatarByAdmin: Scalars['Boolean'];
  setBioByMentor: Scalars['Boolean'];
  setMentorDetailsByAdmin: MentorResponse;
  setMottoByMentor: Scalars['Boolean'];
  deleteExpertiseByAdmin: Scalars['Boolean'];
  deleteWorkExperienceByAdmin: Scalars['Boolean'];
  deleteEducationByAdmin: Scalars['Boolean'];
  deleteCertificateByAdmin: Scalars['Boolean'];
  createCertificateByAdmin: CertificateResponse;
  createExpertiseByAdmin: ExpertiseResponse;
  createWorkExperienceByAdmin: WorkExperienceResponse;
  createEducationByAdmin: EducationResponse;
  deleteIndividual: DeleteEntityResponse;
  deleteMentor: DeleteEntityResponse;
};


export type MutationGenerateMentorArgs = {
  email: Scalars['String'];
};


export type MutationGenerateAdminArgs = {
  email: Scalars['String'];
};


export type MutationCreateExpertiseArgs = {
  descriptionText?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  skillName: Scalars['String'];
};


export type MutationDeleteExpertiseArgs = {
  id: Scalars['Int'];
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationCreateWorkExperienceArgs = {
  input: WorkExperienceInput;
};


export type MutationUpdateWorkExperienceArgs = {
  input: WorkExperienceInput;
  id: Scalars['Int'];
};


export type MutationDeleteWorkExperienceArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationRegisterIndividualArgs = {
  options: RegisterInput;
};


export type MutationRegisterMentorArgs = {
  token: Scalars['String'];
  options: RegisterInput;
};


export type MutationRegisterAdminArgs = {
  token: Scalars['String'];
  options: RegisterInput;
};


export type MutationAddAvatarArgs = {
  publicId: Scalars['String'];
  avatarUrl: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeKnownPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateIndividualInfoArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationUpdateAdminInfoArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationCreateEducationArgs = {
  input: EducationInput;
};


export type MutationUpdateEducationArgs = {
  id: Scalars['Int'];
  input: EducationInput;
};


export type MutationDeleteEducationArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCertificateArgs = {
  input: CertificateInput;
};


export type MutationUpdateCertificateArgs = {
  id: Scalars['Int'];
  input: CertificateInput;
};


export type MutationDeleteCertificateArgs = {
  id: Scalars['Int'];
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


export type MutationSetMottoArgs = {
  motto: Scalars['String'];
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


export type MutationCreateSessionRequestArgs = {
  input: SessionRequestInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationAddAvatarByAdminArgs = {
  mentorId: Scalars['Int'];
  publicId: Scalars['String'];
  avatarUrl: Scalars['String'];
};


export type MutationSetBioByMentorArgs = {
  bio: Scalars['String'];
  mentorId: Scalars['Int'];
};


export type MutationSetMentorDetailsByAdminArgs = {
  mentorId: Scalars['Int'];
  options: MentorDetailsInput;
};


export type MutationSetMottoByMentorArgs = {
  motto: Scalars['String'];
  mentorId: Scalars['Int'];
};


export type MutationDeleteExpertiseByAdminArgs = {
  expertiseId: Scalars['Int'];
};


export type MutationDeleteWorkExperienceByAdminArgs = {
  experienceId: Scalars['Int'];
};


export type MutationDeleteEducationByAdminArgs = {
  educationId: Scalars['Int'];
};


export type MutationDeleteCertificateByAdminArgs = {
  certificateId: Scalars['Int'];
};


export type MutationCreateCertificateByAdminArgs = {
  mentorId: Scalars['Int'];
  input: CertificateInput;
};


export type MutationCreateExpertiseByAdminArgs = {
  descriptionText: Scalars['String'];
  description: Scalars['String'];
  skillName: Scalars['String'];
  mentorId: Scalars['Int'];
};


export type MutationCreateWorkExperienceByAdminArgs = {
  mentorId: Scalars['Int'];
  input: WorkExperienceInput;
};


export type MutationCreateEducationByAdminArgs = {
  mentorId: Scalars['Int'];
  input: EducationInput;
};


export type MutationDeleteIndividualArgs = {
  individualId: Scalars['Int'];
};


export type MutationDeleteMentorArgs = {
  mentorId: Scalars['Int'];
};

export type GenerateUserResponse = {
  __typename?: 'GenerateUserResponse';
  errorMsg?: Maybe<Scalars['String']>;
  emailSent?: Maybe<Scalars['Boolean']>;
};

export type ExpertiseResponse = {
  __typename?: 'ExpertiseResponse';
  error?: Maybe<FieldError>;
  expertise?: Maybe<Expertise>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  errorMsg?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
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

export type WorkExperienceResponse = {
  __typename?: 'WorkExperienceResponse';
  error?: Maybe<FieldError>;
  workExperience?: Maybe<WorkExperience>;
};

export type WorkExperienceInput = {
  role: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  from: Scalars['DateTime'];
  untill: Scalars['DateTime'];
  industries: Array<Scalars['String']>;
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

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type UpdateIndividualInfoResponse = {
  __typename?: 'UpdateIndividualInfoResponse';
  errorMsg?: Maybe<Scalars['String']>;
  individual?: Maybe<Individual>;
};

export type UpdateAdminInfoResponse = {
  __typename?: 'UpdateAdminInfoResponse';
  errorMsg?: Maybe<Scalars['String']>;
  admin?: Maybe<Admin>;
};

export type EducationResponse = {
  __typename?: 'EducationResponse';
  errorMsg?: Maybe<Scalars['String']>;
  education?: Maybe<Education>;
};

export type EducationInput = {
  title: Scalars['String'];
  school: Scalars['String'];
  from: Scalars['String'];
  untill: Scalars['String'];
  description: Scalars['String'];
};

export type CertificateResponse = {
  __typename?: 'CertificateResponse';
  errorMsg?: Maybe<Scalars['String']>;
  certificate?: Maybe<Certificate>;
};

export type CertificateInput = {
  title: Scalars['String'];
  organization: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
};

export type MentorResponse = {
  __typename?: 'MentorResponse';
  errorMsg?: Maybe<Scalars['String']>;
  mentor?: Maybe<Mentor>;
};

export type MentorDetailsInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String'];
  rate: Scalars['String'];
  location: Scalars['String'];
  languages: Scalars['String'];
  availableTimeFrom: Scalars['DateTime'];
  availableTimeUntill: Scalars['DateTime'];
  availableDayFrom: Scalars['String'];
  availableDayUntill: Scalars['String'];
};

export type SocialLinksInput = {
  medium: Scalars['String'];
  linkedin: Scalars['String'];
  facebook: Scalars['String'];
  twitter: Scalars['String'];
  instagram: Scalars['String'];
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
};

export type DeleteEntityResponse = {
  __typename?: 'DeleteEntityResponse';
  errorMsg?: Maybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
};

export type CertificateFieldsFragment = (
  { __typename?: 'Certificate' }
  & Pick<Certificate, 'id' | 'title' | 'organization' | 'date' | 'description'>
);

export type EducationFieldsFragment = (
  { __typename?: 'Education' }
  & Pick<Education, 'id' | 'title' | 'school' | 'startDate' | 'endDate' | 'description'>
);

export type ExpertiseFragment = (
  { __typename?: 'Expertise' }
  & Pick<Expertise, 'id' | 'description' | 'descriptionText'>
  & { skill: (
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type MentorInfoFragment = (
  { __typename?: 'Mentor' }
  & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'bio' | 'motto' | 'rate' | 'profileComplete' | 'availableDayFrom' | 'availableDayUntill' | 'availableTimeFrom' | 'availableTimeUntill' | 'medium' | 'facebook' | 'linkedin' | 'twitter' | 'instagram'>
);

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

export type SkillFieldsFragment = (
  { __typename?: 'Skill' }
  & Pick<Skill, 'id' | 'name' | 'nameLowercase'>
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

export type GenerateAdminMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type GenerateAdminMutation = (
  { __typename?: 'Mutation' }
  & { generateAdmin: (
    { __typename?: 'GenerateUserResponse' }
    & Pick<GenerateUserResponse, 'errorMsg' | 'emailSent'>
  ) }
);

export type GenerateMentorMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type GenerateMentorMutation = (
  { __typename?: 'Mutation' }
  & { generateMentor: (
    { __typename?: 'GenerateUserResponse' }
    & Pick<GenerateUserResponse, 'errorMsg' | 'emailSent'>
  ) }
);

export type UpdateAdminInfoMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateAdminInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateAdminInfo: (
    { __typename?: 'UpdateAdminInfoResponse' }
    & Pick<UpdateAdminInfoResponse, 'errorMsg'>
    & { admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id'>
    )> }
  ) }
);

export type AddAvatarByAdminMutationVariables = Exact<{
  avatarUrl: Scalars['String'];
  publicId: Scalars['String'];
  mentorId: Scalars['Int'];
}>;


export type AddAvatarByAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addAvatarByAdmin'>
);

export type CreateCertificateByAdminMutationVariables = Exact<{
  input: CertificateInput;
  mentorId: Scalars['Int'];
}>;


export type CreateCertificateByAdminMutation = (
  { __typename?: 'Mutation' }
  & { createCertificateByAdmin: (
    { __typename?: 'CertificateResponse' }
    & Pick<CertificateResponse, 'errorMsg'>
    & { certificate?: Maybe<(
      { __typename?: 'Certificate' }
      & CertificateFieldsFragment
    )> }
  ) }
);

export type CreateEducationByAdminMutationVariables = Exact<{
  input: EducationInput;
  mentorId: Scalars['Int'];
}>;


export type CreateEducationByAdminMutation = (
  { __typename?: 'Mutation' }
  & { createEducationByAdmin: (
    { __typename?: 'EducationResponse' }
    & Pick<EducationResponse, 'errorMsg'>
    & { education?: Maybe<(
      { __typename?: 'Education' }
      & Pick<Education, 'id'>
    )> }
  ) }
);

export type CreateExpertiseByAdminMutationVariables = Exact<{
  description: Scalars['String'];
  descriptionText: Scalars['String'];
  skillName: Scalars['String'];
  mentorId: Scalars['Int'];
}>;


export type CreateExpertiseByAdminMutation = (
  { __typename?: 'Mutation' }
  & { createExpertiseByAdmin: (
    { __typename?: 'ExpertiseResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, expertise?: Maybe<(
      { __typename?: 'Expertise' }
      & Pick<Expertise, 'id'>
    )> }
  ) }
);

export type CreateWorkExperienceByAdminMutationVariables = Exact<{
  input: WorkExperienceInput;
  mentorId: Scalars['Int'];
}>;


export type CreateWorkExperienceByAdminMutation = (
  { __typename?: 'Mutation' }
  & { createWorkExperienceByAdmin: (
    { __typename?: 'WorkExperienceResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>, workExperience?: Maybe<(
      { __typename?: 'WorkExperience' }
      & Pick<WorkExperience, 'id' | 'role' | 'companyName'>
      & { industries?: Maybe<Array<(
        { __typename?: 'Industry' }
        & Pick<Industry, 'name'>
      )>> }
    )> }
  ) }
);

export type DeleteCertificateByAdminMutationVariables = Exact<{
  certificateId: Scalars['Int'];
}>;


export type DeleteCertificateByAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCertificateByAdmin'>
);

export type DeleteEducationByAdminMutationVariables = Exact<{
  educationId: Scalars['Int'];
}>;


export type DeleteEducationByAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEducationByAdmin'>
);

export type DeleteExpertiseByAdminMutationVariables = Exact<{
  expertiseId: Scalars['Int'];
}>;


export type DeleteExpertiseByAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteExpertiseByAdmin'>
);

export type DeleteWorkExperienceByAdminMutationVariables = Exact<{
  experienceId: Scalars['Int'];
}>;


export type DeleteWorkExperienceByAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkExperienceByAdmin'>
);

export type SetBioByMentorMutationVariables = Exact<{
  mentorId: Scalars['Int'];
  bio: Scalars['String'];
}>;


export type SetBioByMentorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setBioByMentor'>
);

export type SetMentorDetailsByAdminMutationVariables = Exact<{
  options: MentorDetailsInput;
  mentorId: Scalars['Int'];
}>;


export type SetMentorDetailsByAdminMutation = (
  { __typename?: 'Mutation' }
  & { setMentorDetailsByAdmin: (
    { __typename?: 'MentorResponse' }
    & Pick<MentorResponse, 'errorMsg'>
    & { mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'rate'>
    )> }
  ) }
);

export type SetMottoByMentorMutationVariables = Exact<{
  mentorId: Scalars['Int'];
  motto: Scalars['String'];
}>;


export type SetMottoByMentorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setMottoByMentor'>
);

export type RegisterAdminMutationVariables = Exact<{
  options: RegisterInput;
  token: Scalars['String'];
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

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
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

export type CreateCertificateMutationVariables = Exact<{
  input: CertificateInput;
}>;


export type CreateCertificateMutation = (
  { __typename?: 'Mutation' }
  & { createCertificate: (
    { __typename?: 'CertificateResponse' }
    & Pick<CertificateResponse, 'errorMsg'>
    & { certificate?: Maybe<(
      { __typename?: 'Certificate' }
      & CertificateFieldsFragment
    )> }
  ) }
);

export type DeleteCertificateMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCertificateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCertificate'>
);

export type UpdateCertificateMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CertificateInput;
}>;


export type UpdateCertificateMutation = (
  { __typename?: 'Mutation' }
  & { updateCertificate: (
    { __typename?: 'CertificateResponse' }
    & Pick<CertificateResponse, 'errorMsg'>
    & { certificate?: Maybe<(
      { __typename?: 'Certificate' }
      & CertificateFieldsFragment
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
  skillName: Scalars['String'];
  description: Scalars['String'];
  descriptionText: Scalars['String'];
}>;


export type CreateExpertiseMutation = (
  { __typename?: 'Mutation' }
  & { createExpertise: (
    { __typename?: 'ExpertiseResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>, expertise?: Maybe<(
      { __typename?: 'Expertise' }
      & Pick<Expertise, 'id' | 'description' | 'descriptionText'>
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

export type CreateEducationMutationVariables = Exact<{
  input: EducationInput;
}>;


export type CreateEducationMutation = (
  { __typename?: 'Mutation' }
  & { createEducation: (
    { __typename?: 'EducationResponse' }
    & Pick<EducationResponse, 'errorMsg'>
    & { education?: Maybe<(
      { __typename?: 'Education' }
      & Pick<Education, 'id'>
    )> }
  ) }
);

export type DeleteEducationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEducationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEducation'>
);

export type UpdateEducationMutationVariables = Exact<{
  id: Scalars['Int'];
  input: EducationInput;
}>;


export type UpdateEducationMutation = (
  { __typename?: 'Mutation' }
  & { updateEducation: (
    { __typename?: 'EducationResponse' }
    & Pick<EducationResponse, 'errorMsg'>
    & { education?: Maybe<(
      { __typename?: 'Education' }
      & EducationFieldsFragment
    )> }
  ) }
);

export type DeleteIndividualMutationVariables = Exact<{
  individualId: Scalars['Int'];
}>;


export type DeleteIndividualMutation = (
  { __typename?: 'Mutation' }
  & { deleteIndividual: (
    { __typename?: 'DeleteEntityResponse' }
    & Pick<DeleteEntityResponse, 'errorMsg' | 'deleted'>
  ) }
);

export type UpdateIndividualInfoMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateIndividualInfoMutation = (
  { __typename?: 'Mutation' }
  & { updateIndividualInfo: (
    { __typename?: 'UpdateIndividualInfoResponse' }
    & Pick<UpdateIndividualInfoResponse, 'errorMsg'>
    & { individual?: Maybe<(
      { __typename?: 'Individual' }
      & Pick<Individual, 'id'>
    )> }
  ) }
);

export type DeleteMentorMutationVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type DeleteMentorMutation = (
  { __typename?: 'Mutation' }
  & { deleteMentor: (
    { __typename?: 'DeleteEntityResponse' }
    & Pick<DeleteEntityResponse, 'errorMsg' | 'deleted'>
  ) }
);

export type SetMottoMutationVariables = Exact<{
  motto: Scalars['String'];
}>;


export type SetMottoMutation = (
  { __typename?: 'Mutation' }
  & { setMotto: (
    { __typename?: 'MentorResponse' }
    & Pick<MentorResponse, 'errorMsg'>
    & { mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id'>
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
    & Pick<MentorResponse, 'errorMsg'>
    & { mentor?: Maybe<(
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
    & Pick<MentorResponse, 'errorMsg'>
    & { mentor?: Maybe<(
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
    & Pick<MentorResponse, 'errorMsg'>
    & { mentor?: Maybe<(
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

export type ChangeKnownPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangeKnownPasswordMutation = (
  { __typename?: 'Mutation' }
  & { changeKnownPassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    )> }
  ) }
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type CreateWorkExperienceMutationVariables = Exact<{
  input: WorkExperienceInput;
}>;


export type CreateWorkExperienceMutation = (
  { __typename?: 'Mutation' }
  & { createWorkExperience: (
    { __typename?: 'WorkExperienceResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>, workExperience?: Maybe<(
      { __typename?: 'WorkExperience' }
      & Pick<WorkExperience, 'id' | 'role' | 'companyName'>
      & { industries?: Maybe<Array<(
        { __typename?: 'Industry' }
        & Pick<Industry, 'name'>
      )>> }
    )> }
  ) }
);

export type DeleteWorkExperienceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteWorkExperienceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkExperience'>
);

export type UpdateWorkExperienceMutationVariables = Exact<{
  id: Scalars['Int'];
  input: WorkExperienceInput;
}>;


export type UpdateWorkExperienceMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkExperience: (
    { __typename?: 'WorkExperienceResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>, workExperience?: Maybe<(
      { __typename?: 'WorkExperience' }
      & Pick<WorkExperience, 'id' | 'role'>
    )> }
  ) }
);

export type GetAvatarQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type GetAvatarQuery = (
  { __typename?: 'Query' }
  & { getAvatar: (
    { __typename?: 'GetResponse' }
    & Pick<GetResponse, 'result'>
  ) }
);

export type GetBioQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type GetBioQuery = (
  { __typename?: 'Query' }
  & { getBio: (
    { __typename?: 'GetResponse' }
    & Pick<GetResponse, 'result'>
  ) }
);

export type GetMentorInfoQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type GetMentorInfoQuery = (
  { __typename?: 'Query' }
  & { getMentorInfo: (
    { __typename?: 'Temp' }
    & Pick<Temp, 'errorMsg'>
    & { mentor?: Maybe<(
      { __typename?: 'Mentor' }
      & Pick<Mentor, 'id' | 'firstName' | 'lastName' | 'title' | 'location' | 'languages' | 'rate'>
    )> }
  ) }
);

export type GetMottoQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type GetMottoQuery = (
  { __typename?: 'Query' }
  & { getMotto: (
    { __typename?: 'GetResponse' }
    & Pick<GetResponse, 'result'>
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

export type CertificatesQueryVariables = Exact<{
  mentorId?: Maybe<Scalars['Int']>;
}>;


export type CertificatesQuery = (
  { __typename?: 'Query' }
  & { certificates: (
    { __typename?: 'CertificatesResponse' }
    & Pick<CertificatesResponse, 'errorMsg'>
    & { data?: Maybe<Array<(
      { __typename?: 'Certificate' }
      & CertificateFieldsFragment
    )>> }
  ) }
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

export type EducationsQueryVariables = Exact<{
  mentorId?: Maybe<Scalars['Int']>;
}>;


export type EducationsQuery = (
  { __typename?: 'Query' }
  & { educations: (
    { __typename?: 'EducationsResponse' }
    & Pick<EducationsResponse, 'errorMsg'>
    & { data?: Maybe<Array<(
      { __typename?: 'Education' }
      & EducationFieldsFragment
    )>> }
  ) }
);

export type ExpertisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpertisesQuery = (
  { __typename?: 'Query' }
  & { expertises: Array<(
    { __typename?: 'Expertise' }
    & ExpertiseFragment
  )> }
);

export type ExpertisesByIdQueryVariables = Exact<{
  mentorId: Scalars['Int'];
}>;


export type ExpertisesByIdQuery = (
  { __typename?: 'Query' }
  & { expertisesById: Array<(
    { __typename?: 'Expertise' }
    & ExpertiseFragment
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

export type IndividualQueryVariables = Exact<{
  individualId: Scalars['Int'];
}>;


export type IndividualQuery = (
  { __typename?: 'Query' }
  & { individual: (
    { __typename?: 'Individual' }
    & Pick<Individual, 'id' | 'firstName' | 'lastName'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'email' | 'avatar'>
    ) }
  ) }
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
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'avatar'>
      ) }
      & MentorInfoFragment
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
      & MentorInfoFragment
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
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'email' | 'avatar'>
      ) }
      & MentorInfoFragment
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
      & MentorInfoFragment
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

export type IndividualRequestByIdQueryVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type IndividualRequestByIdQuery = (
  { __typename?: 'Query' }
  & { individualRequestById: (
    { __typename?: 'SessionRequestResponse' }
    & Pick<SessionRequestResponse, 'errorMsg'>
    & { data?: Maybe<(
      { __typename?: 'SessionRequest' }
      & Pick<SessionRequest, 'id' | 'objective' | 'headline' | 'communicationTool' | 'communicationToolId' | 'email' | 'status' | 'ammount' | 'message' | 'createdAt'>
      & { mentor: (
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'id' | 'firstName' | 'lastName'>
        & { user: (
          { __typename?: 'Users' }
          & Pick<Users, 'avatar'>
        ) }
      ) }
    )> }
  ) }
);

export type IndividualRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type IndividualRequestsQuery = (
  { __typename?: 'Query' }
  & { individualRequests: (
    { __typename?: 'SessionRequestsResponse' }
    & Pick<SessionRequestsResponse, 'errorMsg'>
    & { data?: Maybe<Array<(
      { __typename?: 'SessionRequest' }
      & Pick<SessionRequest, 'id' | 'objective' | 'headline' | 'communicationTool' | 'communicationToolId' | 'email' | 'message' | 'status' | 'ammount' | 'createdAt'>
      & { mentor: (
        { __typename?: 'Mentor' }
        & Pick<Mentor, 'id' | 'firstName' | 'lastName'>
        & { user: (
          { __typename?: 'Users' }
          & Pick<Users, 'avatar'>
        ) }
      ) }
    )>> }
  ) }
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
      & Pick<SessionRequestByIdData, 'ammount' | 'status' | 'date' | 'message'>
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
    & SkillFieldsFragment
  )> }
);

export type WorkExperiencesQueryVariables = Exact<{
  mentorId?: Maybe<Scalars['Int']>;
}>;


export type WorkExperiencesQuery = (
  { __typename?: 'Query' }
  & { workExperiences: (
    { __typename?: 'WorkExperiencesResponse' }
    & Pick<WorkExperiencesResponse, 'errorMsg'>
    & { data?: Maybe<Array<(
      { __typename?: 'WorkExperience' }
      & Pick<WorkExperience, 'id' | 'role' | 'companyName' | 'from' | 'untill' | 'createdAt' | 'updatedAt' | 'description'>
      & { industries?: Maybe<Array<(
        { __typename?: 'Industry' }
        & Pick<Industry, 'name'>
      )>> }
    )>> }
  ) }
);

export const CertificateFieldsFragmentDoc = gql`
    fragment CertificateFields on Certificate {
  id
  title
  organization
  date
  description
}
    `;
export const EducationFieldsFragmentDoc = gql`
    fragment EducationFields on Education {
  id
  title
  school
  startDate
  endDate
  description
}
    `;
export const ExpertiseFragmentDoc = gql`
    fragment Expertise on Expertise {
  id
  description
  descriptionText
  skill {
    id
    name
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const MentorInfoFragmentDoc = gql`
    fragment MentorInfo on Mentor {
  id
  firstName
  lastName
  title
  location
  languages
  bio
  motto
  rate
  profileComplete
  availableDayFrom
  availableDayUntill
  availableTimeFrom
  availableTimeUntill
  medium
  facebook
  linkedin
  twitter
  instagram
}
    `;
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
export const SkillFieldsFragmentDoc = gql`
    fragment SkillFields on Skill {
  id
  name
  nameLowercase
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
export const GenerateAdminDocument = gql`
    mutation GenerateAdmin($email: String!) {
  generateAdmin(email: $email) {
    errorMsg
    emailSent
  }
}
    `;
export type GenerateAdminMutationFn = Apollo.MutationFunction<GenerateAdminMutation, GenerateAdminMutationVariables>;

/**
 * __useGenerateAdminMutation__
 *
 * To run a mutation, you first call `useGenerateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAdminMutation, { data, loading, error }] = useGenerateAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGenerateAdminMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAdminMutation, GenerateAdminMutationVariables>) {
        return Apollo.useMutation<GenerateAdminMutation, GenerateAdminMutationVariables>(GenerateAdminDocument, baseOptions);
      }
export type GenerateAdminMutationHookResult = ReturnType<typeof useGenerateAdminMutation>;
export type GenerateAdminMutationResult = Apollo.MutationResult<GenerateAdminMutation>;
export type GenerateAdminMutationOptions = Apollo.BaseMutationOptions<GenerateAdminMutation, GenerateAdminMutationVariables>;
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
export const UpdateAdminInfoDocument = gql`
    mutation UpdateAdminInfo($firstName: String!, $lastName: String!) {
  updateAdminInfo(firstName: $firstName, lastName: $lastName) {
    errorMsg
    admin {
      id
    }
  }
}
    `;
export type UpdateAdminInfoMutationFn = Apollo.MutationFunction<UpdateAdminInfoMutation, UpdateAdminInfoMutationVariables>;

/**
 * __useUpdateAdminInfoMutation__
 *
 * To run a mutation, you first call `useUpdateAdminInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdminInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdminInfoMutation, { data, loading, error }] = useUpdateAdminInfoMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateAdminInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdminInfoMutation, UpdateAdminInfoMutationVariables>) {
        return Apollo.useMutation<UpdateAdminInfoMutation, UpdateAdminInfoMutationVariables>(UpdateAdminInfoDocument, baseOptions);
      }
export type UpdateAdminInfoMutationHookResult = ReturnType<typeof useUpdateAdminInfoMutation>;
export type UpdateAdminInfoMutationResult = Apollo.MutationResult<UpdateAdminInfoMutation>;
export type UpdateAdminInfoMutationOptions = Apollo.BaseMutationOptions<UpdateAdminInfoMutation, UpdateAdminInfoMutationVariables>;
export const AddAvatarByAdminDocument = gql`
    mutation AddAvatarByAdmin($avatarUrl: String!, $publicId: String!, $mentorId: Int!) {
  addAvatarByAdmin(avatarUrl: $avatarUrl, publicId: $publicId, mentorId: $mentorId)
}
    `;
export type AddAvatarByAdminMutationFn = Apollo.MutationFunction<AddAvatarByAdminMutation, AddAvatarByAdminMutationVariables>;

/**
 * __useAddAvatarByAdminMutation__
 *
 * To run a mutation, you first call `useAddAvatarByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAvatarByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAvatarByAdminMutation, { data, loading, error }] = useAddAvatarByAdminMutation({
 *   variables: {
 *      avatarUrl: // value for 'avatarUrl'
 *      publicId: // value for 'publicId'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useAddAvatarByAdminMutation(baseOptions?: Apollo.MutationHookOptions<AddAvatarByAdminMutation, AddAvatarByAdminMutationVariables>) {
        return Apollo.useMutation<AddAvatarByAdminMutation, AddAvatarByAdminMutationVariables>(AddAvatarByAdminDocument, baseOptions);
      }
export type AddAvatarByAdminMutationHookResult = ReturnType<typeof useAddAvatarByAdminMutation>;
export type AddAvatarByAdminMutationResult = Apollo.MutationResult<AddAvatarByAdminMutation>;
export type AddAvatarByAdminMutationOptions = Apollo.BaseMutationOptions<AddAvatarByAdminMutation, AddAvatarByAdminMutationVariables>;
export const CreateCertificateByAdminDocument = gql`
    mutation CreateCertificateByAdmin($input: CertificateInput!, $mentorId: Int!) {
  createCertificateByAdmin(input: $input, mentorId: $mentorId) {
    errorMsg
    certificate {
      ...CertificateFields
    }
  }
}
    ${CertificateFieldsFragmentDoc}`;
export type CreateCertificateByAdminMutationFn = Apollo.MutationFunction<CreateCertificateByAdminMutation, CreateCertificateByAdminMutationVariables>;

/**
 * __useCreateCertificateByAdminMutation__
 *
 * To run a mutation, you first call `useCreateCertificateByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCertificateByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCertificateByAdminMutation, { data, loading, error }] = useCreateCertificateByAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useCreateCertificateByAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateCertificateByAdminMutation, CreateCertificateByAdminMutationVariables>) {
        return Apollo.useMutation<CreateCertificateByAdminMutation, CreateCertificateByAdminMutationVariables>(CreateCertificateByAdminDocument, baseOptions);
      }
export type CreateCertificateByAdminMutationHookResult = ReturnType<typeof useCreateCertificateByAdminMutation>;
export type CreateCertificateByAdminMutationResult = Apollo.MutationResult<CreateCertificateByAdminMutation>;
export type CreateCertificateByAdminMutationOptions = Apollo.BaseMutationOptions<CreateCertificateByAdminMutation, CreateCertificateByAdminMutationVariables>;
export const CreateEducationByAdminDocument = gql`
    mutation CreateEducationByAdmin($input: EducationInput!, $mentorId: Int!) {
  createEducationByAdmin(input: $input, mentorId: $mentorId) {
    errorMsg
    education {
      id
    }
  }
}
    `;
export type CreateEducationByAdminMutationFn = Apollo.MutationFunction<CreateEducationByAdminMutation, CreateEducationByAdminMutationVariables>;

/**
 * __useCreateEducationByAdminMutation__
 *
 * To run a mutation, you first call `useCreateEducationByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationByAdminMutation, { data, loading, error }] = useCreateEducationByAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useCreateEducationByAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationByAdminMutation, CreateEducationByAdminMutationVariables>) {
        return Apollo.useMutation<CreateEducationByAdminMutation, CreateEducationByAdminMutationVariables>(CreateEducationByAdminDocument, baseOptions);
      }
export type CreateEducationByAdminMutationHookResult = ReturnType<typeof useCreateEducationByAdminMutation>;
export type CreateEducationByAdminMutationResult = Apollo.MutationResult<CreateEducationByAdminMutation>;
export type CreateEducationByAdminMutationOptions = Apollo.BaseMutationOptions<CreateEducationByAdminMutation, CreateEducationByAdminMutationVariables>;
export const CreateExpertiseByAdminDocument = gql`
    mutation CreateExpertiseByAdmin($description: String!, $descriptionText: String!, $skillName: String!, $mentorId: Int!) {
  createExpertiseByAdmin(description: $description, descriptionText: $descriptionText, skillName: $skillName, mentorId: $mentorId) {
    error {
      field
      message
    }
    expertise {
      id
    }
  }
}
    `;
export type CreateExpertiseByAdminMutationFn = Apollo.MutationFunction<CreateExpertiseByAdminMutation, CreateExpertiseByAdminMutationVariables>;

/**
 * __useCreateExpertiseByAdminMutation__
 *
 * To run a mutation, you first call `useCreateExpertiseByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpertiseByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpertiseByAdminMutation, { data, loading, error }] = useCreateExpertiseByAdminMutation({
 *   variables: {
 *      description: // value for 'description'
 *      descriptionText: // value for 'descriptionText'
 *      skillName: // value for 'skillName'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useCreateExpertiseByAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpertiseByAdminMutation, CreateExpertiseByAdminMutationVariables>) {
        return Apollo.useMutation<CreateExpertiseByAdminMutation, CreateExpertiseByAdminMutationVariables>(CreateExpertiseByAdminDocument, baseOptions);
      }
export type CreateExpertiseByAdminMutationHookResult = ReturnType<typeof useCreateExpertiseByAdminMutation>;
export type CreateExpertiseByAdminMutationResult = Apollo.MutationResult<CreateExpertiseByAdminMutation>;
export type CreateExpertiseByAdminMutationOptions = Apollo.BaseMutationOptions<CreateExpertiseByAdminMutation, CreateExpertiseByAdminMutationVariables>;
export const CreateWorkExperienceByAdminDocument = gql`
    mutation CreateWorkExperienceByAdmin($input: WorkExperienceInput!, $mentorId: Int!) {
  createWorkExperienceByAdmin(input: $input, mentorId: $mentorId) {
    error {
      ...RegularError
    }
    workExperience {
      id
      role
      companyName
      industries {
        name
      }
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type CreateWorkExperienceByAdminMutationFn = Apollo.MutationFunction<CreateWorkExperienceByAdminMutation, CreateWorkExperienceByAdminMutationVariables>;

/**
 * __useCreateWorkExperienceByAdminMutation__
 *
 * To run a mutation, you first call `useCreateWorkExperienceByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkExperienceByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkExperienceByAdminMutation, { data, loading, error }] = useCreateWorkExperienceByAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useCreateWorkExperienceByAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkExperienceByAdminMutation, CreateWorkExperienceByAdminMutationVariables>) {
        return Apollo.useMutation<CreateWorkExperienceByAdminMutation, CreateWorkExperienceByAdminMutationVariables>(CreateWorkExperienceByAdminDocument, baseOptions);
      }
export type CreateWorkExperienceByAdminMutationHookResult = ReturnType<typeof useCreateWorkExperienceByAdminMutation>;
export type CreateWorkExperienceByAdminMutationResult = Apollo.MutationResult<CreateWorkExperienceByAdminMutation>;
export type CreateWorkExperienceByAdminMutationOptions = Apollo.BaseMutationOptions<CreateWorkExperienceByAdminMutation, CreateWorkExperienceByAdminMutationVariables>;
export const DeleteCertificateByAdminDocument = gql`
    mutation DeleteCertificateByAdmin($certificateId: Int!) {
  deleteCertificateByAdmin(certificateId: $certificateId)
}
    `;
export type DeleteCertificateByAdminMutationFn = Apollo.MutationFunction<DeleteCertificateByAdminMutation, DeleteCertificateByAdminMutationVariables>;

/**
 * __useDeleteCertificateByAdminMutation__
 *
 * To run a mutation, you first call `useDeleteCertificateByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCertificateByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCertificateByAdminMutation, { data, loading, error }] = useDeleteCertificateByAdminMutation({
 *   variables: {
 *      certificateId: // value for 'certificateId'
 *   },
 * });
 */
export function useDeleteCertificateByAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCertificateByAdminMutation, DeleteCertificateByAdminMutationVariables>) {
        return Apollo.useMutation<DeleteCertificateByAdminMutation, DeleteCertificateByAdminMutationVariables>(DeleteCertificateByAdminDocument, baseOptions);
      }
export type DeleteCertificateByAdminMutationHookResult = ReturnType<typeof useDeleteCertificateByAdminMutation>;
export type DeleteCertificateByAdminMutationResult = Apollo.MutationResult<DeleteCertificateByAdminMutation>;
export type DeleteCertificateByAdminMutationOptions = Apollo.BaseMutationOptions<DeleteCertificateByAdminMutation, DeleteCertificateByAdminMutationVariables>;
export const DeleteEducationByAdminDocument = gql`
    mutation DeleteEducationByAdmin($educationId: Int!) {
  deleteEducationByAdmin(educationId: $educationId)
}
    `;
export type DeleteEducationByAdminMutationFn = Apollo.MutationFunction<DeleteEducationByAdminMutation, DeleteEducationByAdminMutationVariables>;

/**
 * __useDeleteEducationByAdminMutation__
 *
 * To run a mutation, you first call `useDeleteEducationByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEducationByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEducationByAdminMutation, { data, loading, error }] = useDeleteEducationByAdminMutation({
 *   variables: {
 *      educationId: // value for 'educationId'
 *   },
 * });
 */
export function useDeleteEducationByAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEducationByAdminMutation, DeleteEducationByAdminMutationVariables>) {
        return Apollo.useMutation<DeleteEducationByAdminMutation, DeleteEducationByAdminMutationVariables>(DeleteEducationByAdminDocument, baseOptions);
      }
export type DeleteEducationByAdminMutationHookResult = ReturnType<typeof useDeleteEducationByAdminMutation>;
export type DeleteEducationByAdminMutationResult = Apollo.MutationResult<DeleteEducationByAdminMutation>;
export type DeleteEducationByAdminMutationOptions = Apollo.BaseMutationOptions<DeleteEducationByAdminMutation, DeleteEducationByAdminMutationVariables>;
export const DeleteExpertiseByAdminDocument = gql`
    mutation DeleteExpertiseByAdmin($expertiseId: Int!) {
  deleteExpertiseByAdmin(expertiseId: $expertiseId)
}
    `;
export type DeleteExpertiseByAdminMutationFn = Apollo.MutationFunction<DeleteExpertiseByAdminMutation, DeleteExpertiseByAdminMutationVariables>;

/**
 * __useDeleteExpertiseByAdminMutation__
 *
 * To run a mutation, you first call `useDeleteExpertiseByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpertiseByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpertiseByAdminMutation, { data, loading, error }] = useDeleteExpertiseByAdminMutation({
 *   variables: {
 *      expertiseId: // value for 'expertiseId'
 *   },
 * });
 */
export function useDeleteExpertiseByAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpertiseByAdminMutation, DeleteExpertiseByAdminMutationVariables>) {
        return Apollo.useMutation<DeleteExpertiseByAdminMutation, DeleteExpertiseByAdminMutationVariables>(DeleteExpertiseByAdminDocument, baseOptions);
      }
export type DeleteExpertiseByAdminMutationHookResult = ReturnType<typeof useDeleteExpertiseByAdminMutation>;
export type DeleteExpertiseByAdminMutationResult = Apollo.MutationResult<DeleteExpertiseByAdminMutation>;
export type DeleteExpertiseByAdminMutationOptions = Apollo.BaseMutationOptions<DeleteExpertiseByAdminMutation, DeleteExpertiseByAdminMutationVariables>;
export const DeleteWorkExperienceByAdminDocument = gql`
    mutation DeleteWorkExperienceByAdmin($experienceId: Int!) {
  deleteWorkExperienceByAdmin(experienceId: $experienceId)
}
    `;
export type DeleteWorkExperienceByAdminMutationFn = Apollo.MutationFunction<DeleteWorkExperienceByAdminMutation, DeleteWorkExperienceByAdminMutationVariables>;

/**
 * __useDeleteWorkExperienceByAdminMutation__
 *
 * To run a mutation, you first call `useDeleteWorkExperienceByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkExperienceByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkExperienceByAdminMutation, { data, loading, error }] = useDeleteWorkExperienceByAdminMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *   },
 * });
 */
export function useDeleteWorkExperienceByAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkExperienceByAdminMutation, DeleteWorkExperienceByAdminMutationVariables>) {
        return Apollo.useMutation<DeleteWorkExperienceByAdminMutation, DeleteWorkExperienceByAdminMutationVariables>(DeleteWorkExperienceByAdminDocument, baseOptions);
      }
export type DeleteWorkExperienceByAdminMutationHookResult = ReturnType<typeof useDeleteWorkExperienceByAdminMutation>;
export type DeleteWorkExperienceByAdminMutationResult = Apollo.MutationResult<DeleteWorkExperienceByAdminMutation>;
export type DeleteWorkExperienceByAdminMutationOptions = Apollo.BaseMutationOptions<DeleteWorkExperienceByAdminMutation, DeleteWorkExperienceByAdminMutationVariables>;
export const SetBioByMentorDocument = gql`
    mutation SetBioByMentor($mentorId: Int!, $bio: String!) {
  setBioByMentor(mentorId: $mentorId, bio: $bio)
}
    `;
export type SetBioByMentorMutationFn = Apollo.MutationFunction<SetBioByMentorMutation, SetBioByMentorMutationVariables>;

/**
 * __useSetBioByMentorMutation__
 *
 * To run a mutation, you first call `useSetBioByMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetBioByMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBioByMentorMutation, { data, loading, error }] = useSetBioByMentorMutation({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useSetBioByMentorMutation(baseOptions?: Apollo.MutationHookOptions<SetBioByMentorMutation, SetBioByMentorMutationVariables>) {
        return Apollo.useMutation<SetBioByMentorMutation, SetBioByMentorMutationVariables>(SetBioByMentorDocument, baseOptions);
      }
export type SetBioByMentorMutationHookResult = ReturnType<typeof useSetBioByMentorMutation>;
export type SetBioByMentorMutationResult = Apollo.MutationResult<SetBioByMentorMutation>;
export type SetBioByMentorMutationOptions = Apollo.BaseMutationOptions<SetBioByMentorMutation, SetBioByMentorMutationVariables>;
export const SetMentorDetailsByAdminDocument = gql`
    mutation SetMentorDetailsByAdmin($options: MentorDetailsInput!, $mentorId: Int!) {
  setMentorDetailsByAdmin(options: $options, mentorId: $mentorId) {
    errorMsg
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
export type SetMentorDetailsByAdminMutationFn = Apollo.MutationFunction<SetMentorDetailsByAdminMutation, SetMentorDetailsByAdminMutationVariables>;

/**
 * __useSetMentorDetailsByAdminMutation__
 *
 * To run a mutation, you first call `useSetMentorDetailsByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMentorDetailsByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMentorDetailsByAdminMutation, { data, loading, error }] = useSetMentorDetailsByAdminMutation({
 *   variables: {
 *      options: // value for 'options'
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useSetMentorDetailsByAdminMutation(baseOptions?: Apollo.MutationHookOptions<SetMentorDetailsByAdminMutation, SetMentorDetailsByAdminMutationVariables>) {
        return Apollo.useMutation<SetMentorDetailsByAdminMutation, SetMentorDetailsByAdminMutationVariables>(SetMentorDetailsByAdminDocument, baseOptions);
      }
export type SetMentorDetailsByAdminMutationHookResult = ReturnType<typeof useSetMentorDetailsByAdminMutation>;
export type SetMentorDetailsByAdminMutationResult = Apollo.MutationResult<SetMentorDetailsByAdminMutation>;
export type SetMentorDetailsByAdminMutationOptions = Apollo.BaseMutationOptions<SetMentorDetailsByAdminMutation, SetMentorDetailsByAdminMutationVariables>;
export const SetMottoByMentorDocument = gql`
    mutation SetMottoByMentor($mentorId: Int!, $motto: String!) {
  setMottoByMentor(mentorId: $mentorId, motto: $motto)
}
    `;
export type SetMottoByMentorMutationFn = Apollo.MutationFunction<SetMottoByMentorMutation, SetMottoByMentorMutationVariables>;

/**
 * __useSetMottoByMentorMutation__
 *
 * To run a mutation, you first call `useSetMottoByMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMottoByMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMottoByMentorMutation, { data, loading, error }] = useSetMottoByMentorMutation({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *      motto: // value for 'motto'
 *   },
 * });
 */
export function useSetMottoByMentorMutation(baseOptions?: Apollo.MutationHookOptions<SetMottoByMentorMutation, SetMottoByMentorMutationVariables>) {
        return Apollo.useMutation<SetMottoByMentorMutation, SetMottoByMentorMutationVariables>(SetMottoByMentorDocument, baseOptions);
      }
export type SetMottoByMentorMutationHookResult = ReturnType<typeof useSetMottoByMentorMutation>;
export type SetMottoByMentorMutationResult = Apollo.MutationResult<SetMottoByMentorMutation>;
export type SetMottoByMentorMutationOptions = Apollo.BaseMutationOptions<SetMottoByMentorMutation, SetMottoByMentorMutationVariables>;
export const RegisterAdminDocument = gql`
    mutation RegisterAdmin($options: RegisterInput!, $token: String!) {
  registerAdmin(options: $options, token: $token) {
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
 *      token: // value for 'token'
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
export const CreateCertificateDocument = gql`
    mutation CreateCertificate($input: CertificateInput!) {
  createCertificate(input: $input) {
    errorMsg
    certificate {
      ...CertificateFields
    }
  }
}
    ${CertificateFieldsFragmentDoc}`;
export type CreateCertificateMutationFn = Apollo.MutationFunction<CreateCertificateMutation, CreateCertificateMutationVariables>;

/**
 * __useCreateCertificateMutation__
 *
 * To run a mutation, you first call `useCreateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCertificateMutation, { data, loading, error }] = useCreateCertificateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCertificateMutation(baseOptions?: Apollo.MutationHookOptions<CreateCertificateMutation, CreateCertificateMutationVariables>) {
        return Apollo.useMutation<CreateCertificateMutation, CreateCertificateMutationVariables>(CreateCertificateDocument, baseOptions);
      }
export type CreateCertificateMutationHookResult = ReturnType<typeof useCreateCertificateMutation>;
export type CreateCertificateMutationResult = Apollo.MutationResult<CreateCertificateMutation>;
export type CreateCertificateMutationOptions = Apollo.BaseMutationOptions<CreateCertificateMutation, CreateCertificateMutationVariables>;
export const DeleteCertificateDocument = gql`
    mutation DeleteCertificate($id: Int!) {
  deleteCertificate(id: $id)
}
    `;
export type DeleteCertificateMutationFn = Apollo.MutationFunction<DeleteCertificateMutation, DeleteCertificateMutationVariables>;

/**
 * __useDeleteCertificateMutation__
 *
 * To run a mutation, you first call `useDeleteCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCertificateMutation, { data, loading, error }] = useDeleteCertificateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCertificateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCertificateMutation, DeleteCertificateMutationVariables>) {
        return Apollo.useMutation<DeleteCertificateMutation, DeleteCertificateMutationVariables>(DeleteCertificateDocument, baseOptions);
      }
export type DeleteCertificateMutationHookResult = ReturnType<typeof useDeleteCertificateMutation>;
export type DeleteCertificateMutationResult = Apollo.MutationResult<DeleteCertificateMutation>;
export type DeleteCertificateMutationOptions = Apollo.BaseMutationOptions<DeleteCertificateMutation, DeleteCertificateMutationVariables>;
export const UpdateCertificateDocument = gql`
    mutation UpdateCertificate($id: Int!, $input: CertificateInput!) {
  updateCertificate(id: $id, input: $input) {
    errorMsg
    certificate {
      ...CertificateFields
    }
  }
}
    ${CertificateFieldsFragmentDoc}`;
export type UpdateCertificateMutationFn = Apollo.MutationFunction<UpdateCertificateMutation, UpdateCertificateMutationVariables>;

/**
 * __useUpdateCertificateMutation__
 *
 * To run a mutation, you first call `useUpdateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCertificateMutation, { data, loading, error }] = useUpdateCertificateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCertificateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCertificateMutation, UpdateCertificateMutationVariables>) {
        return Apollo.useMutation<UpdateCertificateMutation, UpdateCertificateMutationVariables>(UpdateCertificateDocument, baseOptions);
      }
export type UpdateCertificateMutationHookResult = ReturnType<typeof useUpdateCertificateMutation>;
export type UpdateCertificateMutationResult = Apollo.MutationResult<UpdateCertificateMutation>;
export type UpdateCertificateMutationOptions = Apollo.BaseMutationOptions<UpdateCertificateMutation, UpdateCertificateMutationVariables>;
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
    mutation CreateExpertise($skillName: String!, $description: String!, $descriptionText: String!) {
  createExpertise(skillName: $skillName, description: $description, descriptionText: $descriptionText) {
    error {
      ...RegularError
    }
    expertise {
      id
      description
      descriptionText
    }
  }
}
    ${RegularErrorFragmentDoc}`;
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
 *      skillName: // value for 'skillName'
 *      description: // value for 'description'
 *      descriptionText: // value for 'descriptionText'
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
export const CreateEducationDocument = gql`
    mutation CreateEducation($input: EducationInput!) {
  createEducation(input: $input) {
    errorMsg
    education {
      id
    }
  }
}
    `;
export type CreateEducationMutationFn = Apollo.MutationFunction<CreateEducationMutation, CreateEducationMutationVariables>;

/**
 * __useCreateEducationMutation__
 *
 * To run a mutation, you first call `useCreateEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationMutation, { data, loading, error }] = useCreateEducationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEducationMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationMutation, CreateEducationMutationVariables>) {
        return Apollo.useMutation<CreateEducationMutation, CreateEducationMutationVariables>(CreateEducationDocument, baseOptions);
      }
export type CreateEducationMutationHookResult = ReturnType<typeof useCreateEducationMutation>;
export type CreateEducationMutationResult = Apollo.MutationResult<CreateEducationMutation>;
export type CreateEducationMutationOptions = Apollo.BaseMutationOptions<CreateEducationMutation, CreateEducationMutationVariables>;
export const DeleteEducationDocument = gql`
    mutation DeleteEducation($id: Int!) {
  deleteEducation(id: $id)
}
    `;
export type DeleteEducationMutationFn = Apollo.MutationFunction<DeleteEducationMutation, DeleteEducationMutationVariables>;

/**
 * __useDeleteEducationMutation__
 *
 * To run a mutation, you first call `useDeleteEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEducationMutation, { data, loading, error }] = useDeleteEducationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEducationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEducationMutation, DeleteEducationMutationVariables>) {
        return Apollo.useMutation<DeleteEducationMutation, DeleteEducationMutationVariables>(DeleteEducationDocument, baseOptions);
      }
export type DeleteEducationMutationHookResult = ReturnType<typeof useDeleteEducationMutation>;
export type DeleteEducationMutationResult = Apollo.MutationResult<DeleteEducationMutation>;
export type DeleteEducationMutationOptions = Apollo.BaseMutationOptions<DeleteEducationMutation, DeleteEducationMutationVariables>;
export const UpdateEducationDocument = gql`
    mutation UpdateEducation($id: Int!, $input: EducationInput!) {
  updateEducation(id: $id, input: $input) {
    errorMsg
    education {
      ...EducationFields
    }
  }
}
    ${EducationFieldsFragmentDoc}`;
export type UpdateEducationMutationFn = Apollo.MutationFunction<UpdateEducationMutation, UpdateEducationMutationVariables>;

/**
 * __useUpdateEducationMutation__
 *
 * To run a mutation, you first call `useUpdateEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationMutation, { data, loading, error }] = useUpdateEducationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEducationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationMutation, UpdateEducationMutationVariables>) {
        return Apollo.useMutation<UpdateEducationMutation, UpdateEducationMutationVariables>(UpdateEducationDocument, baseOptions);
      }
export type UpdateEducationMutationHookResult = ReturnType<typeof useUpdateEducationMutation>;
export type UpdateEducationMutationResult = Apollo.MutationResult<UpdateEducationMutation>;
export type UpdateEducationMutationOptions = Apollo.BaseMutationOptions<UpdateEducationMutation, UpdateEducationMutationVariables>;
export const DeleteIndividualDocument = gql`
    mutation DeleteIndividual($individualId: Int!) {
  deleteIndividual(individualId: $individualId) {
    errorMsg
    deleted
  }
}
    `;
export type DeleteIndividualMutationFn = Apollo.MutationFunction<DeleteIndividualMutation, DeleteIndividualMutationVariables>;

/**
 * __useDeleteIndividualMutation__
 *
 * To run a mutation, you first call `useDeleteIndividualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIndividualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIndividualMutation, { data, loading, error }] = useDeleteIndividualMutation({
 *   variables: {
 *      individualId: // value for 'individualId'
 *   },
 * });
 */
export function useDeleteIndividualMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIndividualMutation, DeleteIndividualMutationVariables>) {
        return Apollo.useMutation<DeleteIndividualMutation, DeleteIndividualMutationVariables>(DeleteIndividualDocument, baseOptions);
      }
export type DeleteIndividualMutationHookResult = ReturnType<typeof useDeleteIndividualMutation>;
export type DeleteIndividualMutationResult = Apollo.MutationResult<DeleteIndividualMutation>;
export type DeleteIndividualMutationOptions = Apollo.BaseMutationOptions<DeleteIndividualMutation, DeleteIndividualMutationVariables>;
export const UpdateIndividualInfoDocument = gql`
    mutation UpdateIndividualInfo($firstName: String!, $lastName: String!) {
  updateIndividualInfo(firstName: $firstName, lastName: $lastName) {
    errorMsg
    individual {
      id
    }
  }
}
    `;
export type UpdateIndividualInfoMutationFn = Apollo.MutationFunction<UpdateIndividualInfoMutation, UpdateIndividualInfoMutationVariables>;

/**
 * __useUpdateIndividualInfoMutation__
 *
 * To run a mutation, you first call `useUpdateIndividualInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIndividualInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIndividualInfoMutation, { data, loading, error }] = useUpdateIndividualInfoMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateIndividualInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIndividualInfoMutation, UpdateIndividualInfoMutationVariables>) {
        return Apollo.useMutation<UpdateIndividualInfoMutation, UpdateIndividualInfoMutationVariables>(UpdateIndividualInfoDocument, baseOptions);
      }
export type UpdateIndividualInfoMutationHookResult = ReturnType<typeof useUpdateIndividualInfoMutation>;
export type UpdateIndividualInfoMutationResult = Apollo.MutationResult<UpdateIndividualInfoMutation>;
export type UpdateIndividualInfoMutationOptions = Apollo.BaseMutationOptions<UpdateIndividualInfoMutation, UpdateIndividualInfoMutationVariables>;
export const DeleteMentorDocument = gql`
    mutation DeleteMentor($mentorId: Int!) {
  deleteMentor(mentorId: $mentorId) {
    errorMsg
    deleted
  }
}
    `;
export type DeleteMentorMutationFn = Apollo.MutationFunction<DeleteMentorMutation, DeleteMentorMutationVariables>;

/**
 * __useDeleteMentorMutation__
 *
 * To run a mutation, you first call `useDeleteMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMentorMutation, { data, loading, error }] = useDeleteMentorMutation({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useDeleteMentorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMentorMutation, DeleteMentorMutationVariables>) {
        return Apollo.useMutation<DeleteMentorMutation, DeleteMentorMutationVariables>(DeleteMentorDocument, baseOptions);
      }
export type DeleteMentorMutationHookResult = ReturnType<typeof useDeleteMentorMutation>;
export type DeleteMentorMutationResult = Apollo.MutationResult<DeleteMentorMutation>;
export type DeleteMentorMutationOptions = Apollo.BaseMutationOptions<DeleteMentorMutation, DeleteMentorMutationVariables>;
export const SetMottoDocument = gql`
    mutation SetMotto($motto: String!) {
  setMotto(motto: $motto) {
    errorMsg
    mentor {
      id
    }
  }
}
    `;
export type SetMottoMutationFn = Apollo.MutationFunction<SetMottoMutation, SetMottoMutationVariables>;

/**
 * __useSetMottoMutation__
 *
 * To run a mutation, you first call `useSetMottoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMottoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMottoMutation, { data, loading, error }] = useSetMottoMutation({
 *   variables: {
 *      motto: // value for 'motto'
 *   },
 * });
 */
export function useSetMottoMutation(baseOptions?: Apollo.MutationHookOptions<SetMottoMutation, SetMottoMutationVariables>) {
        return Apollo.useMutation<SetMottoMutation, SetMottoMutationVariables>(SetMottoDocument, baseOptions);
      }
export type SetMottoMutationHookResult = ReturnType<typeof useSetMottoMutation>;
export type SetMottoMutationResult = Apollo.MutationResult<SetMottoMutation>;
export type SetMottoMutationOptions = Apollo.BaseMutationOptions<SetMottoMutation, SetMottoMutationVariables>;
export const SetBioDocument = gql`
    mutation SetBio($bio: String!) {
  setBio(bio: $bio) {
    errorMsg
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
    errorMsg
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
    errorMsg
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
export const ChangeKnownPasswordDocument = gql`
    mutation ChangeKnownPassword($oldPassword: String!, $newPassword: String!) {
  changeKnownPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;
export type ChangeKnownPasswordMutationFn = Apollo.MutationFunction<ChangeKnownPasswordMutation, ChangeKnownPasswordMutationVariables>;

/**
 * __useChangeKnownPasswordMutation__
 *
 * To run a mutation, you first call `useChangeKnownPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeKnownPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeKnownPasswordMutation, { data, loading, error }] = useChangeKnownPasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangeKnownPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeKnownPasswordMutation, ChangeKnownPasswordMutationVariables>) {
        return Apollo.useMutation<ChangeKnownPasswordMutation, ChangeKnownPasswordMutationVariables>(ChangeKnownPasswordDocument, baseOptions);
      }
export type ChangeKnownPasswordMutationHookResult = ReturnType<typeof useChangeKnownPasswordMutation>;
export type ChangeKnownPasswordMutationResult = Apollo.MutationResult<ChangeKnownPasswordMutation>;
export type ChangeKnownPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeKnownPasswordMutation, ChangeKnownPasswordMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const CreateWorkExperienceDocument = gql`
    mutation CreateWorkExperience($input: WorkExperienceInput!) {
  createWorkExperience(input: $input) {
    error {
      ...RegularError
    }
    workExperience {
      id
      role
      companyName
      industries {
        name
      }
    }
  }
}
    ${RegularErrorFragmentDoc}`;
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
export const DeleteWorkExperienceDocument = gql`
    mutation DeleteWorkExperience($id: Int!) {
  deleteWorkExperience(id: $id)
}
    `;
export type DeleteWorkExperienceMutationFn = Apollo.MutationFunction<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>;

/**
 * __useDeleteWorkExperienceMutation__
 *
 * To run a mutation, you first call `useDeleteWorkExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkExperienceMutation, { data, loading, error }] = useDeleteWorkExperienceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkExperienceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>) {
        return Apollo.useMutation<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>(DeleteWorkExperienceDocument, baseOptions);
      }
export type DeleteWorkExperienceMutationHookResult = ReturnType<typeof useDeleteWorkExperienceMutation>;
export type DeleteWorkExperienceMutationResult = Apollo.MutationResult<DeleteWorkExperienceMutation>;
export type DeleteWorkExperienceMutationOptions = Apollo.BaseMutationOptions<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>;
export const UpdateWorkExperienceDocument = gql`
    mutation UpdateWorkExperience($id: Int!, $input: WorkExperienceInput!) {
  updateWorkExperience(id: $id, input: $input) {
    error {
      ...RegularError
    }
    workExperience {
      id
      role
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type UpdateWorkExperienceMutationFn = Apollo.MutationFunction<UpdateWorkExperienceMutation, UpdateWorkExperienceMutationVariables>;

/**
 * __useUpdateWorkExperienceMutation__
 *
 * To run a mutation, you first call `useUpdateWorkExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkExperienceMutation, { data, loading, error }] = useUpdateWorkExperienceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkExperienceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkExperienceMutation, UpdateWorkExperienceMutationVariables>) {
        return Apollo.useMutation<UpdateWorkExperienceMutation, UpdateWorkExperienceMutationVariables>(UpdateWorkExperienceDocument, baseOptions);
      }
export type UpdateWorkExperienceMutationHookResult = ReturnType<typeof useUpdateWorkExperienceMutation>;
export type UpdateWorkExperienceMutationResult = Apollo.MutationResult<UpdateWorkExperienceMutation>;
export type UpdateWorkExperienceMutationOptions = Apollo.BaseMutationOptions<UpdateWorkExperienceMutation, UpdateWorkExperienceMutationVariables>;
export const GetAvatarDocument = gql`
    query GetAvatar($mentorId: Int!) {
  getAvatar(mentorId: $mentorId) {
    result
  }
}
    `;

/**
 * __useGetAvatarQuery__
 *
 * To run a query within a React component, call `useGetAvatarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvatarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvatarQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useGetAvatarQuery(baseOptions: Apollo.QueryHookOptions<GetAvatarQuery, GetAvatarQueryVariables>) {
        return Apollo.useQuery<GetAvatarQuery, GetAvatarQueryVariables>(GetAvatarDocument, baseOptions);
      }
export function useGetAvatarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvatarQuery, GetAvatarQueryVariables>) {
          return Apollo.useLazyQuery<GetAvatarQuery, GetAvatarQueryVariables>(GetAvatarDocument, baseOptions);
        }
export type GetAvatarQueryHookResult = ReturnType<typeof useGetAvatarQuery>;
export type GetAvatarLazyQueryHookResult = ReturnType<typeof useGetAvatarLazyQuery>;
export type GetAvatarQueryResult = Apollo.QueryResult<GetAvatarQuery, GetAvatarQueryVariables>;
export const GetBioDocument = gql`
    query GetBio($mentorId: Int!) {
  getBio(mentorId: $mentorId) {
    result
  }
}
    `;

/**
 * __useGetBioQuery__
 *
 * To run a query within a React component, call `useGetBioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBioQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useGetBioQuery(baseOptions: Apollo.QueryHookOptions<GetBioQuery, GetBioQueryVariables>) {
        return Apollo.useQuery<GetBioQuery, GetBioQueryVariables>(GetBioDocument, baseOptions);
      }
export function useGetBioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBioQuery, GetBioQueryVariables>) {
          return Apollo.useLazyQuery<GetBioQuery, GetBioQueryVariables>(GetBioDocument, baseOptions);
        }
export type GetBioQueryHookResult = ReturnType<typeof useGetBioQuery>;
export type GetBioLazyQueryHookResult = ReturnType<typeof useGetBioLazyQuery>;
export type GetBioQueryResult = Apollo.QueryResult<GetBioQuery, GetBioQueryVariables>;
export const GetMentorInfoDocument = gql`
    query GetMentorInfo($mentorId: Int!) {
  getMentorInfo(mentorId: $mentorId) {
    errorMsg
    mentor {
      id
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

/**
 * __useGetMentorInfoQuery__
 *
 * To run a query within a React component, call `useGetMentorInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorInfoQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useGetMentorInfoQuery(baseOptions: Apollo.QueryHookOptions<GetMentorInfoQuery, GetMentorInfoQueryVariables>) {
        return Apollo.useQuery<GetMentorInfoQuery, GetMentorInfoQueryVariables>(GetMentorInfoDocument, baseOptions);
      }
export function useGetMentorInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorInfoQuery, GetMentorInfoQueryVariables>) {
          return Apollo.useLazyQuery<GetMentorInfoQuery, GetMentorInfoQueryVariables>(GetMentorInfoDocument, baseOptions);
        }
export type GetMentorInfoQueryHookResult = ReturnType<typeof useGetMentorInfoQuery>;
export type GetMentorInfoLazyQueryHookResult = ReturnType<typeof useGetMentorInfoLazyQuery>;
export type GetMentorInfoQueryResult = Apollo.QueryResult<GetMentorInfoQuery, GetMentorInfoQueryVariables>;
export const GetMottoDocument = gql`
    query GetMotto($mentorId: Int!) {
  getMotto(mentorId: $mentorId) {
    result
  }
}
    `;

/**
 * __useGetMottoQuery__
 *
 * To run a query within a React component, call `useGetMottoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMottoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMottoQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useGetMottoQuery(baseOptions: Apollo.QueryHookOptions<GetMottoQuery, GetMottoQueryVariables>) {
        return Apollo.useQuery<GetMottoQuery, GetMottoQueryVariables>(GetMottoDocument, baseOptions);
      }
export function useGetMottoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMottoQuery, GetMottoQueryVariables>) {
          return Apollo.useLazyQuery<GetMottoQuery, GetMottoQueryVariables>(GetMottoDocument, baseOptions);
        }
export type GetMottoQueryHookResult = ReturnType<typeof useGetMottoQuery>;
export type GetMottoLazyQueryHookResult = ReturnType<typeof useGetMottoLazyQuery>;
export type GetMottoQueryResult = Apollo.QueryResult<GetMottoQuery, GetMottoQueryVariables>;
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
export const CertificatesDocument = gql`
    query Certificates($mentorId: Int) {
  certificates(mentorId: $mentorId) {
    errorMsg
    data {
      ...CertificateFields
    }
  }
}
    ${CertificateFieldsFragmentDoc}`;

/**
 * __useCertificatesQuery__
 *
 * To run a query within a React component, call `useCertificatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCertificatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCertificatesQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useCertificatesQuery(baseOptions?: Apollo.QueryHookOptions<CertificatesQuery, CertificatesQueryVariables>) {
        return Apollo.useQuery<CertificatesQuery, CertificatesQueryVariables>(CertificatesDocument, baseOptions);
      }
export function useCertificatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CertificatesQuery, CertificatesQueryVariables>) {
          return Apollo.useLazyQuery<CertificatesQuery, CertificatesQueryVariables>(CertificatesDocument, baseOptions);
        }
export type CertificatesQueryHookResult = ReturnType<typeof useCertificatesQuery>;
export type CertificatesLazyQueryHookResult = ReturnType<typeof useCertificatesLazyQuery>;
export type CertificatesQueryResult = Apollo.QueryResult<CertificatesQuery, CertificatesQueryVariables>;
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
export const EducationsDocument = gql`
    query Educations($mentorId: Int) {
  educations(mentorId: $mentorId) {
    errorMsg
    data {
      ...EducationFields
    }
  }
}
    ${EducationFieldsFragmentDoc}`;

/**
 * __useEducationsQuery__
 *
 * To run a query within a React component, call `useEducationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEducationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEducationsQuery({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *   },
 * });
 */
export function useEducationsQuery(baseOptions?: Apollo.QueryHookOptions<EducationsQuery, EducationsQueryVariables>) {
        return Apollo.useQuery<EducationsQuery, EducationsQueryVariables>(EducationsDocument, baseOptions);
      }
export function useEducationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EducationsQuery, EducationsQueryVariables>) {
          return Apollo.useLazyQuery<EducationsQuery, EducationsQueryVariables>(EducationsDocument, baseOptions);
        }
export type EducationsQueryHookResult = ReturnType<typeof useEducationsQuery>;
export type EducationsLazyQueryHookResult = ReturnType<typeof useEducationsLazyQuery>;
export type EducationsQueryResult = Apollo.QueryResult<EducationsQuery, EducationsQueryVariables>;
export const ExpertisesDocument = gql`
    query Expertises {
  expertises {
    ...Expertise
  }
}
    ${ExpertiseFragmentDoc}`;

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
    ...Expertise
  }
}
    ${ExpertiseFragmentDoc}`;

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
export function useExpertisesByIdQuery(baseOptions: Apollo.QueryHookOptions<ExpertisesByIdQuery, ExpertisesByIdQueryVariables>) {
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
export const IndividualDocument = gql`
    query Individual($individualId: Int!) {
  individual(individualId: $individualId) {
    id
    firstName
    lastName
    user {
      email
      avatar
    }
  }
}
    `;

/**
 * __useIndividualQuery__
 *
 * To run a query within a React component, call `useIndividualQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualQuery({
 *   variables: {
 *      individualId: // value for 'individualId'
 *   },
 * });
 */
export function useIndividualQuery(baseOptions: Apollo.QueryHookOptions<IndividualQuery, IndividualQueryVariables>) {
        return Apollo.useQuery<IndividualQuery, IndividualQueryVariables>(IndividualDocument, baseOptions);
      }
export function useIndividualLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualQuery, IndividualQueryVariables>) {
          return Apollo.useLazyQuery<IndividualQuery, IndividualQueryVariables>(IndividualDocument, baseOptions);
        }
export type IndividualQueryHookResult = ReturnType<typeof useIndividualQuery>;
export type IndividualLazyQueryHookResult = ReturnType<typeof useIndividualLazyQuery>;
export type IndividualQueryResult = Apollo.QueryResult<IndividualQuery, IndividualQueryVariables>;
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
      ...MentorInfo
      user {
        avatar
      }
    }
  }
}
    ${MentorInfoFragmentDoc}`;

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
      ...MentorInfo
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
    ${MentorInfoFragmentDoc}`;

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
      ...MentorInfo
      user {
        email
        avatar
      }
    }
  }
}
    ${MentorInfoFragmentDoc}`;

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
export function useMentorQuery(baseOptions: Apollo.QueryHookOptions<MentorQuery, MentorQueryVariables>) {
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
      ...MentorInfo
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
    ${MentorInfoFragmentDoc}`;

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
export function useMentorsQuery(baseOptions: Apollo.QueryHookOptions<MentorsQuery, MentorsQueryVariables>) {
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
export function useReviewsByIdQuery(baseOptions: Apollo.QueryHookOptions<ReviewsByIdQuery, ReviewsByIdQueryVariables>) {
        return Apollo.useQuery<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, baseOptions);
      }
export function useReviewsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsByIdQuery, ReviewsByIdQueryVariables>) {
          return Apollo.useLazyQuery<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, baseOptions);
        }
export type ReviewsByIdQueryHookResult = ReturnType<typeof useReviewsByIdQuery>;
export type ReviewsByIdLazyQueryHookResult = ReturnType<typeof useReviewsByIdLazyQuery>;
export type ReviewsByIdQueryResult = Apollo.QueryResult<ReviewsByIdQuery, ReviewsByIdQueryVariables>;
export const IndividualRequestByIdDocument = gql`
    query IndividualRequestById($requestId: Int!) {
  individualRequestById(requestId: $requestId) {
    errorMsg
    data {
      id
      objective
      headline
      communicationTool
      communicationToolId
      email
      status
      ammount
      message
      createdAt
      mentor {
        id
        firstName
        lastName
        user {
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useIndividualRequestByIdQuery__
 *
 * To run a query within a React component, call `useIndividualRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualRequestByIdQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useIndividualRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<IndividualRequestByIdQuery, IndividualRequestByIdQueryVariables>) {
        return Apollo.useQuery<IndividualRequestByIdQuery, IndividualRequestByIdQueryVariables>(IndividualRequestByIdDocument, baseOptions);
      }
export function useIndividualRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualRequestByIdQuery, IndividualRequestByIdQueryVariables>) {
          return Apollo.useLazyQuery<IndividualRequestByIdQuery, IndividualRequestByIdQueryVariables>(IndividualRequestByIdDocument, baseOptions);
        }
export type IndividualRequestByIdQueryHookResult = ReturnType<typeof useIndividualRequestByIdQuery>;
export type IndividualRequestByIdLazyQueryHookResult = ReturnType<typeof useIndividualRequestByIdLazyQuery>;
export type IndividualRequestByIdQueryResult = Apollo.QueryResult<IndividualRequestByIdQuery, IndividualRequestByIdQueryVariables>;
export const IndividualRequestsDocument = gql`
    query IndividualRequests {
  individualRequests {
    errorMsg
    data {
      id
      objective
      headline
      communicationTool
      communicationToolId
      email
      message
      status
      ammount
      createdAt
      mentor {
        id
        firstName
        lastName
        user {
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useIndividualRequestsQuery__
 *
 * To run a query within a React component, call `useIndividualRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndividualRequestsQuery(baseOptions?: Apollo.QueryHookOptions<IndividualRequestsQuery, IndividualRequestsQueryVariables>) {
        return Apollo.useQuery<IndividualRequestsQuery, IndividualRequestsQueryVariables>(IndividualRequestsDocument, baseOptions);
      }
export function useIndividualRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualRequestsQuery, IndividualRequestsQueryVariables>) {
          return Apollo.useLazyQuery<IndividualRequestsQuery, IndividualRequestsQueryVariables>(IndividualRequestsDocument, baseOptions);
        }
export type IndividualRequestsQueryHookResult = ReturnType<typeof useIndividualRequestsQuery>;
export type IndividualRequestsLazyQueryHookResult = ReturnType<typeof useIndividualRequestsLazyQuery>;
export type IndividualRequestsQueryResult = Apollo.QueryResult<IndividualRequestsQuery, IndividualRequestsQueryVariables>;
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
export function useSessionRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<SessionRequestByIdQuery, SessionRequestByIdQueryVariables>) {
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
    ...SkillFields
  }
}
    ${SkillFieldsFragmentDoc}`;

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
    query WorkExperiences($mentorId: Int) {
  workExperiences(mentorId: $mentorId) {
    errorMsg
    data {
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