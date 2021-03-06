import { GetServerSideProps } from 'next';
import { Experience, Project, ProjectTag, Tag, User } from '@prisma/client';

import { Header } from '../components/Header';
import { ProjectList } from '../components/ProjectList';
import { Experiences } from '../components/Experiences';

import { prisma } from '../utils/prisma';
import { SEO } from '../components/SEO';

type SerializedProject = Project & {
  image_url: string;
  tags: (ProjectTag & {
    tag: Tag;
  })[];
}

type HomeProps = {
  user: (User & {
    avatar_url: string;
  });
  experiences: (Experience & {
    image_url: string;
  })[];
  projects: SerializedProject[];
}

export default function Home({ user, experiences, projects }: HomeProps) {
  return (
    <>
      <SEO
        title="Home"
        shouldIndexPage
      />
      <div className="flex justify-center w-full h-full">
        <div className="container flex flex-col items-center gap-6 p-4">
          <Header user={user} />

          <div className="flex flex-col-reverse w-full gap-16 md:flex-row md:gap-4">
            <Experiences experiences={experiences} />
            <ProjectList projects={projects} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const user = (await prisma.user.findFirst())!;
  const experiences = await prisma.experience.findMany();
  const projects = await prisma.project.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        }
      },
    }
  });

  const serializedUser = {
    ...user,
    avatar_url: `${process.env.AWS_S3_URL}/${user.avatar}`,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  }

  const serializedExperiences = experiences.map(experience => {
    return {
      ...experience,
      image_url: `${process.env.AWS_S3_URL}/${experience.image}`,
      created_at: experience.created_at.toISOString(),
      updated_at: experience.updated_at.toISOString(),
    }
  });

  const serializedProjects = projects.map(project => {
    return {
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
  })

  return {
    props: {
      user: serializedUser,
      experiences: serializedExperiences,
      projects: serializedProjects,
    }
  }
}