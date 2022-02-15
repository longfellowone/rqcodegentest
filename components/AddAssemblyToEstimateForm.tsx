// import { NextPage } from 'next'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import { useAddAssemblyToEstimateMutation } from '../generated/graphql'

// interface Props {}

// interface FormValues {
//   id: string
//   quantity: number
// }

// const AddAssemblyToEstimateForm: NextPage<Props> = () => {
//   const { register, handleSubmit } = useForm<FormValues>()

//   const [mutateResult, mutate] = useAddAssemblyToEstimateMutation()

//   mutateResult.error && console.log(mutateResult.error.message)

//   const onSubmit: SubmitHandler<FormValues> = (form) => {
//     const estimateID = '00000000-0000-0000-0000-000000000001'

//     mutate({ id: estimateID, input: { assemblyId: form.id, quantity: form.quantity } })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label htmlFor="id">Assembly ID:</label>
//         <input type="text" className="" id="id" {...register('id')} />
//         <label htmlFor="quantity">Quantity:</label>
//         <input type="number" id="quantity" {...register('quantity', { valueAsNumber: true })} />
//         <input type="submit" />
//       </form>
//     </>
//   )
// }
// export default AddAssemblyToEstimateForm
