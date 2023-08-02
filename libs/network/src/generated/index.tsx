import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type ApprovedReport = {
  __typename?: 'ApprovedReport'
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['Int']
  officer: Officer
  officerId?: Maybe<Scalars['String']>
  report: Report
  updatedAt: Scalars['DateTime']
}

export type ApprovedReportListRelationFilter = {
  every?: InputMaybe<ApprovedReportWhereInput>
  none?: InputMaybe<ApprovedReportWhereInput>
  some?: InputMaybe<ApprovedReportWhereInput>
}

export type ApprovedReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ApprovedReportOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  officer?: InputMaybe<OfficerOrderByWithRelationInput>
  officerId?: InputMaybe<SortOrder>
  report?: InputMaybe<ReportOrderByWithRelationInput>
  updatedAt?: InputMaybe<SortOrder>
}

export type ApprovedReportRelationFilter = {
  is?: InputMaybe<ApprovedReportWhereInput>
  isNot?: InputMaybe<ApprovedReportWhereInput>
}

export enum ApprovedReportScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  OfficerId = 'officerId',
  UpdatedAt = 'updatedAt',
}

export type ApprovedReportWhereInput = {
  AND?: InputMaybe<Array<ApprovedReportWhereInput>>
  NOT?: InputMaybe<Array<ApprovedReportWhereInput>>
  OR?: InputMaybe<Array<ApprovedReportWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  officer?: InputMaybe<OfficerWhereInput>
  officerId?: InputMaybe<StringFilter>
  report?: InputMaybe<ReportRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ApprovedReportWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

/** Enum for BodyType */
export enum BodyType {
  Athletic = 'ATHLETIC',
  Average = 'AVERAGE',
  Heavy = 'HEAVY',
  Obese = 'OBESE',
  Slender = 'SLENDER',
}

export type Case = {
  __typename?: 'Case'
  contact: Array<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  missingPerson: MissingPerson
  missingPersonId: Scalars['Int']
  reports: Array<Report>
  status: Status
  updatedAt: Scalars['DateTime']
}

export type CaseOrderByWithRelationInput = {
  contact?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  missingPerson?: InputMaybe<SortOrder>
  missingPersonId?: InputMaybe<SortOrder>
  reports?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type CaseRelationFilter = {
  is?: InputMaybe<CaseWhereInput>
  isNot?: InputMaybe<CaseWhereInput>
}

export enum CaseScalarFieldEnum {
  Contact = 'contact',
  CreatedAt = 'createdAt',
  Id = 'id',
  MissingPersonId = 'missingPersonId',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

export type CaseWhereInput = {
  AND?: InputMaybe<Array<CaseWhereInput>>
  NOT?: InputMaybe<Array<CaseWhereInput>>
  OR?: InputMaybe<Array<CaseWhereInput>>
  contact?: InputMaybe<StringListFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  missingPerson?: InputMaybe<MissingPersonRelationFilter>
  missingPersonId?: InputMaybe<IntFilter>
  reports?: InputMaybe<ReportListRelationFilter>
  status?: InputMaybe<EnumStatusFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type CaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type CreateApprovedReportInput = {
  description: Scalars['String']
  id: Scalars['Int']
  officerId?: InputMaybe<Scalars['String']>
}

export type CreateCaseInput = {
  contact: Array<Scalars['String']>
  missingPerson: CreateMissingPersonInput
  reports: Array<CreateReportInputWithoutCaseId>
  status: Status
}

export type CreateLocationInput = {
  address: Scalars['String']
  latitude: Scalars['Int']
  longitude: Scalars['Int']
}

export type CreateMissingPersonInput = {
  bodyType?: InputMaybe<BodyType>
  description: Scalars['String']
  displayName: Scalars['String']
  dob?: InputMaybe<Scalars['DateTime']>
  gender: Gender
  height?: InputMaybe<Scalars['Int']>
  images: Array<Scalars['String']>
  missingSince?: InputMaybe<Scalars['DateTime']>
  weight?: InputMaybe<Scalars['Int']>
}

export type CreateOfficerInput = {
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type CreateReportInput = {
  audio?: InputMaybe<Scalars['String']>
  caseId?: InputMaybe<Scalars['Int']>
  description: Scalars['String']
  images: Array<Scalars['String']>
  locationId?: InputMaybe<Scalars['Int']>
  time?: InputMaybe<Scalars['DateTime']>
  type: ReportType
  witnessId?: InputMaybe<Scalars['String']>
}

export type CreateReportInputWithoutCaseId = {
  audio?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  images: Array<Scalars['String']>
  location: CreateLocationInput
  locationId?: InputMaybe<Scalars['Int']>
  time?: InputMaybe<Scalars['DateTime']>
  type: ReportType
  witnessId?: InputMaybe<Scalars['String']>
}

export type CreateWitnessInput = {
  name: Scalars['String']
  uid?: InputMaybe<Scalars['String']>
}

export type DateFilterInput = {
  end: Scalars['String']
  start: Scalars['String']
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

export type EnumBodyTypeFilter = {
  equals?: InputMaybe<BodyType>
  in?: InputMaybe<Array<BodyType>>
  not?: InputMaybe<BodyType>
  notIn?: InputMaybe<Array<BodyType>>
}

export type EnumGenderFilter = {
  equals?: InputMaybe<Gender>
  in?: InputMaybe<Array<Gender>>
  not?: InputMaybe<Gender>
  notIn?: InputMaybe<Array<Gender>>
}

export type EnumReportTypeFilter = {
  equals?: InputMaybe<ReportType>
  in?: InputMaybe<Array<ReportType>>
  not?: InputMaybe<ReportType>
  notIn?: InputMaybe<Array<ReportType>>
}

export type EnumStatusFilter = {
  equals?: InputMaybe<Status>
  in?: InputMaybe<Array<Status>>
  not?: InputMaybe<Status>
  notIn?: InputMaybe<Array<Status>>
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<Scalars['Float']>
}

/** Enum for Gender */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  PreferNotToSay = 'PREFER_NOT_TO_SAY',
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
}

export type Location = {
  __typename?: 'Location'
  address: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  latitude: Scalars['Int']
  longitude: Scalars['Int']
  reports: Array<Report>
  updatedAt: Scalars['DateTime']
}

export type LocationFilterInput = {
  nw_lat: Scalars['Float']
  nw_lng: Scalars['Float']
  se_lat: Scalars['Float']
  se_lng: Scalars['Float']
}

export type LocationOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  latitude?: InputMaybe<SortOrder>
  longitude?: InputMaybe<SortOrder>
  reports?: InputMaybe<ReportOrderByRelationAggregateInput>
  updatedAt?: InputMaybe<SortOrder>
}

export type LocationRelationFilter = {
  is?: InputMaybe<LocationWhereInput>
  isNot?: InputMaybe<LocationWhereInput>
}

export enum LocationScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  Id = 'id',
  Latitude = 'latitude',
  Longitude = 'longitude',
  UpdatedAt = 'updatedAt',
}

export type LocationWhereInput = {
  AND?: InputMaybe<Array<LocationWhereInput>>
  NOT?: InputMaybe<Array<LocationWhereInput>>
  OR?: InputMaybe<Array<LocationWhereInput>>
  address?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  latitude?: InputMaybe<FloatFilter>
  longitude?: InputMaybe<FloatFilter>
  reports?: InputMaybe<ReportListRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type LocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginOutput = {
  __typename?: 'LoginOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type MissingPerson = {
  __typename?: 'MissingPerson'
  bodyType?: Maybe<BodyType>
  case: Case
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  displayName: Scalars['String']
  dob?: Maybe<Scalars['DateTime']>
  gender: Gender
  height?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  images: Array<Scalars['String']>
  missingSince?: Maybe<Scalars['DateTime']>
  updatedAt: Scalars['DateTime']
  weight?: Maybe<Scalars['Int']>
}

export type MissingPersonOrderByWithRelationInput = {
  bodyType?: InputMaybe<SortOrder>
  case?: InputMaybe<CaseOrderByWithRelationInput>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  dob?: InputMaybe<SortOrder>
  gender?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  images?: InputMaybe<SortOrder>
  missingSince?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  weight?: InputMaybe<SortOrder>
}

export type MissingPersonRelationFilter = {
  is?: InputMaybe<MissingPersonWhereInput>
  isNot?: InputMaybe<MissingPersonWhereInput>
}

export enum MissingPersonScalarFieldEnum {
  BodyType = 'bodyType',
  CreatedAt = 'createdAt',
  Description = 'description',
  DisplayName = 'displayName',
  Dob = 'dob',
  Gender = 'gender',
  Height = 'height',
  Id = 'id',
  Images = 'images',
  MissingSince = 'missingSince',
  UpdatedAt = 'updatedAt',
  Weight = 'weight',
}

export type MissingPersonWhereInput = {
  AND?: InputMaybe<Array<MissingPersonWhereInput>>
  NOT?: InputMaybe<Array<MissingPersonWhereInput>>
  OR?: InputMaybe<Array<MissingPersonWhereInput>>
  bodyType?: InputMaybe<EnumBodyTypeFilter>
  case?: InputMaybe<CaseRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  description?: InputMaybe<StringFilter>
  displayName?: InputMaybe<StringFilter>
  dob?: InputMaybe<DateTimeFilter>
  gender?: InputMaybe<EnumGenderFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<IntFilter>
  images?: InputMaybe<StringListFilter>
  missingSince?: InputMaybe<DateTimeFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  weight?: InputMaybe<FloatFilter>
}

export type MissingPersonWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createApprovedReport: ApprovedReport
  createCase: Case
  createLocation: Location
  createMissingPerson: MissingPerson
  createOfficer: Officer
  createReport: Report
  createReports: Case
  createWitness: Witness
  login: LoginOutput
  logout: Scalars['Boolean']
  refreshToken: RefreshTokenOutput
  register: RegisterOutput
  removeApprovedReport: ApprovedReport
  removeCase: Case
  removeLocation: Location
  removeMissingPerson: MissingPerson
  removeOfficer: Officer
  removeReport: Report
  removeWitness: Witness
  setAdmin: Scalars['Boolean']
  setRole: Scalars['Boolean']
  updateApprovedReport: ApprovedReport
  updateLocation: Location
  updateMissingPerson: MissingPerson
  updateOfficer: Officer
  updateReport: Report
  updateWitness: Witness
}

export type MutationCreateApprovedReportArgs = {
  createApprovedReportInput: CreateApprovedReportInput
}

export type MutationCreateCaseArgs = {
  createCaseInput: CreateCaseInput
}

export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput
}

export type MutationCreateMissingPersonArgs = {
  createMissingPersonInput: CreateMissingPersonInput
}

export type MutationCreateOfficerArgs = {
  createOfficerInput: CreateOfficerInput
}

export type MutationCreateReportArgs = {
  createReportInput: CreateReportInput
}

export type MutationCreateReportsArgs = {
  caseId: Scalars['Int']
  createReportsInput: Array<CreateReportInputWithoutCaseId>
}

export type MutationCreateWitnessArgs = {
  createWitnessInput: CreateWitnessInput
}

export type MutationLoginArgs = {
  credentials: LoginInput
}

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput
}

export type MutationRegisterArgs = {
  credentials: RegisterInput
}

export type MutationRemoveApprovedReportArgs = {
  where?: InputMaybe<ApprovedReportWhereUniqueInput>
}

export type MutationRemoveCaseArgs = {
  where?: InputMaybe<CaseWhereUniqueInput>
}

export type MutationRemoveLocationArgs = {
  where?: InputMaybe<LocationWhereUniqueInput>
}

export type MutationRemoveMissingPersonArgs = {
  where?: InputMaybe<MissingPersonWhereUniqueInput>
}

export type MutationRemoveOfficerArgs = {
  where?: InputMaybe<OfficerWhereUniqueInput>
}

export type MutationRemoveReportArgs = {
  where?: InputMaybe<ReportWhereUniqueInput>
}

export type MutationRemoveWitnessArgs = {
  where?: InputMaybe<WitnessWhereUniqueInput>
}

export type MutationSetAdminArgs = {
  uid: Scalars['String']
}

export type MutationSetRoleArgs = {
  setRoleInput: SetRoleInput
}

export type MutationUpdateApprovedReportArgs = {
  updateApprovedReportInput: UpdateApprovedReportInput
}

export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput
}

export type MutationUpdateMissingPersonArgs = {
  updateMissingPersonInput: UpdateMissingPersonInput
}

export type MutationUpdateOfficerArgs = {
  updateOfficerInput: UpdateOfficerInput
}

export type MutationUpdateReportArgs = {
  updateReportInput: UpdateReportInput
}

export type MutationUpdateWitnessArgs = {
  updateWitnessInput: UpdateWitnessInput
}

export type Officer = {
  __typename?: 'Officer'
  approvedReports: Array<ApprovedReport>
  createdAt: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type OfficerOrderByWithRelationInput = {
  approvedReports?: InputMaybe<ApprovedReportOrderByRelationAggregateInput>
  createdAt?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum OfficerScalarFieldEnum {
  CreatedAt = 'createdAt',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type OfficerWhereInput = {
  AND?: InputMaybe<Array<OfficerWhereInput>>
  NOT?: InputMaybe<Array<OfficerWhereInput>>
  OR?: InputMaybe<Array<OfficerWhereInput>>
  approvedReports?: InputMaybe<ApprovedReportListRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  name?: InputMaybe<StringFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type OfficerWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  approvedReport: ApprovedReport
  approvedReports: Array<ApprovedReport>
  case: Case
  cases: Array<Case>
  location: Location
  locations: Array<Location>
  missingPeople: Array<MissingPerson>
  missingPerson: MissingPerson
  officer: Officer
  officerMe: Officer
  officers: Array<Officer>
  report: Report
  reports: Array<Report>
  searchCases: Array<Report>
  witness: Witness
  witnessMe: Witness
  witnesses: Array<Witness>
}

export type QueryApprovedReportArgs = {
  where?: InputMaybe<ApprovedReportWhereUniqueInput>
}

export type QueryApprovedReportsArgs = {
  cursor?: InputMaybe<ApprovedReportWhereUniqueInput>
  distinct?: InputMaybe<Array<ApprovedReportScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ApprovedReportOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ApprovedReportWhereInput>
}

export type QueryCaseArgs = {
  where?: InputMaybe<CaseWhereUniqueInput>
}

export type QueryCasesArgs = {
  cursor?: InputMaybe<CaseWhereUniqueInput>
  distinct?: InputMaybe<Array<CaseScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CaseOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CaseWhereInput>
}

export type QueryLocationArgs = {
  where?: InputMaybe<LocationWhereUniqueInput>
}

export type QueryLocationsArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>
  distinct?: InputMaybe<Array<LocationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<LocationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LocationWhereInput>
}

export type QueryMissingPeopleArgs = {
  cursor?: InputMaybe<MissingPersonWhereUniqueInput>
  distinct?: InputMaybe<Array<MissingPersonScalarFieldEnum>>
  orderBy?: InputMaybe<Array<MissingPersonOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<MissingPersonWhereInput>
}

export type QueryMissingPersonArgs = {
  where?: InputMaybe<MissingPersonWhereUniqueInput>
}

export type QueryOfficerArgs = {
  where?: InputMaybe<OfficerWhereUniqueInput>
}

export type QueryOfficerMeArgs = {
  where?: InputMaybe<OfficerWhereUniqueInput>
}

export type QueryOfficersArgs = {
  cursor?: InputMaybe<OfficerWhereUniqueInput>
  distinct?: InputMaybe<Array<OfficerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OfficerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OfficerWhereInput>
}

export type QueryReportArgs = {
  where?: InputMaybe<ReportWhereUniqueInput>
}

export type QueryReportsArgs = {
  cursor?: InputMaybe<ReportWhereUniqueInput>
  distinct?: InputMaybe<Array<ReportScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ReportOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ReportWhereInput>
}

export type QuerySearchCasesArgs = {
  dateFilter?: InputMaybe<DateFilterInput>
  locationFilter: LocationFilterInput
}

export type QueryWitnessArgs = {
  where?: InputMaybe<WitnessWhereUniqueInput>
}

export type QueryWitnessMeArgs = {
  where?: InputMaybe<WitnessWhereUniqueInput>
}

export type QueryWitnessesArgs = {
  cursor?: InputMaybe<WitnessWhereUniqueInput>
  distinct?: InputMaybe<Array<WitnessScalarFieldEnum>>
  orderBy?: InputMaybe<Array<WitnessOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<WitnessWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RefreshTokenInput = {
  refresh_token: Scalars['String']
}

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput'
  access_token: Scalars['String']
  expires_in: Scalars['String']
  id_token: Scalars['String']
  project_id: Scalars['String']
  refresh_token: Scalars['String']
  token_type: Scalars['String']
  user_id: Scalars['String']
}

export type RegisterInput = {
  displayName?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  password: Scalars['String']
}

export type RegisterOutput = {
  __typename?: 'RegisterOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type Report = {
  __typename?: 'Report'
  approvedReport: ApprovedReport
  audio?: Maybe<Scalars['String']>
  case: Case
  caseId?: Maybe<Scalars['Int']>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['Int']
  images: Array<Scalars['String']>
  location: Location
  locationId?: Maybe<Scalars['Int']>
  time?: Maybe<Scalars['DateTime']>
  type: ReportType
  updatedAt: Scalars['DateTime']
  witness: Witness
  witnessId?: Maybe<Scalars['String']>
}

export type ReportListRelationFilter = {
  every?: InputMaybe<ReportWhereInput>
  none?: InputMaybe<ReportWhereInput>
  some?: InputMaybe<ReportWhereInput>
}

export type ReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ReportOrderByWithRelationInput = {
  approvedReport?: InputMaybe<ApprovedReportOrderByWithRelationInput>
  audio?: InputMaybe<SortOrder>
  case?: InputMaybe<CaseOrderByWithRelationInput>
  caseId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  images?: InputMaybe<SortOrder>
  location?: InputMaybe<LocationOrderByWithRelationInput>
  locationId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  witness?: InputMaybe<WitnessOrderByWithRelationInput>
  witnessId?: InputMaybe<SortOrder>
}

export type ReportRelationFilter = {
  is?: InputMaybe<ReportWhereInput>
  isNot?: InputMaybe<ReportWhereInput>
}

export enum ReportScalarFieldEnum {
  Audio = 'audio',
  CaseId = 'caseId',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Images = 'images',
  LocationId = 'locationId',
  Time = 'time',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  WitnessId = 'witnessId',
}

/** Enum for ReportType */
export enum ReportType {
  GeneralInformation = 'GENERAL_INFORMATION',
  Lead = 'LEAD',
  Sighting = 'SIGHTING',
}

export type ReportWhereInput = {
  AND?: InputMaybe<Array<ReportWhereInput>>
  NOT?: InputMaybe<Array<ReportWhereInput>>
  OR?: InputMaybe<Array<ReportWhereInput>>
  approvedReport?: InputMaybe<ApprovedReportRelationFilter>
  audio?: InputMaybe<StringFilter>
  case?: InputMaybe<CaseRelationFilter>
  caseId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  images?: InputMaybe<StringListFilter>
  location?: InputMaybe<LocationRelationFilter>
  locationId?: InputMaybe<IntFilter>
  time?: InputMaybe<DateTimeFilter>
  type?: InputMaybe<EnumReportTypeFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  witness?: InputMaybe<WitnessRelationFilter>
  witnessId?: InputMaybe<StringFilter>
}

export type ReportWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

/** Enum for roles */
export enum RoleEnum {
  Admin = 'admin',
  Manager = 'manager',
}

export type SetRoleInput = {
  role: RoleEnum
  uid: Scalars['String']
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/** Enum for Status */
export enum Status {
  FoundDeceased = 'FOUND_DECEASED',
  FoundSafe = 'FOUND_SAFE',
  Missing = 'MISSING',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type StringListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>
  has?: InputMaybe<Scalars['String']>
  hasEvery?: InputMaybe<Array<Scalars['String']>>
  hasSome?: InputMaybe<Array<Scalars['String']>>
  isEmpty?: InputMaybe<Scalars['Boolean']>
}

export type UpdateApprovedReportInput = {
  description?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  officerId?: InputMaybe<Scalars['String']>
}

export type UpdateLocationInput = {
  address?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  latitude?: InputMaybe<Scalars['Int']>
  longitude?: InputMaybe<Scalars['Int']>
}

export type UpdateMissingPersonInput = {
  bodyType?: InputMaybe<BodyType>
  description?: InputMaybe<Scalars['String']>
  displayName?: InputMaybe<Scalars['String']>
  dob?: InputMaybe<Scalars['DateTime']>
  gender?: InputMaybe<Gender>
  height?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  images?: InputMaybe<Array<Scalars['String']>>
  missingSince?: InputMaybe<Scalars['DateTime']>
  weight?: InputMaybe<Scalars['Int']>
}

export type UpdateOfficerInput = {
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type UpdateReportInput = {
  audio?: InputMaybe<Scalars['String']>
  caseId?: InputMaybe<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  images?: InputMaybe<Array<Scalars['String']>>
  locationId?: InputMaybe<Scalars['Int']>
  time?: InputMaybe<Scalars['DateTime']>
  type?: InputMaybe<ReportType>
  witnessId?: InputMaybe<Scalars['String']>
}

export type UpdateWitnessInput = {
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type Witness = {
  __typename?: 'Witness'
  createdAt: Scalars['DateTime']
  name: Scalars['String']
  reports: Array<Report>
  uid?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

export type WitnessOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  reports?: InputMaybe<ReportOrderByRelationAggregateInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type WitnessRelationFilter = {
  is?: InputMaybe<WitnessWhereInput>
  isNot?: InputMaybe<WitnessWhereInput>
}

export enum WitnessScalarFieldEnum {
  CreatedAt = 'createdAt',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type WitnessWhereInput = {
  AND?: InputMaybe<Array<WitnessWhereInput>>
  NOT?: InputMaybe<Array<WitnessWhereInput>>
  OR?: InputMaybe<Array<WitnessWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  name?: InputMaybe<StringFilter>
  reports?: InputMaybe<ReportListRelationFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type WitnessWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type ReportsQueryVariables = Exact<{ [key: string]: never }>

export type ReportsQuery = {
  __typename?: 'Query'
  reports: Array<{ __typename?: 'Report'; id: number }>
}

export type CreateWitnessMutationVariables = Exact<{
  createWitnessInput: CreateWitnessInput
}>

export type CreateWitnessMutation = {
  __typename?: 'Mutation'
  createWitness: { __typename?: 'Witness'; uid?: string | null }
}

export type SearchCasesQueryVariables = Exact<{
  locationFilter: LocationFilterInput
  dateFilter?: InputMaybe<DateFilterInput>
}>

export type SearchCasesQuery = {
  __typename?: 'Query'
  searchCases: Array<{
    __typename?: 'Report'
    case: {
      __typename?: 'Case'
      status: Status
      id: number
      missingPerson: {
        __typename?: 'MissingPerson'
        images: Array<string>
        displayName: string
        gender: Gender
      }
    }
    location: {
      __typename?: 'Location'
      address: string
      latitude: number
      longitude: number
    }
  }>
}

export type CaseQueryVariables = Exact<{
  where: CaseWhereUniqueInput
}>

export type CaseQuery = {
  __typename?: 'Query'
  case: {
    __typename?: 'Case'
    id: number
    contact: Array<string>
    status: Status
    missingPerson: {
      __typename?: 'MissingPerson'
      displayName: string
      description: string
      missingSince?: any | null
      gender: Gender
      dob?: any | null
      height?: number | null
      weight?: number | null
      images: Array<string>
    }
    reports: Array<{
      __typename?: 'Report'
      time?: any | null
      id: number
      type: ReportType
      description: string
      location: { __typename?: 'Location'; latitude: number; longitude: number }
    }>
  }
}

export type CreateCaseMutationVariables = Exact<{
  createCaseInput: CreateCaseInput
}>

export type CreateCaseMutation = {
  __typename?: 'Mutation'
  createCase: { __typename?: 'Case'; id: number }
}

export type OfficerMeQueryVariables = Exact<{ [key: string]: never }>

export type OfficerMeQuery = {
  __typename?: 'Query'
  officerMe: {
    __typename?: 'Officer'
    uid: string
    createdAt: any
    name?: string | null
    updatedAt: any
  }
}

export type WitnessMeQueryVariables = Exact<{ [key: string]: never }>

export type WitnessMeQuery = {
  __typename?: 'Query'
  witnessMe: {
    __typename?: 'Witness'
    uid?: string | null
    createdAt: any
    name: string
    updatedAt: any
  }
}

export type CreateOfficerMutationVariables = Exact<{
  createOfficerInput: CreateOfficerInput
}>

export type CreateOfficerMutation = {
  __typename?: 'Mutation'
  createOfficer: {
    __typename?: 'Officer'
    uid: string
    name?: string | null
    createdAt: any
    updatedAt: any
  }
}

export type UnapprovedReportsQueryVariables = Exact<{
  where?: InputMaybe<ReportWhereInput>
  distinct?: InputMaybe<Array<ReportScalarFieldEnum> | ReportScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<ReportWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<ReportOrderByWithRelationInput> | ReportOrderByWithRelationInput
  >
}>

export type UnapprovedReportsQuery = {
  __typename?: 'Query'
  reports: Array<{
    __typename?: 'Report'
    id: number
    caseId?: number | null
    time?: any | null
    type: ReportType
    audio?: string | null
    description: string
    createdAt: any
    location: { __typename?: 'Location'; latitude: number; longitude: number }
    witness: { __typename?: 'Witness'; uid?: string | null; name: string }
  }>
}

export type CreateApprovedReportMutationVariables = Exact<{
  createApprovedReportInput: CreateApprovedReportInput
}>

export type CreateApprovedReportMutation = {
  __typename?: 'Mutation'
  createApprovedReport: { __typename?: 'ApprovedReport'; description: string }
}

export type CreateReportsMutationVariables = Exact<{
  createReportsInput:
    | Array<CreateReportInputWithoutCaseId>
    | CreateReportInputWithoutCaseId
  caseId: Scalars['Int']
}>

export type CreateReportsMutation = {
  __typename?: 'Mutation'
  createReports: { __typename?: 'Case'; id: number }
}

export const namedOperations = {
  Query: {
    reports: 'reports',
    searchCases: 'searchCases',
    case: 'case',
    officerMe: 'officerMe',
    witnessMe: 'witnessMe',
    unapprovedReports: 'unapprovedReports',
  },
  Mutation: {
    createWitness: 'createWitness',
    createCase: 'createCase',
    createOfficer: 'createOfficer',
    createApprovedReport: 'createApprovedReport',
    CreateReports: 'CreateReports',
  },
}

export const ReportsDocument = /*#__PURE__*/ gql`
  query reports {
    reports {
      id
    }
  }
`

/**
 * __useReportsQuery__
 *
 * To run a query within a React component, call `useReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReportsQuery(
  baseOptions?: Apollo.QueryHookOptions<ReportsQuery, ReportsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ReportsQuery, ReportsQueryVariables>(
    ReportsDocument,
    options,
  )
}
export function useReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReportsQuery,
    ReportsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ReportsQuery, ReportsQueryVariables>(
    ReportsDocument,
    options,
  )
}
export type ReportsQueryHookResult = ReturnType<typeof useReportsQuery>
export type ReportsLazyQueryHookResult = ReturnType<typeof useReportsLazyQuery>
export type ReportsQueryResult = Apollo.QueryResult<
  ReportsQuery,
  ReportsQueryVariables
>
export const CreateWitnessDocument = /*#__PURE__*/ gql`
  mutation createWitness($createWitnessInput: CreateWitnessInput!) {
    createWitness(createWitnessInput: $createWitnessInput) {
      uid
    }
  }
`
export type CreateWitnessMutationFn = Apollo.MutationFunction<
  CreateWitnessMutation,
  CreateWitnessMutationVariables
>

/**
 * __useCreateWitnessMutation__
 *
 * To run a mutation, you first call `useCreateWitnessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWitnessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWitnessMutation, { data, loading, error }] = useCreateWitnessMutation({
 *   variables: {
 *      createWitnessInput: // value for 'createWitnessInput'
 *   },
 * });
 */
export function useCreateWitnessMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWitnessMutation,
    CreateWitnessMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateWitnessMutation,
    CreateWitnessMutationVariables
  >(CreateWitnessDocument, options)
}
export type CreateWitnessMutationHookResult = ReturnType<
  typeof useCreateWitnessMutation
>
export type CreateWitnessMutationResult =
  Apollo.MutationResult<CreateWitnessMutation>
export type CreateWitnessMutationOptions = Apollo.BaseMutationOptions<
  CreateWitnessMutation,
  CreateWitnessMutationVariables
>
export const SearchCasesDocument = /*#__PURE__*/ gql`
  query searchCases(
    $locationFilter: LocationFilterInput!
    $dateFilter: DateFilterInput
  ) {
    searchCases(locationFilter: $locationFilter, dateFilter: $dateFilter) {
      case {
        status
        id
        missingPerson {
          images
          displayName
          gender
        }
      }
      location {
        address
        latitude
        longitude
      }
    }
  }
`

/**
 * __useSearchCasesQuery__
 *
 * To run a query within a React component, call `useSearchCasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCasesQuery({
 *   variables: {
 *      locationFilter: // value for 'locationFilter'
 *      dateFilter: // value for 'dateFilter'
 *   },
 * });
 */
export function useSearchCasesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchCasesQuery,
    SearchCasesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchCasesQuery, SearchCasesQueryVariables>(
    SearchCasesDocument,
    options,
  )
}
export function useSearchCasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchCasesQuery,
    SearchCasesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchCasesQuery, SearchCasesQueryVariables>(
    SearchCasesDocument,
    options,
  )
}
export type SearchCasesQueryHookResult = ReturnType<typeof useSearchCasesQuery>
export type SearchCasesLazyQueryHookResult = ReturnType<
  typeof useSearchCasesLazyQuery
>
export type SearchCasesQueryResult = Apollo.QueryResult<
  SearchCasesQuery,
  SearchCasesQueryVariables
>
export const CaseDocument = /*#__PURE__*/ gql`
  query case($where: CaseWhereUniqueInput!) {
    case(where: $where) {
      id
      missingPerson {
        displayName
        description
        missingSince
        gender
        dob
        height
        weight
        images
      }
      reports {
        time
        id
        type
        description
        location {
          latitude
          longitude
        }
      }
      contact
      status
    }
  }
`

/**
 * __useCaseQuery__
 *
 * To run a query within a React component, call `useCaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCaseQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCaseQuery(
  baseOptions: Apollo.QueryHookOptions<CaseQuery, CaseQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CaseQuery, CaseQueryVariables>(CaseDocument, options)
}
export function useCaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CaseQuery, CaseQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CaseQuery, CaseQueryVariables>(
    CaseDocument,
    options,
  )
}
export type CaseQueryHookResult = ReturnType<typeof useCaseQuery>
export type CaseLazyQueryHookResult = ReturnType<typeof useCaseLazyQuery>
export type CaseQueryResult = Apollo.QueryResult<CaseQuery, CaseQueryVariables>
export const CreateCaseDocument = /*#__PURE__*/ gql`
  mutation createCase($createCaseInput: CreateCaseInput!) {
    createCase(createCaseInput: $createCaseInput) {
      id
    }
  }
`
export type CreateCaseMutationFn = Apollo.MutationFunction<
  CreateCaseMutation,
  CreateCaseMutationVariables
>

/**
 * __useCreateCaseMutation__
 *
 * To run a mutation, you first call `useCreateCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCaseMutation, { data, loading, error }] = useCreateCaseMutation({
 *   variables: {
 *      createCaseInput: // value for 'createCaseInput'
 *   },
 * });
 */
export function useCreateCaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCaseMutation,
    CreateCaseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCaseMutation, CreateCaseMutationVariables>(
    CreateCaseDocument,
    options,
  )
}
export type CreateCaseMutationHookResult = ReturnType<
  typeof useCreateCaseMutation
>
export type CreateCaseMutationResult = Apollo.MutationResult<CreateCaseMutation>
export type CreateCaseMutationOptions = Apollo.BaseMutationOptions<
  CreateCaseMutation,
  CreateCaseMutationVariables
>
export const OfficerMeDocument = /*#__PURE__*/ gql`
  query officerMe {
    officerMe {
      uid
      createdAt
      name
      updatedAt
    }
  }
`

/**
 * __useOfficerMeQuery__
 *
 * To run a query within a React component, call `useOfficerMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficerMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficerMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useOfficerMeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OfficerMeQuery,
    OfficerMeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OfficerMeQuery, OfficerMeQueryVariables>(
    OfficerMeDocument,
    options,
  )
}
export function useOfficerMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OfficerMeQuery,
    OfficerMeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<OfficerMeQuery, OfficerMeQueryVariables>(
    OfficerMeDocument,
    options,
  )
}
export type OfficerMeQueryHookResult = ReturnType<typeof useOfficerMeQuery>
export type OfficerMeLazyQueryHookResult = ReturnType<
  typeof useOfficerMeLazyQuery
>
export type OfficerMeQueryResult = Apollo.QueryResult<
  OfficerMeQuery,
  OfficerMeQueryVariables
>
export const WitnessMeDocument = /*#__PURE__*/ gql`
  query witnessMe {
    witnessMe {
      uid
      createdAt
      name
      updatedAt
    }
  }
`

/**
 * __useWitnessMeQuery__
 *
 * To run a query within a React component, call `useWitnessMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWitnessMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWitnessMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useWitnessMeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    WitnessMeQuery,
    WitnessMeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<WitnessMeQuery, WitnessMeQueryVariables>(
    WitnessMeDocument,
    options,
  )
}
export function useWitnessMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WitnessMeQuery,
    WitnessMeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<WitnessMeQuery, WitnessMeQueryVariables>(
    WitnessMeDocument,
    options,
  )
}
export type WitnessMeQueryHookResult = ReturnType<typeof useWitnessMeQuery>
export type WitnessMeLazyQueryHookResult = ReturnType<
  typeof useWitnessMeLazyQuery
>
export type WitnessMeQueryResult = Apollo.QueryResult<
  WitnessMeQuery,
  WitnessMeQueryVariables
>
export const CreateOfficerDocument = /*#__PURE__*/ gql`
  mutation createOfficer($createOfficerInput: CreateOfficerInput!) {
    createOfficer(createOfficerInput: $createOfficerInput) {
      uid
      name
      createdAt
      updatedAt
    }
  }
`
export type CreateOfficerMutationFn = Apollo.MutationFunction<
  CreateOfficerMutation,
  CreateOfficerMutationVariables
>

/**
 * __useCreateOfficerMutation__
 *
 * To run a mutation, you first call `useCreateOfficerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfficerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfficerMutation, { data, loading, error }] = useCreateOfficerMutation({
 *   variables: {
 *      createOfficerInput: // value for 'createOfficerInput'
 *   },
 * });
 */
export function useCreateOfficerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOfficerMutation,
    CreateOfficerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateOfficerMutation,
    CreateOfficerMutationVariables
  >(CreateOfficerDocument, options)
}
export type CreateOfficerMutationHookResult = ReturnType<
  typeof useCreateOfficerMutation
>
export type CreateOfficerMutationResult =
  Apollo.MutationResult<CreateOfficerMutation>
export type CreateOfficerMutationOptions = Apollo.BaseMutationOptions<
  CreateOfficerMutation,
  CreateOfficerMutationVariables
>
export const UnapprovedReportsDocument = /*#__PURE__*/ gql`
  query unapprovedReports(
    $where: ReportWhereInput
    $distinct: [ReportScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: ReportWhereUniqueInput
    $orderBy: [ReportOrderByWithRelationInput!]
  ) {
    reports(
      where: $where
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
    ) {
      id
      caseId
      time
      type
      audio
      description
      createdAt
      location {
        latitude
        longitude
      }
      witness {
        uid
        name
      }
    }
  }
`

/**
 * __useUnapprovedReportsQuery__
 *
 * To run a query within a React component, call `useUnapprovedReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnapprovedReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnapprovedReportsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUnapprovedReportsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UnapprovedReportsQuery,
    UnapprovedReportsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    UnapprovedReportsQuery,
    UnapprovedReportsQueryVariables
  >(UnapprovedReportsDocument, options)
}
export function useUnapprovedReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UnapprovedReportsQuery,
    UnapprovedReportsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    UnapprovedReportsQuery,
    UnapprovedReportsQueryVariables
  >(UnapprovedReportsDocument, options)
}
export type UnapprovedReportsQueryHookResult = ReturnType<
  typeof useUnapprovedReportsQuery
>
export type UnapprovedReportsLazyQueryHookResult = ReturnType<
  typeof useUnapprovedReportsLazyQuery
>
export type UnapprovedReportsQueryResult = Apollo.QueryResult<
  UnapprovedReportsQuery,
  UnapprovedReportsQueryVariables
>
export const CreateApprovedReportDocument = /*#__PURE__*/ gql`
  mutation createApprovedReport(
    $createApprovedReportInput: CreateApprovedReportInput!
  ) {
    createApprovedReport(
      createApprovedReportInput: $createApprovedReportInput
    ) {
      description
    }
  }
`
export type CreateApprovedReportMutationFn = Apollo.MutationFunction<
  CreateApprovedReportMutation,
  CreateApprovedReportMutationVariables
>

/**
 * __useCreateApprovedReportMutation__
 *
 * To run a mutation, you first call `useCreateApprovedReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApprovedReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApprovedReportMutation, { data, loading, error }] = useCreateApprovedReportMutation({
 *   variables: {
 *      createApprovedReportInput: // value for 'createApprovedReportInput'
 *   },
 * });
 */
export function useCreateApprovedReportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateApprovedReportMutation,
    CreateApprovedReportMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateApprovedReportMutation,
    CreateApprovedReportMutationVariables
  >(CreateApprovedReportDocument, options)
}
export type CreateApprovedReportMutationHookResult = ReturnType<
  typeof useCreateApprovedReportMutation
>
export type CreateApprovedReportMutationResult =
  Apollo.MutationResult<CreateApprovedReportMutation>
export type CreateApprovedReportMutationOptions = Apollo.BaseMutationOptions<
  CreateApprovedReportMutation,
  CreateApprovedReportMutationVariables
>
export const CreateReportsDocument = /*#__PURE__*/ gql`
  mutation CreateReports(
    $createReportsInput: [CreateReportInputWithoutCaseId!]!
    $caseId: Int!
  ) {
    createReports(createReportsInput: $createReportsInput, caseId: $caseId) {
      id
    }
  }
`
export type CreateReportsMutationFn = Apollo.MutationFunction<
  CreateReportsMutation,
  CreateReportsMutationVariables
>

/**
 * __useCreateReportsMutation__
 *
 * To run a mutation, you first call `useCreateReportsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportsMutation, { data, loading, error }] = useCreateReportsMutation({
 *   variables: {
 *      createReportsInput: // value for 'createReportsInput'
 *      caseId: // value for 'caseId'
 *   },
 * });
 */
export function useCreateReportsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReportsMutation,
    CreateReportsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateReportsMutation,
    CreateReportsMutationVariables
  >(CreateReportsDocument, options)
}
export type CreateReportsMutationHookResult = ReturnType<
  typeof useCreateReportsMutation
>
export type CreateReportsMutationResult =
  Apollo.MutationResult<CreateReportsMutation>
export type CreateReportsMutationOptions = Apollo.BaseMutationOptions<
  CreateReportsMutation,
  CreateReportsMutationVariables
>
