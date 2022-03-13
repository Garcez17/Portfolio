import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";

export default function CreateProject() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <form className="flex-1 px-2 py-4">
        <DashForm title="Criar Projeto">
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Título
            <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Descrição
            <textarea className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm resize-none bg-gray-50" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Link demonstração
            <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Link repositório
            <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" />
          </label>
        </DashForm>
      </form>
    </div>
  )
}