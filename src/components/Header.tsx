import Image from "next/image";

export function Header() {
  return (
    <header className="w-full p-4 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row sm:gap-4 md:h-72">
      <div className="h-64 w-full relative sm:h-full sm:w-72">
        <Image
          src="https://avatars.githubusercontent.com/u/60040026?v=4"
          layout="fill"
          alt="profile-pic"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col flex-1 gap-4 mt-5 sm:mt-0">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-gray-800 text-2xl">Gabriel Garcez</h1>
            <span className="text-gray-700 text-lg">Fullstack developer</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-gray-800 text-base">ggarcez613@gmail.com</span>
            <span className="text-gray-800 text-base">(71) 9 8191-3913</span>
          </div>
        </div>

        <p className="text-gray-700 text-lg">
          Desenvolvedor Fullstack React, NodeJS e Typescript.
        </p>
      </div>
    </header>
  )
}