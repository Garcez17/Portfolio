import { DashboardHeader } from "../../components/dashboard/Header";

import { DataList } from "../../components/DataList";

export default function Dahsboard() {
  return (
    <div className="flex flex-col justify-center md:h-screen">
      <DashboardHeader />
      <section className="flex flex-col flex-1 overflow-auto divide-x divide-y md:flex-row">
        <DataList title="Projetos" />
        <DataList title="Experiências e Certificados" />
        <DataList title="Tags" />
      </section>
    </div>
  )
}