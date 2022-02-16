import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { refocusExchange } from '@urql/exchange-refocus'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'
import UpdateProductCostForm from '../components/UpdateProductCostForm'
import {
  AssemblyComponent,
  EstimateGroup,
  EstimateGroupLineItem,
  useEstimateQuery,
} from '../generated/graphql'
import schema from '../generated/graphql.schema'

const Estimates: NextPage = () => {
  const [{ data, error }] = useEstimateQuery()

  if (!data) return <div>Loading...</div>

  if (error) return <div>Something went wrong.</div>

  const [estimateCostTotal, estimateLabourTotal] = estimateTotals(data.estimate.groups)

  return (
    <>
      <div>
        <UpdateProductCostForm />
      </div>
      <div>
        Estimate - ${estimateCostTotal} - {estimateLabourTotal} minutes
      </div>
      {data?.estimate.groups.map((group) => {
        const [groupCostTotal, groupLabourTotal] = groupTotals(group.lineItems)

        return (
          <ul key={group.id}>
            {group.group} - ${groupCostTotal} - {groupLabourTotal} minutes
            {group.lineItems.map((lineItem) => {
              const [assemblyCostTotal, assemblyLabourTotal] = assemblyTotals(
                lineItem.quantity,
                lineItem.assembly.components
              )

              return (
                <ul key={lineItem.id}>
                  {lineItem.quantity}x {lineItem.assembly.assembly} - ${assemblyCostTotal} -{' '}
                  {assemblyLabourTotal} minutes
                  {lineItem.assembly.components.map((component) => {
                    return (
                      <ul key={component.id}>
                        {component.quantity}x {component.product.product} - $
                        {component.product.cost} - {component.product.labour} minutes
                      </ul>
                    )
                  })}
                </ul>
              )
            })}
          </ul>
        )
      })}
    </>
  )
}

function estimateTotals(group: Array<EstimateGroup>) {
  return group.reduce(
    (total, group) => {
      const [groupCostTotal, groupLabourTotal] = groupTotals(group.lineItems)

      return [total[0] + groupCostTotal, total[1] + groupLabourTotal]
    },
    [0, 0]
  )
}

function groupTotals(lineItems: Array<EstimateGroupLineItem>) {
  return lineItems.reduce(
    (total, lineItem) => {
      const [assemblyCostTotal, assemblyLabourTotal] = assemblyTotals(
        lineItem.quantity,
        lineItem.assembly.components
      )

      return [total[0] + assemblyCostTotal, total[1] + assemblyLabourTotal]
    },
    [0, 0]
  )
}

function assemblyTotals(quantity: number, components: Array<AssemblyComponent>) {
  return components.reduce(
    (total, component) => {
      return [
        total[0] + quantity * component.quantity * component.product.cost,
        total[1] + quantity * component.quantity * component.product.labour,
      ]
    },
    [0, 0]
  )
}

// const toGroupTotal = (total: any, item: EstimateGroupItem) => {
//   return [total[0], total[1]]

//   // const [assemblyCostTotal, assemblyLabourTotal] = assemblyTotals(
//   //   item.quantity,
//   //   item.item.components
//   // )

//   // return [total[0] + assemblyCostTotal, total[1] + assemblyLabourTotal]
// }

// const toComponentsTotals = (total: any, component: AssemblyComponent) => {
//   return [
//     total[0] + component.quantity * component.product.cost,
//     total[1] + component.quantity * component.product.labour,
//   ]
// }

export default withUrqlClient((_ssrExchange, _ctx) => ({
  url: 'http://localhost:8080',
  exchanges: [
    // devtoolsExchange,
    dedupExchange,
    refocusExchange(),
    cacheExchange({ schema }),
    fetchExchange,
  ],
}))(Estimates)
