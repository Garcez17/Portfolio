import { Experience } from "./Experience";

export function Experiences() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-gray-800 text-1xl">Experiências & Certificados</h2>

      <div className="flex flex-col gap-6 mt-4">
        <Experience />
        <Experience />
        <Experience />
      </div>
    </div>
  )
}