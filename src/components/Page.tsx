import { FC, ReactNode } from "react";
import classNames from "classnames";

import Navbar from "./Navbar";

export interface PageProps {
  contentClass?: string;
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ contentClass, children }) => {
  return (
    <div className="w-100">
      <Navbar />
      {/* Let's use the classnames package here */}
      <div className={classNames("page-content", contentClass)}>{children}</div>
    </div>
  );
};

export default Page;
