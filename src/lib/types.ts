export type Tip = {
  id: string;
  title: string;
  description: string;
  tipNumber: number;
  date: Date;
  category: string;
  tags: TipTag[];
  sayings: GrannySaying[];
  createdAt: Date;
  lastUpdatedAt: Date;
};

export type Tag = {
  id: string;
  name: string;
  tips: TipTag[];
};

export type TipTag = {
  tipId: string;
  tagId: string;
  tip: Tip;
  tag: Tag;
};

export type GrannySaying = {
  id?: string;
  country: string;
  saying: string;
  verified: boolean;
  tip: Tip;
  tipId?: string;
};