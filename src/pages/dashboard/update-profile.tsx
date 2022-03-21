import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera } from 'react-icons/fi';
import * as yup from "yup";

import { DashForm } from "../../components/dashboard/DashForm";
import { DashboardHeader } from "../../components/dashboard/Header";
import { Loading } from '../../components/Loading';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { prisma } from '../../utils/prisma';

type UpdateProfileProps = {
  user: (User & {
    avatar_url: string;
  });
}

type FormInputData = {
  name: string;
  email: string;
  image: FileList;
  title: string;
  about: string;
  github_username: string;
  phone_number: string;
}

export default function UpdateProfile({ user }: UpdateProfileProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [previewImage, setPreviewImage] = useState<string>(user.avatar_url);

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    image: yup.mixed().test('has_image', () => {
      if (previewImage) return true;

      return false;
    }),
    title: yup.string().required(),
    github_username: yup.string().required(),
    phone_number: yup.string().required()
      .test('verifyCharacters', (value) => {
        const trattedValue = value!.replaceAll(/[-_()\s+]/g, '');

        if (trattedValue.length === 11) return true;

        return false;
      })
  }).required();

  const { register, handleSubmit, watch } = useForm<FormInputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      about: user.about,
      email: user.email,
      github_username: user.github_username,
      name: user.name,
      phone_number: user.phone_number,
      title: user.title,
    }
  });

  const { image } = watch();

  useEffect(() => {
    if (image?.length > 0) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  async function handleUpdateProfile({ email, github_username, image, name, phone_number, title }: FormInputData) {
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('title', title);
    data.append('phone_number', phone_number);
    data.append('github_username', github_username);
    data.append('user_id', user.id);
    if (image) data.append('image', image[0]);

    await api.post('/users/update', data);

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
        <form className="w-full sm:w-1/3" onSubmit={handleSubmit(handleUpdateProfile)}>
          <DashForm title="Editar perfil">
            <label className="flex flex-col gap-2 text-sm text-gray-700 items-center">
              Avatar
              <div
                className="flex relative items-center justify-center h-48 w-3/4 sm:w-1/2 p-2 text-gray-900 border-2 border-gray-200 rounded-2xl cursor-pointer bg-gray-50"
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    layout="fill"
                    alt="uploaded image"
                    className="rounded-2xl"
                  />
                ) : (
                  <FiCamera className="text-gray-700 h-14 w-14" />
                )}
              </div>
              <input type="file" className="hidden" {...register('image')} />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Nome
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('name')}
              />
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
              Sobre
              <textarea
                className="h-40 p-2 text-gray-900 border-2 border-gray-200 rounded-sm resize-none bg-gray-50"
                {...register('about')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Email
              <input
                type="email"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('email')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Número de celular
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('phone_number')}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Github
              <input
                type="text"
                className="p-2 text-gray-900 border-2 border-gray-200 rounded-sm bg-gray-50"
                {...register('github_username')}
              />
            </label>
            <button className="p-2 text-white transition-all bg-blue-500 rounded hover:brightness-95">Confirmar</button>
          </DashForm>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const user = (await prisma.user.findFirst())!;

  const serializedUser = {
    ...user,
    avatar_url: `https://app-portfolio-gz.s3.amazonaws.com/${user.avatar}`,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  }

  return {
    props: {
      user: serializedUser,
    },
  }
}