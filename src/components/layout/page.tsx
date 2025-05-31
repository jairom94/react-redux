import React, { type ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}
const Page = ({ title, children }: PageProps) => {
  return (
    <div className="">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Page;
