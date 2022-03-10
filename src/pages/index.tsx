import type { NextPage } from 'next'

import { Header } from '../components/Header'
import { ProjectList } from '../components/ProjectList'
import { Experiences } from '../components/Experiences'

const Home: NextPage = () => {
  return (
    <div className="container p-4">
      <Header />

      <div className="flex flex-col-reverse">
        <Experiences />
        <ProjectList />
      </div>
    </div>
  )
}

export default Home
