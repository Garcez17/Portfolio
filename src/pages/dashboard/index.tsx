import { Experience, Project, Tag } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { DashboardHeader } from "../../components/dashboard/Header";
import { DataList } from "../../components/DataList";
import { Loading } from "../../components/Loading";
import { SEO } from "../../components/SEO";

import { useAuth } from "../../hooks/useAuth";
import { prisma } from "../../utils/prisma";

type DashboardProps = {
  experiences: Experience[];
  projects: Project[];
  tags: Tag[];
}

export default function Dahsboard({ projects, experiences, tags }: DashboardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated === 'idle') return <Loading />;

  if (!isAuthenticated) {
    router.push('/login');
    return <div />;
  }

  return (
    <>
      <SEO
        title="Dashboard"
      />
      <div className="flex flex-col justify-center md:h-screen">
        <DashboardHeader />
        <section className="flex flex-col flex-1 overflow-auto divide-x divide-y md:flex-row">
          <DataList type="projects" data={projects} />
          <DataList type="experiences" data={experiences} />
          <DataList type="tags" data={tags} />
        </section>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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

  const tags = await prisma.tag.findMany();

  const serializedTags = tags.map(tag => {
    return {
      ...tag,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at.toISOString(),
    }
  });

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
      experiences: serializedExperiences,
      projects: serializedProjects,
      tags: serializedTags,
    }
  }
}