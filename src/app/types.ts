export type Status = 'lecturer' | 'student';

export interface UserBasic {
  login: string;
  name: string;
  faculty: string;
  status: Status;
  photo: null | string;
}

export interface Lecturer extends UserBasic {
  status: 'lecturer';
  department: string;
}

export interface Student extends UserBasic {
  status: 'student';
  group: string;
}

export type User = Lecturer | Student;

export type UserWithId = User & { id: number };

export interface Channel {
  name: string;
  photo: string | null;
}

export interface ChannelWithId extends Channel {
  id: number;
}

export type ChannelPreview = Pick<ChannelWithId, 'id' | 'name' | 'photo'>;

export interface Response<T> {
  data: T;
  errors: string[];
}

export interface AuthData {
  id?: number;
}

export interface ChannelsPreviewData {
  items: ChannelPreview[];
  total: number | null;
}
