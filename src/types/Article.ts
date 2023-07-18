import ImageStructure from './ImageStructure';

export default interface Article {
  identifier: string;
  title: string;
  content: string;
  date: Date;
  read: boolean;
  image: ImageStructure | null;
}
