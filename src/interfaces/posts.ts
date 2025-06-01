export interface IPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type IComments = {
  id: number;
  postId: number;
  name: string;
  body: string;
  email: string;
};
