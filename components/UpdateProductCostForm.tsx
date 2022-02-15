import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateProductMutation } from '../generated/graphql'

interface Props {}

interface FormValues {
  id: string
  cost: number
}

const UpdateProductCostForm: NextPage<Props> = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const [mutateResult, mutate] = useUpdateProductMutation()

  mutateResult.error && console.log(mutateResult.error.message)

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    let productId = '00000000-0000-0000-0000-000000000003'

    mutate({ input: { productId: productId, cost: form.cost, labour: form.cost } })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">Proudct ID:</label>
        <input type="text" className="" id="id" {...register('id')} />
        <label htmlFor="cost">Cost:</label>
        <input type="number" id="cost" {...register('cost', { valueAsNumber: true })} />
        <input type="submit" />
      </form>
    </>
  )
}
export default UpdateProductCostForm
