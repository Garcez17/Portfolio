import { GetServerSideProps } from 'next';
import { Project, ProjectTag, Tag } from '@prisma/client';
import { Autocomplete, TextField } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { DashForm } from "../../../components/dashboard/DashForm";
import { DashboardHeader } from "../../../components/dashboard/Header";
import { api } from '../../../services/api';
import { prisma } from '../../../utils/prisma';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/useAuth';
import { Loading } from '../../../components/Loading';
import { SEO } from '../../../components/SEO';

type UpdateProjectProps = {
  tags: Tag[];
  project: (Project & {
    image_url: string;
    tags: (ProjectTag & {
      tag: Tag;
    })[]
  });
}

type FormInputData = {
  image: FileList;
  title: string;
  description: string;
  demo_url: string;
  repository_url: string;
  state: 'unstarted' | 'development' | 'completed';
}

export default function UpdateProject({ tags, project }: UpdateProjectProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [selectedTags, setSelectedTags] = useState<string[]>(project.tags.map(({ tag }) => tag.name));
  const [previewImage, setPreviewImage] = useState<string>(project.image_url);

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
    defaultValues: {
      demo_url: project.demo_url ?? '',
      description: project.description,
      repository_url: project.repository_url ?? '',
      state: (project.state as any) ?? 'completed',
      title: project.title,
    }
  });

  const { image } = watch();

  useEffect(() => {
    if (image?.length > 0) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  async function handleUpdateProject({ title, demo_url, repository_url, image, description, state }: FormInputData) {
    if (selectedTags.length === 0) return;
    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('demo_url', demo_url);
    data.append('repository_url', repository_url);
    data.append('state', state);
    data.append('project_id', project.id);
    data.append('tags', JSON.stringify(selectedTags));

    if (image) data.append('image', image[0]);

    await api.post('/projects/update', data);

    router.push('/dashboard');
  }

  if (isAuthenticated === 'idle') return <Loading />;

  if (!isAuthenticated) {
    router.push('/login');
    return <div />;
  }

  return (
    <>
      <SEO
        title={`Projeto: ${project.title}`}
      />
      <div className="flex flex-col h-screen">
        <DashboardHeader />
        <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
          <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleUpdateProject)}>
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
                T??tulo
                <input
                  type="text"
                  className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                  {...register('title')}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Descri????o
                <textarea
                  className="h-40 p-2 text-gray-900 border-2 border-gray-200 rounded-sm resize-none bg-gray-50"
                  {...register('description')}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Link demonstra????o
                <input
                  type="text"
                  className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                  {...register('demo_url')}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Link reposit??rio
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
                  options={tags.map(({ name }) => name)}
                  getOptionLabel={option => option}
                  defaultValue={selectedTags}
                  onChange={(_, autoCompleteTags) => setSelectedTags(autoCompleteTags.map(tag => tag))}
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
                  <option value="unstarted">N??o iniciado</option>
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const project = (await prisma.project.findUnique({
    where: {
      id: String(req.params!.project_id),
    },
    include: {
      tags: {
        include: {
          tag: true,
        }
      }
    }
  }))!;

  const serializedProject = {
    ...project,
    image_url: `${process.env.AWS_S3_URL}/${project.image}`,
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString(),
    tags: project.tags.map(projectTag => ({
      ...projectTag,
      created_at: projectTag.created_at.toISOString(),
      updated_at: projectTag.updated_at.toISOString(),
      tag: {
        ...projectTag.tag,
        created_at: projectTag.tag!.created_at.toISOString(),
        updated_at: projectTag.tag!.updated_at.toISOString(),
      },
    }))
  }

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
      project: serializedProject,
    },
  }
}