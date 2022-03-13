import { FiPlus } from "react-icons/fi"
import { DataListItem } from "./DataListItem"

type DataListProps = {
  title: string;
}

export function DataList({ title }: DataListProps) {
  return (
    <div className="flex flex-col p-4 h-80 md:h-full md:flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-800 md:text-xl">{title}</h2>
        <a href="#" className="text-2xl text-gray-800">
          <FiPlus />
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4 overflow-auto">
        <div className="flex items-center justify-center flex-1">
          <p className="text-xs text-gray-700">Sem {title.toLowerCase()} cadastrados.</p>
        </div>
        {/* <DataListItem />
        <DataListItem />
        <DataListItem />
        <DataListItem />
        <DataListItem /> */}
      </div>
    </div>
  )
}