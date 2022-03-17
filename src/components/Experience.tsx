import Image from "next/image";
import { Experience } from "@prisma/client";

type ExperienceProps = {
  experience: (Experience & {
    image_url: string;
  });
}

export function Experience({ experience }: ExperienceProps) {
  console.log(experience);
  return (
    <div className="flex gap-4">
      <div className="relative w-16 h-16">
        <Image src={experience.image_url} alt={experience.title} layout="fill" className="rounded-full" />
      </div>
      <div className="flex-1">
        <span className="text-sm text-gray-700">{experience.start} - {experience.end || 'Atualmente'}</span>
        <h3 className="mt-2 text-gray-900">{experience.title}</h3>

        <p className="mt-4 text-gray-700">{experience.description}</p>
      </div>
    </div>
  )
}