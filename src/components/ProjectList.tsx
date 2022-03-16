import { Project as ProjectType, ProjectTag, Tag } from "@prisma/client";
import { Project } from "./Project";

type SerializedProject = ProjectType & {
  image_url: string;
  tags: (ProjectTag & {
    tag: Tag;
  })[];
}

type ProjectListProps = {
  projects: SerializedProject[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="flex-1">
      <div className="p-4 bg-white rounded-xl">
        <span className="text-lg text-gray-800">Projetos ({projects.length})</span>
      </div>

      <div className="flex flex-col mt-4 gap-9">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-4 bg-white shadow-lg rounded-xl sm:flex-row sm:gap-4">
            <span className="text-sm text-gray-700">Sem projetos cadastrados</span>
          </div>
        ) : (
          projects.map(project => <Project key={project.id} project={project} />)
        )}
      </div>
    </div>
  )
}