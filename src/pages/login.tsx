import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

type FormInputData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();

  const schema = yup.object({
    name: yup.string().email().required(),
    password: yup.string().required(),
  }).required();

  const { register, handleSubmit } = useForm<FormInputData>();

  async function handleSignIn({ email, password }: FormInputData) {
    try {
      await signIn({
        email,
        password,
      });

      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  if (isAuthenticated === 'idle') return <Loading />;

  if (isAuthenticated) {
    router.push('/dashboard');
    return <div />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8 bg-white rounded-md py-6 px-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Acessar dashboard</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                {...register('email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                {...register('password')}
              />
            </div>
          </div>

          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}