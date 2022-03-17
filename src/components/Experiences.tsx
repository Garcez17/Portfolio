import { Experience as ExperienceType } from "@prisma/client";
import { Experience } from "./Experience";

type ExperiencesProps = {
  experiences: (ExperienceType & {
    image_url: string;
  })[];
}

export function Experiences({ experiences }: ExperiencesProps) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl h-fit md:w-1/3">
      <h2 className="text-gray-800 text-1xl">Experiências & Certificados</h2>

      <div className="flex flex-col justify-center gap-6 mt-4">
        {experiences.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-sm text-gray-700">Sem resultados</span>
          </div>
        ) : (
          experiences.map(experience => <Experience key={experience.id} experience={experience} />)
        )}
      </div>
    </div>
  )
}