import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import { SEO } from "../../components/SEO";

type FormInputData = {
  name: string;
}

export default function CreateTag() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const schema = yup.object({
    name: yup.string().required(),
  }).required();

  const { register, handleSubmit } = useForm<FormInputData>({
    resolver: yupResolver(schema),
  });

  async function handleCreateTag({ name }: FormInputData) {
    try {
      await api.post('/tags/create', { name });

      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  if (isAuthenticated === 'idle') return <Loading />;

  if (!isAuthenticated) {
    router.push('/login');
    return <div />;
  }

  return (
    <>
      <SEO
        title="Criar Tag"
      />
      <div className="flex flex-col h-screen">
        <DashboardHeader />
        <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
          <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleCreateTag)}>
            <DashForm title="Criar Tag">
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Título
                <input type="text" className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50" {...register('name')} />
              </label>
              <button className="p-2 text-white transition-all bg-blue-500 rounded hover:brightness-95">Confirmar</button>
            </DashForm>
          </form>
        </div>
      </div>
    </>
  )
}