import Image from "next/image";
import { User } from "@prisma/client";
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi';

type HeaderProps = {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex flex-col w-full p-4 bg-white shadow-lg rounded-xl sm:flex-row sm:gap-4 md:h-72">
      <div className="relative w-full h-64 sm:h-full sm:w-72">
        <Image
          src={user.avatar}
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
            <a href="#" className="flex items-center gap-2 text-base text-gray-800">
              <FiMail />
              {user.email}
            </a>
            <a href="#" className="flex items-center gap-2 text-base text-gray-800">
              <FiPhone />
              {user.phone_number}
            </a>
            <a href="#" className="flex items-center gap-2 text-base text-gray-800">
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