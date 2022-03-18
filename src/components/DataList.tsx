import Link from "next/link"
import { FiPlus } from "react-icons/fi"

import { DataListTag } from "./DataListTag"
import { DataListProject } from "./DataListProject"
import { DataListExperience } from "./DataListExperience"

type DataListProps = {
  data: any;
  type: 'experiences' | 'projects' | 'tags';
}

export function DataList({ type, data }: DataListProps) {
  const title = type === 'tags'
    ? 'Tags'
    : type === 'experiences'
      ? 'Experiências e Certificados'
      : 'Projetos'

  return (
    <div className="flex flex-col p-4 h-80 md:h-full md:flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-800 md:text-xl">
          {title}
        </h2>
        <Link
          href={type === 'experiences'
            ? '/dashboard/create-experience'
            : type === 'tags'
              ? '/dashboard/create-tag'
              : '/dashboard/create-project'}
        >
          <a className="text-2xl text-gray-800">
            <FiPlus />
          </a>
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4 overflow-auto">
        {data.length === 0 || !data ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-xs text-gray-700">Sem {title.toLowerCase()} cadastrados.</p>
          </div>
        ) : (
          type === 'tags'
            ? data.map((data: any) => <DataListTag key={data.id} tag={data} />)
            : type === 'projects'
              ? data.map((data: any) => <DataListProject key={data.id} project={data} />)
              : data.map((data: any) => <DataListExperience key={data.id} experience={data} />)
        )}
      </div>
    </div>
  )
}