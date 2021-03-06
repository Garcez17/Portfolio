import Image from "next/image";
import { User } from "@prisma/client";
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi';

type HeaderProps = {
  user: (User & {
    avatar_url: string;
  });
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex flex-col w-full p-4 bg-white shadow-lg rounded-xl sm:flex-row sm:gap-4 md:h-72">
      <div className="relative w-full h-64 sm:h-full sm:w-72">
        <Image
          src={user.avatar_url}
          layout="fill"
          alt={user.name}
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-col flex-1 gap-4 mt-5 sm:mt-0">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl text-gray-800">{user.name}</h1>
            <span className="text-lg text-gray-700">{user.title}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <a
              href="mailto:ggarcez613@gmail.com"
              className="flex items-center gap-2 text-base text-gray-800"
              rel="noreferrer"
              target="_blank"
            >
              <FiMail />
              {user.email}
            </a>
            <a
              href="https://wa.me/5571981913913"
              className="flex items-center gap-2 text-base text-gray-800"
              rel="noreferrer"
              target="_blank"
            >
              <FiPhone />
              {user.phone_number}
            </a>
            <a
              href="https://github.com/Garcez17"
              className="flex items-center gap-2 text-base text-gray-800"
              rel="noreferrer"
              target="_blank"
            >
              <FiGithub />
              {user.github_username}
            </a>
          </div>
        </div>

        <p className="text-lg text-gray-700">
          {user.about}
        </p>
      </div>
    </header>
  )
}