import { GetServerSideProps } from "next";
import { Tag } from "@prisma/client";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { DashForm } from "../../../components/dashboard/DashForm";
import { DashboardHeader } from "../../../components/dashboard/Header";
import { api } from "../../../services/api";
import { prisma } from "../../../utils/prisma";
import { useAuth } from "../../../hooks/useAuth";
import { Loading } from "../../../components/Loading";

type UpdateTagProps = {
  tag: Tag;
}

type FormInputData = {
  name: string;
}

export default function UpdateTag({ tag }: UpdateTagProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const schema = yup.object({
    name: yup.string().required(),
  }).required();

  const { register, handleSubmit } = useForm<FormInputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: tag.name,
    }
  });

  async function handleUpdateTag({ name }: FormInputData) {
    try {
      await api.post('/tags/update', { name, tag_id: tag.id });

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
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
        <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleUpdateTag)}>
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
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const tag = (await prisma.tag.findUnique({
    where: {
      id: String(req.params!.tag_id),
    }
  }))!;

  const serializedTag = {
    ...tag,
    created_at: tag.created_at.toISOString(),
    updated_at: tag.updated_at.toISOString(),
  }

  return {
    props: {
      tag: serializedTag,
    },
  }
}