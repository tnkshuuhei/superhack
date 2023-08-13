export type ProjectType = {
  ProjectName?: string;
  ProjectDescription?: string;
  PublicGoods?: string;
  Sustainability?: string;
  TeamSize?: string;
  SubmittedDate?: string;
  Links?: string[];
  Website?: string;
  Github?: string;
  Twitter?: string;
  PayoutAddress?: string;
  Round?: string;
  ImageUrl?: string;
  id?: number | null;
  matchingAmount?: number | null;
};
export type RoundInfoType = {
  Organization: string;
  GrantPool: number;
  BudgeHolders: string[];
};
export type VoteType = {
  ProjectUid: any;
  AllocatedAmountsOfPoints: number;
  TextField: string;
};
