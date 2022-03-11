import { Project } from "./Project";

export function ProjectList() {
  return (
    <div className="flex-1">
      <div className="bg-white p-4 rounded-xl">
        <span className="text-gray-800 text-lg">Projetos (3)</span>
      </div>

      <div className="mt-4 flex flex-col gap-9">
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  )
}