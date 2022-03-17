import { Project, ProjectTag, Tag } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiTrash } from "react-icons/fi";

type DataListProjectProps = {
  project: (Project & {
    image_url: string;
    tags: (ProjectTag & {
      tag: Tag;
    })[]
  })
};

export function DataListProject({ project }: DataListProjectProps) {
  return (
    <div className="flex h-20 bg-white rounded-md">
      <div className="relative w-24 h-full">
        <Image
          src={project.image_url}
          alt={project.title}
          layout="fill"
          className="rounded-l-md"
        />
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col justify-end py-4 px-2">
          <h2 className="text-gray-900">{project.title}</h2>
          <div className="flex gap-1">
            {project.tags.map(({ tag }) => <span key={tag.id} className="text-xs text-gray-700">{tag.name}</span>)}
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end md:pr-4 w-1/3 gap-0.5 flex-1">
          <Link href={`/dashboard/update-project/${project.id}`}>
            <a className="p-1.5 text-xl md:p-2 text-gray-800 transition-all bg-gray-100 rounded-l-md hover:brightness-95">
              <FiEdit />
            </a>
          </Link>
          <a href="#" className="p-1.5 text-xl md:p-2 text-gray-800 transition-all bg-gray-100 rounded-r-md hover:brightness-95">
            <FiTrash />
          </a>
        </div>
      </div>
    </div>
  )
}