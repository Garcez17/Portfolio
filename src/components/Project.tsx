import Image from "next/image";

export function Project() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row sm:gap-4">
      <div className="h-48 w-full relative sm:flex-1 sm:h-auto">
        <Image
          src="https://avatars.githubusercontent.com/u/60040026?v=4"
          layout="fill"
          alt="profile-pic"
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col mt-6 sm:w-3/5 sm:mt-0">
        <div className="grid grid-flow-col auto-cols-max gap-2">
          <span className="text-gray-800 text-xs">#ReactJS</span>
          <span className="text-gray-800 text-xs">#Typescript</span>
          <span className="text-gray-800 text-xs">#Responsivo</span>
          <span className="text-gray-800 text-xs">#Redux</span>
        </div>

        <div className="mt-6">
          <strong className="text-gray-900 text-2xl">Phonebook</strong>
          <p className="text-gray-700">In this project, I work with HTML and CSS to create a responsive page. This page is similiar with instagram profile page. The design is from devchallenge.io</p>
        </div>

        <div className="mt-10 flex gap-2">
          <a href="#" className="bg-blue-500 h-12 w-36 flex items-center justify-center rounded-lg text-white hover:bg-blue-600 transition-colors">Demo</a>
          <button className="bg-transparent h-12 w-28 flex items-center justify-center border-2 border-blue-500 rounded-lg text-blue-500 hover:border-blue-600 hover:text-blue-600 transition-colors">Código</button>
        </div>
      </div>
    </div>
  )
}