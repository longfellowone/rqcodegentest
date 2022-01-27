import { useQuery, UseQueryOptions } from 'react-query';
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
  estimateId: Scalars['ID'];
};

export type AddAssemblyToEstimatePayload = {
  __typename?: 'AddAssemblyToEstimatePayload';
  estimate?: Maybe<Estimate>;
};

export type Assembly = {
  __typename?: 'Assembly';
  assembly: Scalars['String'];
  id: Scalars['ID'];
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
  cost: Scalars['Int'];
  estimate: Scalars['String'];
  estimateAssemblies: Array<EstimateAssembly>;
  id: Scalars['ID'];
};

export type EstimateAssembly = {
  __typename?: 'EstimateAssembly';
  assembly: Scalars['String'];
  cost: Scalars['Float'];
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  addAssemblyToEstimate: AddAssemblyToEstimatePayload;
  createEstimate: CreateEstimatePayload;
  createProject: CreateProjectPayload;
  deleteEstimate: DeleteEstimatePayload;
  deleteProject: DeleteProjectPayload;
};


export type MutationRootAddAssemblyToEstimateArgs = {
  input: AddAssemblyToEstimateInput;
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

export type EstimateQueryVariables = Exact<{ [key: string]: never; }>;


export type EstimateQuery = { __typename?: 'QueryRoot', estimate: { __typename?: 'Estimate', estimateAssemblies: Array<{ __typename?: 'EstimateAssembly', id: string, assembly: string, cost: number, quantity: number }> } };

export type ProjectDetailsFragment = { __typename?: 'Project', id: string, project: string };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'QueryRoot', projects: Array<{ __typename?: 'Project', id: string, project: string }> };

export const ProjectDetailsFragmentDoc = /*#__PURE__*/ `
    fragment ProjectDetails on Project {
  id
  project
}
    `;
export const EstimateDocument = /*#__PURE__*/ `
    query Estimate {
  estimate(id: "00000000-0000-0000-0000-000000000001") {
    estimateAssemblies {
      id
      assembly
      cost
      quantity
    }
  }
}
    `;
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
    ...ProjectDetails
  }
}
    ${ProjectDetailsFragmentDoc}`;
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