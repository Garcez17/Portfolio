import Image from "next/image";

export function Experience() {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 relative">
        <Image src="https://avatars.githubusercontent.com/u/60040026?v=4" alt="company-image" layout="fill" className="rounded-full" />
      </div>
      <div className="flex-1">
        <span className="text-gray-700 text-sm">Fev 2017 - Atualmente</span>
        <h3 className="text-gray-900 mt-2">Fullstack developer</h3>

        <p className="text-gray-700 mt-4">Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie.</p>
      </div>
    </div>
  )
}