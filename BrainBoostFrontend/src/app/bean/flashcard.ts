export interface FlashcardBean {
  id: number;
  userId: number;
  title: string;
  question: string;
  answer: string;
  lastLearned: Date | null;
  flashCardSetId: number;
}
