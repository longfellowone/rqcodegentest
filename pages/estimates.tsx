import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import AddAssemblyToEstimateForm from '../components/AddAssemblyToEstimateForm'
import AssemblyItemDetails from '../components/AssemblyItemDetails'
import { useEstimateQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const { isLoading, isError, data } = useEstimateQuery()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong.</div>

  const estimateTotal = data?.estimate.assemblies.reduce((total, assembly) => {
    const assemblyTotal = assembly.items.reduce(
      (total, item) => total + item.quantity * item.cost,
      0
    )

    return total + assembly.quantity * assemblyTotal
  }, 0)

  // const estimateTotal = data?.estimate.cost

  return (
    <>
      <AddAssemblyToEstimateForm />
      <div>Estimate Total: {estimateTotal}</div>
      {data?.estimate.assemblies.map((assembly) => {
        const assemblyTotal = assembly.items.reduce(
          (total, item) => total + item.quantity * item.cost,
          0
        )

        // const assemblyTotal = assembly.cost

        return (
          <>
            <div key={assembly.id}>
              {assembly.assembly} - Quantity: {assembly.quantity} - Assembly Total: {assemblyTotal}
            </div>
            <div>
              {assembly.items.map((item) => (
                <AssemblyItemDetails key={item.id} item={item} />
              ))}
            </div>
          </>
        )
      })}
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(useEstimateQuery.getKey(), useEstimateQuery.fetcher())

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

export default Home
