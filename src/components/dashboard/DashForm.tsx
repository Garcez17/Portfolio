import { ReactNode } from "react";

type DashFormProps = {
  title: string;
  children: ReactNode;
}

export function DashForm({ children, title }: DashFormProps) {
  return (
    <div className="flex flex-col bg-white border-2 border-gray-200 rounded-md">
      <div className="p-4 border-b-2">
        <h2 className="text-xl text-gray-800">{title}</h2>
      </div>
      <div className="flex flex-col gap-4 px-4 py-6">
        {children}
      </div>
    </div>
  )
}