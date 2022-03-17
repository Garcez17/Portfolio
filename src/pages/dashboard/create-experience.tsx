import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";
import { api } from '../../services/api';
import Image from 'next/image';

type FormInputData = {
  image: FileList;
  title: string;
  description: string;
  start: string;
  end: string;
}

export default function CreateExperience() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>();

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
  });

  const { image } = watch();

  useEffect(() => {
    if (image?.length > 0) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  async function handleCreateExperience({ title, image, description, start, end }: FormInputData) {
    const data = new FormData();

    data.append('title', title);
    data.append('description', description);
    data.append('image', image[0]);
    data.append('start', start);
    data.append('end', end);

    await api.post('/experiences/create', data);

    router.push('/dashboard');
  }

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex justify-center flex-1 px-2 py-4 overflow-auto">
        <form className="w-full sm:w-1/2" onSubmit={handleSubmit(handleCreateExperience)}>
          <DashForm title="Criar Experiência">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Imagem
              <div
                className="flex relative items-center justify-center h-48 p-2 text-gray-900 border-2 border-gray-200 rounded-sm cursor-pointer bg-gray-50"
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
                className="p-2 text-gray-900 border-2 h-40 border-gray-200 rounded-sm resize-none bg-gray-50"
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
              className="p-2 bg-blue-500 text-white rounded transition-all hover:brightness-95"
            >
              Confirmar
            </button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}