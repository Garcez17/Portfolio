import { Experience } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

import { DeleteModal } from "./DeleteModal";

type DataListExperienceProps = {
  experience: (Experience & {
    image_url: string;
  });
}

export function DataListExperience({ experience }: DataListExperienceProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <DeleteModal type="experiences" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} dataId={experience.id} />
      <div className="flex h-20 bg-white rounded-md">
        <div className="relative w-24 h-full">
          <Image
            src={experience.image_url}
            alt={experience.title}
            layout="fill"
            className="rounded-l-md"
          />
        </div>

        <div className="flex flex-1">
          <div className="flex flex-col justify-end px-2 py-4">
            <h2 className="text-sm text-gray-900">{experience.title}</h2>
            <div className="flex gap-1">
              <span className="text-xs text-gray-700">{experience.start} - {experience.end || 'Atualmente'}</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end md:pr-4 w-1/3 gap-0.5 flex-1">
            <Link href={`/dashboard/update-experience/${experience.id}`}>
              <a className="p-1.5 text-xl md:p-2 text-gray-800 transition-all bg-gray-100 rounded-l-md hover:brightness-95">
                <FiEdit />
              </a>
            </Link>
            <button
              type="button"
              className="p-1.5 text-xl md:p-2 text-gray-800 transition-all bg-gray-100 rounded-r-md hover:brightness-95"
              onClick={() => setModalIsOpen(true)}
            >
              <FiTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}