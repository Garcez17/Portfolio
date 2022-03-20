import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

export default function SignIn() {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated === 'idle') return <Loading />;

  if (isAuthenticated) {
    router.push('/dashboard');
    return <div />;
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    await signIn({
      email,
      password,
    });
  }

  return (
    <div>
      <h1>Login!</h1>
      <form onSubmit={handleSignIn}>
        <input type="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}