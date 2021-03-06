import { Project, ProjectTag, Tag } from "@prisma/client";
import Image from "next/image";

type SerializedProject = Project & {
  image_url: string;
  tags: (ProjectTag & {
    tag: Tag;
  })[];
}

type ProjectProps = {
  project: SerializedProject;
}

export function Project({ project }: ProjectProps) {
  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-xl sm:flex-row sm:gap-4">
      <div className="relative w-full h-48 sm:flex-1 sm:h-auto">
        <Image
          src={project.image_url}
          layout="fill"
          alt={project.title}
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col mt-6 sm:w-3/5 sm:mt-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(({ tag }) => (
            <span className="text-xs text-gray-800" key={tag.id}>{tag.name}</span>
          ))}
        </div>

        <div className="mt-6">
          <strong className="text-2xl text-gray-900">{project.title}</strong>
          <p className="text-gray-700">{project.description}</p>
        </div>

        <div className="flex gap-2 mt-10">
          {project.demo_url &&
            <a
              href={project.demo_url}
              className="flex items-center justify-center h-12 text-white transition-colors bg-blue-500 rounded-lg w-36 hover:bg-blue-600"
              rel="noreferrer"
              target="_blank"
            >
              Demo
            </a>
          }
          {project.repository_url &&
            <a
              href={project.repository_url}
              className="flex items-center justify-center h-12 text-blue-500 transition-colors bg-transparent border-2 border-blue-500 rounded-lg w-28 hover:border-blue-600 hover:text-blue-600"
              rel="noreferrer"
              target="_blank"
            >
              Código
            </a>
          }
        </div>
      </div>
    </div>
  )
}