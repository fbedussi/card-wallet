export interface Card {
  id: string;
  name: string;
  code: number;
}

export interface CardData extends Card {
  createdAt: Date;
  updatedAt: Date;
}
