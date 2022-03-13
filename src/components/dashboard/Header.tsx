import { FiSettings } from "react-icons/fi";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between w-full h-24 px-4 bg-white shadow-sm">
      <h1 className="text-gray-800 ">Painel de administração</h1>
      <a href="#" className="text-2xl text-gray-800">
        <FiSettings />
      </a>
    </header>
  )
}