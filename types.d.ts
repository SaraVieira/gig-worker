export type Task = { id?: number; name: string; price: number; type: string };
export type Work = {
  canContact: boolean;
  user: User["sub"];
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
