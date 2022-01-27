import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { useEstimateQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const { isLoading, isError, data } = useEstimateQuery()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong.</div>

  const totalCost = data?.estimate.estimateAssemblies.reduce(
    (acc, estimate) => acc + estimate.quantity * estimate.cost,
    0
  )

  return (
    <div>
      <div>Project Total: {totalCost}</div>
      {data?.estimate.estimateAssemblies.map((assembly) => {
        const assemblyTotal = assembly.quantity * assembly.cos

        return (
          <div key={assembly.id}>
            {assembly.assembly} - Quantity: {assembly.quantity} - Cost: {assembly.cost} - Assembly
            Total: {assemblyTotal}
          </div>
        )
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(useEstimateQuery.getKey(), useEstimateQuery.fetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
