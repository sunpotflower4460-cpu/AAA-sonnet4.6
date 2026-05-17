export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  locale?: 'ja' | 'en';
};
