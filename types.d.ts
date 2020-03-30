export type Task = { name: string; price: string; type: string };
export type Work = {
  canContact: boolean;
  user: number;
  donateLink: string;
  description: string;
  tasks: Task[];
};
export type User = {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  sub: string;
};
