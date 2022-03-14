import { useRouter } from "next/router";
import { FiArrowLeft, FiSettings } from "react-icons/fi";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between w-full h-24 px-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-gray-800">Painel de administração</h1>
        {router.asPath !== '/dashboard' && (
          <button type="button" className="p-2 rounded border-2 transition-all hover:brightness-95" onClick={() => router.back()}>
            <FiArrowLeft className="text-gray-700" />
          </button>
        )}
      </div>
      <a href="#" className="text-2xl text-gray-800">
        <FiSettings />
      </a>
    </header>
  )
}