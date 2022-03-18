import { Tag } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteModal } from "./DeleteModal";

type DataListTagProps = {
  tag: Tag;
}

export function DataListTag({ tag }: DataListTagProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <DeleteModal type="tags" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} dataId={tag.id} />
      <div className="flex h-20 bg-white rounded-md">
        <div className="flex flex-1">
          <div className="flex flex-col justify-center flex-1 p-4">
            <h2 className="text-gray-900">{tag.name}</h2>
          </div>

          <div className="flex items-center justify-center w-1/3 gap-0.5">
            <Link href={`/dashboard/update-tag/${tag.id}`}>
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