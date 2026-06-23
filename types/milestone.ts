export type Milestone = {
  name: string;
  amount: number;
  dueDate: Date;
};

export const createEmptyMilestone = (): Milestone => ({
  name: null as any,
  amount: null as any,
  dueDate: null as any,
});
