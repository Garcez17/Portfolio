import { GetServerSideProps } from 'next';
import Image from 'next/image';
import * as yup from "yup";
import { useRouter } from 'next/router';
import { Experience } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { DashForm } from "../../../components/dashboard/DashForm";
import { DashboardHeader } from "../../../components/dashboard/Header";
import { Loading } from '../../../components/Loading';

import { api } from '../../../services/api';
import { prisma } from '../../../utils/prisma';
import { useAuth } from '../../../hooks/useAuth';

type UpdateExperienceProps = {
  experience: (Experience & {
    image_url: string;
  });
}

type FormInputData = {
  image: FileList;
  title: string;
  description: string;
  start: string;
  end: string;
}

export default function UpdateExperience({ experience }: UpdateExperienceProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [previewImage, setPreviewImage] = useState<string>(experience.image_url);

  const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.mixed().test('has_image', () => {
      if (previewImage) return true;

      return false;
    }),
    start: yup.string().required(),
    end: yup.string().optional(),
  }).required();

  const { register, handleSubmit, watch } = useForm<FormInputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: experience.description,
      end: experience.end ?? '',
      start: experience.start,
      title: experience.title,
    }
  });

  const { image } = watch();

  useEffect(() => {
    if (image?.length > 0) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  async function handleUpdateExperience({ title, image, description, start, end }: FormInputData) {
    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('start', start);
    data.append('end', end);
    data.append('experience_id', experience.id);
    if (image) data.append('image', image[0]);

    await api.post('/experiences/update', data);

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
        <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleUpdateExperience)}>
          <DashForm title="Criar Experiência">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Imagem
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
              Inicío
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('start')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Fim
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('end')}
              />
            </label>
            <button
              type="submit"
              className="p-2 text-white transition-all bg-blue-500 rounded hover:brightness-95"
            >
              Confirmar
            </button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const experience = (await prisma.experience.findUnique({
    where: {
      id: String(req.params!.experience_id),
    }
  }))!;

  const serializedExperience = {
    ...experience,
    image_url: `${process.env.AWS_S3_URL}/${experience.image}`,
    created_at: experience.created_at.toISOString(),
    updated_at: experience.updated_at.toISOString(),
  }

  return {
    props: {
      experience: serializedExperience,
    },
  }
}