import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import ProjectDetail from '../components/ProjectDetail'
import { ProjectsQuery, useProjectsQuery } from '../generated/graphql'

// For config and tailwind setup
// https://github.com/longfellowone/cloud-client

const Home: NextPage = () => {
  const refetchInterval = { refetchInterval: 1000 }
  const { isLoading, isError, data } = useProjectsQuery({}, refetchInterval)

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong.</div>

  return (
    <div>
      {data?.projects.map((project) => (
        <ProjectDetail key={project.id} project={project} />
      ))}
    </div>
  )
}
;``

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(useProjectsQuery.getKey(), useProjectsQuery.fetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
