import { FiCamera } from 'react-icons/fi';
import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";

export default function UpdateProfile() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
        <form className="w-full sm:w-1/2">
          <DashForm title="Editar perfil">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Avatar
              <div
                className="p-2 cursor-pointer flex items-center justify-center text-gray-900 border-2 h-48 border-gray-200 rounded-full bg-gray-50"
              >
                <FiCamera className="text-gray-700 h-14 w-14" />
              </div>
              <input type="file" className="hidden" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Nome
              <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Título
              <textarea className="p-2 text-gray-900 border-2 h-40 border-gray-200 rounded-sm resize-none bg-gray-50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Email
              <input type="email" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Número de celular
              <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Número de celular
              <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Github
              <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
            </label>
            <button className="p-2 bg-blue-500 text-white rounded transition-all hover:brightness-95">Confirmar</button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}