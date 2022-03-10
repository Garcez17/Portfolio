import Image from "next/image";

export function Header() {
  return (
    <header className="p-4 bg-white rounded-xl shadow-lg">
      <div className="h-64 w-full relative">
        <Image
          src="https://avatars.githubusercontent.com/u/60040026?v=4"
          layout="fill"
          alt="profile-pic"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col">
          <h1 className="text-gray-800 text-2xl">Gabriel Garcez</h1>
          <span className="text-gray-700 text-lg">Fullstack developer</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-gray-800 text-lg">ggarcez613@gmail.com</span>
          <span className="text-gray-800 text-lg">(71) 9 8191-3913</span>
          <span className="text-gray-800 text-lg">Garcez17</span>
        </div>

        <p className="text-gray-700 text-lg">
          Desenvolvedor Fullstack React, NodeJS e Typescript.
        </p>
      </div>
    </header>
  )
}