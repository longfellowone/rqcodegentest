import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8080", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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
  id: Scalars['ID'];
  cost: Scalars['Int'];
  assembly: Scalars['String'];
  items: Array<AssemblyItem>;
};

export type AssemblyItem = {
  __typename?: 'AssemblyItem';
  id: Scalars['ID'];
  item: Scalars['String'];
  cost: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type CreateEstimateInput = {
  projectId: Scalars['ID'];
  estimate: Scalars['String'];
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
  id: Scalars['ID'];
  estimate: Scalars['String'];
  cost: Scalars['Int'];
  assemblies: Array<EstimateAssembly>;
};

export type EstimateAssembly = {
  __typename?: 'EstimateAssembly';
  id: Scalars['ID'];
  assembly: Scalars['String'];
  cost: Scalars['Int'];
  quantity: Scalars['Int'];
  items: Array<AssemblyItem>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createProject: CreateProjectPayload;
  deleteProject: DeleteProjectPayload;
  updateProject: UpdateProjectPayload;
  createEstimate: CreateEstimatePayload;
  deleteEstimate: DeleteEstimatePayload;
  addAssemblyToEstimate: AddAssemblyToEstimatePayload;
  addItemToAssembly: AddItemToAssemblyPayload;
  updateAssemblyItemQuantity: UpdateAssemblyItemQuantityPayload;
};


export type MutationRootCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationRootDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationRootUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationRootCreateEstimateArgs = {
  input: CreateEstimateInput;
};


export type MutationRootDeleteEstimateArgs = {
  input: DeleteEstimateInput;
};


export type MutationRootAddAssemblyToEstimateArgs = {
  id: Scalars['ID'];
  input: AddAssemblyToEstimateInput;
};


export type MutationRootAddItemToAssemblyArgs = {
  id: Scalars['ID'];
  input: AddItemToAssemblyInput;
};


export type MutationRootUpdateAssemblyItemQuantityArgs = {
  id: Scalars['ID'];
  input: UpdateAssemblyItemQuantityInput;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  project: Scalars['String'];
  estimates: Array<Estimate>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  project: Project;
  projects: Array<Project>;
  estimate: Estimate;
  assembly: Assembly;
  testEstimate: TestEstimate;
};


export type QueryRootProjectArgs = {
  id: Scalars['ID'];
};


export type QueryRootEstimateArgs = {
  id: Scalars['ID'];
};


export type QueryRootAssemblyArgs = {
  id: Scalars['ID'];
};


export type QueryRootTestEstimateArgs = {
  estimateId: Scalars['ID'];
};

export type TestAssembly = {
  __typename?: 'TestAssembly';
  id: Scalars['ID'];
  name: Scalars['String'];
  cost: Scalars['Int'];
  quantity: Scalars['Int'];
  item: Scalars['String'];
};

export type TestEstimate = {
  __typename?: 'TestEstimate';
  id: Scalars['ID'];
  name: Scalars['String'];
  cost: Scalars['Int'];
  assemblies: Array<TestAssembly>;
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


export type AddAssemblyToEstimateMutation = { __typename?: 'MutationRoot', addAssemblyToEstimate: { __typename?: 'AddAssemblyToEstimatePayload', estimate?: { __typename?: 'Estimate', id: string } | null | undefined } };

export type AssemblyItemDetailsFragment = { __typename?: 'AssemblyItem', id: string, item: string, cost: number, quantity: number };

export type EstimateQueryVariables = Exact<{ [key: string]: never; }>;


export type EstimateQuery = { __typename?: 'QueryRoot', estimate: { __typename?: 'Estimate', assemblies: Array<{ __typename?: 'EstimateAssembly', id: string, assembly: string, quantity: number, items: Array<{ __typename?: 'AssemblyItem', id: string, item: string, cost: number, quantity: number }> }> } };

export type ProjectDetailFragment = { __typename?: 'Project', id: string, project: string };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'QueryRoot', projects: Array<{ __typename?: 'Project', id: string, project: string }> };

export const AssemblyItemDetailsFragmentDoc = /*#__PURE__*/ `
    fragment AssemblyItemDetails on AssemblyItem {
  id
  item
  cost
  quantity
}
    `;
export const ProjectDetailFragmentDoc = /*#__PURE__*/ `
    fragment ProjectDetail on Project {
  id
  project
}
    `;
export const AddAssemblyToEstimateDocument = /*#__PURE__*/ `
    mutation AddAssemblyToEstimate($id: ID!, $input: AddAssemblyToEstimateInput!) {
  addAssemblyToEstimate(id: $id, input: $input) {
    estimate {
      id
    }
  }
}
    `;
export const useAddAssemblyToEstimateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddAssemblyToEstimateMutation, TError, AddAssemblyToEstimateMutationVariables, TContext>) =>
    useMutation<AddAssemblyToEstimateMutation, TError, AddAssemblyToEstimateMutationVariables, TContext>(
      'AddAssemblyToEstimate',
      (variables?: AddAssemblyToEstimateMutationVariables) => fetcher<AddAssemblyToEstimateMutation, AddAssemblyToEstimateMutationVariables>(AddAssemblyToEstimateDocument, variables)(),
      options
    );
useAddAssemblyToEstimateMutation.fetcher = (variables: AddAssemblyToEstimateMutationVariables) => fetcher<AddAssemblyToEstimateMutation, AddAssemblyToEstimateMutationVariables>(AddAssemblyToEstimateDocument, variables);
export const EstimateDocument = /*#__PURE__*/ `
    query Estimate {
  estimate(id: "00000000-0000-0000-0000-000000000001") {
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
export const useEstimateQuery = <
      TData = EstimateQuery,
      TError = unknown
    >(
      variables?: EstimateQueryVariables,
      options?: UseQueryOptions<EstimateQuery, TError, TData>
    ) =>
    useQuery<EstimateQuery, TError, TData>(
      variables === undefined ? ['Estimate'] : ['Estimate', variables],
      fetcher<EstimateQuery, EstimateQueryVariables>(EstimateDocument, variables),
      options
    );

useEstimateQuery.getKey = (variables?: EstimateQueryVariables) => variables === undefined ? ['Estimate'] : ['Estimate', variables];
;

useEstimateQuery.fetcher = (variables?: EstimateQueryVariables) => fetcher<EstimateQuery, EstimateQueryVariables>(EstimateDocument, variables);
export const ProjectsDocument = /*#__PURE__*/ `
    query Projects {
  projects {
    ...ProjectDetail
  }
}
    ${ProjectDetailFragmentDoc}`;
export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: UseQueryOptions<ProjectsQuery, TError, TData>
    ) =>
    useQuery<ProjectsQuery, TError, TData>(
      variables === undefined ? ['Projects'] : ['Projects', variables],
      fetcher<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables),
      options
    );

useProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects'] : ['Projects', variables];
;

useProjectsQuery.fetcher = (variables?: ProjectsQueryVariables) => fetcher<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables);