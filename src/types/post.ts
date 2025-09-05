// Code for constructing the type of a post. Exporting it lets other files import the shape
// -> there's a mention of 'props' in other components, need to figure out what that means
// Additional notes: compile-time only, helps editor and TS compiler catch mistakes, zero runtime cost
export type Post = {
  id: string;
  title: string;
  excerpt: string;
  cover?: string;
  author?: string;
  date: string;
};