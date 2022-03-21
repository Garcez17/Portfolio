import { useRouter } from "next/router";
import { FiArrowLeft, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

export function DashboardHeader() {
  const router = useRouter();
  const { signOutUser } = useAuth();

  async function handleSignOut() {
    await signOutUser();

    router.push('/login');
  }

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
      <div className="flex gap-6">
        <a href="#" className="text-2xl text-gray-800 transition-all hover:brightness-50">
          <FiSettings />
        </a>
        <button
          type="button"
          className="text-2xl text-gray-800 transition-all hover:brightness-50"
          onClick={handleSignOut}
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  )
}