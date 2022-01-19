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

export type Project = {
  __typename?: 'Project';
  id: Scalars['Int'];
  project: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  projects: Array<Project>;
};

export type ProjectDetailsFragment = { __typename?: 'Project', id: number, project: string };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'QueryRoot', projects: Array<{ __typename?: 'Project', id: number, project: string }> };

export const ProjectDetailsFragmentDoc = /*#__PURE__*/ `
    fragment ProjectDetails on Project {
  id
  project
}
    `;
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