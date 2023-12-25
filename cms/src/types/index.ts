import { FC, ReactNode } from "react";

export type IPage = {
  path: string;
  component: FC;
  layout?: ({ children }: { children: ReactNode }) => ReactNode;
};
