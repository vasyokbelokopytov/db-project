export type Status = 'instructor' | 'student';

export interface WithId {
  id: number;
}

export interface WithPhoto {
  photo: string | null;
}

export interface WithPassword {
  password: string;
}

export interface UserBasic {
  login: string;
  name: string;
  department: string;
  status: Status;
  isContact: boolean | null;
}

export interface Lecturer extends UserBasic {
  status: 'instructor';
}

export interface Student extends UserBasic {
  status: 'student';
  group: string;
}

export type User = Lecturer | Student;

export interface Channel {
  name: string;
  description: string;
  creatorId: number;
  members: string[];
}

export type ChannelPreview = Pick<
  Channel & WithId & WithPhoto,
  'id' | 'name' | 'photo'
>;

export interface Post {
  text: string;
  channelId: number;
  author: User & WithId & WithPhoto;
}

export interface Response<T> {
  data: T;
  errors: string[];
}

export interface ItemsData<T> {
  items: T;
  total: number | null;
}

export type ItemsResponse<T> = Response<ItemsData<T>>;

export interface AuthData {
  id?: number;
}

export interface ChannelCreatedData {
  id: number;
}

export interface PostCreatedData {
  id: number;
}

export interface MessageCreatedData {
  id: number;
}

export interface Message {
  receiverId: number;
  authorId: number;
  text: string;
}
