export const TodoCategory = {
  house: 'house',
  work: 'work',
  bureaucracy: 'bureaucracy',
  other: 'other',
} as const;


export interface Todo {
  id: number;
  label: string;
  description:  string;
  category: keyof typeof TodoCategory;
  done: string | null;
}
