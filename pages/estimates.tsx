import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { dedupExchange, defaultExchanges, fetchExchange } from 'urql'
import AddAssemblyToEstimateForm from '../components/AddAssemblyToEstimateForm'
import AssemblyItemDetails from '../components/AssemblyItemDetails'
import { useEstimateQuery } from '../generated/graphql'
import schema from '../generated/graphql.schema'

const Estimates: NextPage = () => {
  const [result] = useEstimateQuery()

  if (!result.data) return <div>Loading...</div>

  if (result.error) return <div>Something went wrong.</div>

  const estimateTotal = result.data?.estimate.assemblies.reduce((total, assembly) => {
    const assemblyTotal = assembly.items.reduce(
      (total, item) => total + item.quantity * item.cost,
      0
    )

    return total + assembly.quantity * assemblyTotal
  }, 0)

  return (
    <>
      <AddAssemblyToEstimateForm />
      <div>Estimate Total: {estimateTotal}</div>
      {result.data?.estimate.assemblies.map((assembly) => {
        const assemblyTotal = assembly.items.reduce(
          (total, item) => total + item.quantity * item.cost,
          0
        )

        return (
          <div key={assembly.id}>
            <div>
              {assembly.assembly} - Quantity: {assembly.quantity} - Assembly Total: {assemblyTotal}
            </div>
            <div>
              {assembly.items.map((item) => (
                <AssemblyItemDetails key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default withUrqlClient((_ssrExchange, _ctx) => ({
  url: 'http://localhost:8080',
  exchanges: [devtoolsExchange, dedupExchange, cacheExchange({ schema }), fetchExchange],
}))(Estimates)
