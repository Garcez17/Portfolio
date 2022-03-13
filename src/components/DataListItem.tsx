import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";

export function DataListItem() {
  return (
    <div className="flex h-20 bg-white rounded-md">
      <div className="relative w-24 h-full">
        <Image
          src="https://avatars.githubusercontent.com/u/60040026?v=4"
          alt="project"
          layout="fill"
          className="rounded-l-md"
        />
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col justify-end flex-1 p-4">
          <h2 className="text-gray-900">Phonebook</h2>
          <div className="flex gap-1">
            <span className="text-xs text-gray-700">#ReactJS</span>
            <span className="text-xs text-gray-700">#ReactJS</span>
            <span className="text-xs text-gray-700">#ReactJS</span>
          </div>
        </div>

        <div className="flex items-center justify-center w-1/3 gap-0.5">
          <a href="#" className="p-2 text-2xl text-gray-800 transition-all bg-gray-100 rounded-l-md hover:brightness-95">
            <FiEdit />
          </a>
          <a href="#" className="p-2 text-2xl text-gray-800 transition-all bg-gray-100 rounded-r-md hover:brightness-95">
            <FiTrash />
          </a>
        </div>
      </div>
    </div>
  )
}