import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';

import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";
import { Loading } from '../../components/Loading';

import { useAuth } from '../../hooks/useAuth';

export default function UpdateProfile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated === 'idle') return <Loading />;

  if (!isAuthenticated) {
    router.push('/login');
    return <div />;
  }

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
        <form className="w-full sm:w-1/2">
          <DashForm title="Editar perfil">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Avatar
              <div
                className="flex items-center justify-center h-48 p-2 text-gray-900 border-2 border-gray-200 rounded-full cursor-pointer bg-gray-50"
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
              <textarea className="h-40 p-2 text-gray-900 border-2 border-gray-200 rounded-sm resize-none bg-gray-50" />
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
            <button className="p-2 text-white transition-all bg-blue-500 rounded hover:brightness-95">Confirmar</button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}