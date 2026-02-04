export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type CategoryName =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Health"
  | "Education"
  | "Other";
