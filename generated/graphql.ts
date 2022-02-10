import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddAssemblyToEstimateInput = {
  assemblyId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
};

export type AddAssemblyToEstimatePayload = {
  __typename?: 'AddAssemblyToEstimatePayload';
  estimate?: Maybe<Estimate>;
};

export type AddItemToAssemblyInput = {
  itemId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type AddItemToAssemblyPayload = {
  __typename?: 'AddItemToAssemblyPayload';
  assembly?: Maybe<Assembly>;
};

export type Assembly = {
  __typename?: 'Assembly';
  assembly: Scalars['String'];
  cost: Scalars['Int'];
  id: Scalars['ID'];
  items: Array<AssemblyItem>;
};

export type AssemblyItem = {
  __typename?: 'AssemblyItem';
  cost: Scalars['Int'];
  id: Scalars['ID'];
  item: Scalars['String'];
  quantity: Scalars['Int'];
};

export type CreateEstimateInput = {
  estimate: Scalars['String'];
  projectId: Scalars['ID'];
};

export type CreateEstimatePayload = {
  __typename?: 'CreateEstimatePayload';
  estimate?: Maybe<Estimate>;
};

export type CreateProjectInput = {
  project: Scalars['String'];
};

export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  project?: Maybe<Project>;
};

export type DeleteEstimateInput = {
  id: Scalars['ID'];
};

export type DeleteEstimatePayload = {
  __typename?: 'DeleteEstimatePayload';
  id: Scalars['ID'];
};

export type DeleteProjectInput = {
  id: Scalars['ID'];
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  id: Scalars['ID'];
};

export type Estimate = {
  __typename?: 'Estimate';
  assemblies: Array<EstimateAssembly>;
  cost: Scalars['Int'];
  estimate: Scalars['String'];
  id: Scalars['ID'];
};

export type EstimateAssembly = {
  __typename?: 'EstimateAssembly';
  assembly: Scalars['String'];
  cost: Scalars['Int'];
  id: Scalars['ID'];
  items: Array<AssemblyItem>;
  quantity: Scalars['Int'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  addAssemblyToEstimate: AddAssemblyToEstimatePayload;
  addItemToAssembly: AddItemToAssemblyPayload;
  createEstimate: CreateEstimatePayload;
  createProject: CreateProjectPayload;
  deleteEstimate: DeleteEstimatePayload;
  deleteProject: DeleteProjectPayload;
  updateAssemblyItemQuantity: UpdateAssemblyItemQuantityPayload;
  updateProject: UpdateProjectPayload;
};


export type MutationRootAddAssemblyToEstimateArgs = {
  id: Scalars['ID'];
  input: AddAssemblyToEstimateInput;
};


export type MutationRootAddItemToAssemblyArgs = {
  id: Scalars['ID'];
  input: AddItemToAssemblyInput;
};


export type MutationRootCreateEstimateArgs = {
  input: CreateEstimateInput;
};


export type MutationRootCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationRootDeleteEstimateArgs = {
  input: DeleteEstimateInput;
};


export type MutationRootDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationRootUpdateAssemblyItemQuantityArgs = {
  id: Scalars['ID'];
  input: UpdateAssemblyItemQuantityInput;
};


export type MutationRootUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type Project = {
  __typename?: 'Project';
  estimates: Array<Estimate>;
  id: Scalars['ID'];
  project: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  assembly: Assembly;
  estimate: Estimate;
  project: Project;
  projects: Array<Project>;
  testEstimate: TestEstimate;
};


export type QueryRootAssemblyArgs = {
  id: Scalars['ID'];
};


export type QueryRootEstimateArgs = {
  id: Scalars['ID'];
};


export type QueryRootProjectArgs = {
  id: Scalars['ID'];
};


export type QueryRootTestEstimateArgs = {
  estimateId: Scalars['ID'];
};

export type TestAssembly = {
  __typename?: 'TestAssembly';
  cost: Scalars['Int'];
  id: Scalars['ID'];
  item: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type TestEstimate = {
  __typename?: 'TestEstimate';
  assemblies: Array<TestAssembly>;
  cost: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateAssemblyItemQuantityInput = {
  itemId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type UpdateAssemblyItemQuantityPayload = {
  __typename?: 'UpdateAssemblyItemQuantityPayload';
  assembly?: Maybe<Assembly>;
};

export type UpdateProjectInput = {
  id: Scalars['ID'];
  project: Scalars['String'];
};

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  project?: Maybe<Project>;
};

export type AddAssemblyToEstimateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AddAssemblyToEstimateInput;
}>;


export type AddAssemblyToEstimateMutation = { __typename?: 'MutationRoot', addAssemblyToEstimate: { __typename?: 'AddAssemblyToEstimatePayload', estimate?: { __typename?: 'Estimate', id: string, assemblies: Array<{ __typename?: 'EstimateAssembly', id: string, assembly: string, quantity: number, items: Array<{ __typename?: 'AssemblyItem', id: string, item: string, cost: number, quantity: number }> }> } | null } };

export type AssemblyItemDetailsFragment = { __typename?: 'AssemblyItem', id: string, item: string, cost: number, quantity: number };

export type EstimateQueryVariables = Exact<{ [key: string]: never; }>;


export type EstimateQuery = { __typename?: 'QueryRoot', estimate: { __typename?: 'Estimate', id: string, assemblies: Array<{ __typename?: 'EstimateAssembly', id: string, assembly: string, quantity: number, items: Array<{ __typename?: 'AssemblyItem', id: string, item: string, cost: number, quantity: number }> }> } };

export const AssemblyItemDetailsFragmentDoc = gql`
    fragment AssemblyItemDetails on AssemblyItem {
  id
  item
  cost
  quantity
}
    `;
export const AddAssemblyToEstimateDocument = gql`
    mutation AddAssemblyToEstimate($id: ID!, $input: AddAssemblyToEstimateInput!) {
  addAssemblyToEstimate(id: $id, input: $input) {
    estimate {
      id
      assemblies {
        id
        assembly
        quantity
        items {
          ...AssemblyItemDetails
        }
      }
    }
  }
}
    ${AssemblyItemDetailsFragmentDoc}`;

export function useAddAssemblyToEstimateMutation() {
  return Urql.useMutation<AddAssemblyToEstimateMutation, AddAssemblyToEstimateMutationVariables>(AddAssemblyToEstimateDocument);
};
export const EstimateDocument = gql`
    query Estimate {
  estimate(id: "00000000-0000-0000-0000-000000000001") {
    id
    assemblies {
      id
      assembly
      quantity
      items {
        ...AssemblyItemDetails
      }
    }
  }
}
    ${AssemblyItemDetailsFragmentDoc}`;

export function useEstimateQuery(options?: Omit<Urql.UseQueryArgs<EstimateQueryVariables>, 'query'>) {
  return Urql.useQuery<EstimateQuery>({ query: EstimateDocument, ...options });
};