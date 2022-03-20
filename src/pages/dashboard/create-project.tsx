import { GetServerSideProps } from 'next';
import { Tag } from '@prisma/client';
import { Autocomplete, TextField } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";
import { api } from '../../services/api';
import { prisma } from '../../utils/prisma';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../components/Loading';

type CreateProjectProps = {
  tags: Tag[];
}

type FormInputData = {
  image: FileList;
  title: string;
  description: string;
  demo_url: string;
  repository_url: string;
  state: 'unstarted' | 'development' | 'completed';
}

export default function CreateProject({ tags }: CreateProjectProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>();

  const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.mixed().test('has_image', () => {
      if (previewImage) return true;

      return false;
    }),
    demo_url: yup.string().optional(),
    repository_url: yup.string().when('state', {
      is: (state: string) => state !== 'unstarted',
      then: yup.string().required(),
    }),
    state: yup.string().required(),
  }).required();

  const { register, handleSubmit, watch } = useForm<FormInputData>({
    resolver: yupResolver(schema),
  });

  const { image } = watch();

  useEffect(() => {
    if (image?.length > 0) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  async function handleCreateProject({ title, demo_url, repository_url, image, description, state }: FormInputData) {
    if (selectedTags.length === 0) return;

    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('image', image[0]);
    data.append('demo_url', demo_url);
    data.append('repository_url', repository_url);
    data.append('state', state);
    data.append('tags', JSON.stringify(selectedTags));

    await api.post('/projects/create', data);

    router.push('/dashboard');
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
        <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleCreateProject)}>
          <DashForm title="Criar Projeto">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Capa
              <div
                className="relative flex items-center justify-center h-48 p-2 text-gray-900 border-2 border-gray-200 rounded-sm cursor-pointer bg-gray-50"
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    layout="fill"
                    alt="uploaded image"
                  />
                ) : (
                  <FiCamera className="text-gray-700 h-14 w-14" />
                )}
              </div>
              <input type="file" className="hidden" {...register('image')} />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Título
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('title')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Descrição
              <textarea
                className="h-40 p-2 text-gray-900 border-2 border-gray-200 rounded-sm resize-none bg-gray-50"
                {...register('description')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Link demonstração
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('demo_url')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Link repositório
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('repository_url')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Tags
              <Autocomplete
                multiple
                className="px-2 border-2 bg-gray-50"
                id="tags-standard"
                options={tags}
                getOptionLabel={option => option.name}
                onChange={(_, autoCompleteTags) => setSelectedTags(autoCompleteTags.map(tag => tag.name))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Selecione as tags"
                  />
                )}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Estado do projeto
              <select
                defaultValue="completed"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register("state")}
              >
                <option value="unstarted">Não iniciado</option>
                <option value="development">Desenvolvendo</option>
                <option value="completed">Completo</option>
              </select>
            </label>
            <button
              className="p-2 text-white transition-all bg-blue-500 rounded hover:brightness-95"
              type="submit"
            >
              Confirmar
            </button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = (await prisma.tag.findMany()).map(tag => {
    return {
      ...tag,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at.toISOString(),
    }
  });

  return {
    props: {
      tags,
    },
  }
}