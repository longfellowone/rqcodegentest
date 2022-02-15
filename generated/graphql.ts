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

export type Assembly = {
  assembly: Scalars['String'];
  components: Array<AssemblyComponent>;
  id: Scalars['ID'];
};

export type AssemblyComponent = {
  id: Scalars['ID'];
  product: Product;
  quantity: Scalars['Int'];
};

export type Estimate = {
  estimate: Scalars['String'];
  groups: Array<EstimateGroup>;
  id: Scalars['ID'];
};

export type EstimateGroup = {
  group: Scalars['String'];
  id: Scalars['ID'];
  lineItems: Array<EstimateGroupLineItem>;
};

export type EstimateGroupLineItem = {
  assembly: Assembly;
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type MutationRoot = {
  updateProduct: UpdateProductPayload;
};


export type MutationRootUpdateProductArgs = {
  input: UpdateProductInput;
};

export type Product = {
  cost: Scalars['Int'];
  id: Scalars['ID'];
  labour: Scalars['Int'];
  product: Scalars['String'];
};

export type Project = {
  estimates: Array<Estimate>;
  id: Scalars['ID'];
  project: Scalars['String'];
};

export type QueryRoot = {
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

export type UpdateProductInput = {
  cost?: InputMaybe<Scalars['Int']>;
  labour?: InputMaybe<Scalars['Int']>;
  product?: InputMaybe<Scalars['String']>;
  productId: Scalars['ID'];
};

export type UpdateProductPayload = {
  product?: Maybe<Product>;
};

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { updateProduct: { product?: { id: string, cost: number, labour: number } | null } };

export type EstimateQueryVariables = Exact<{ [key: string]: never; }>;


export type EstimateQuery = { estimate: { id: string, estimate: string, groups: Array<{ id: string, group: string, lineItems: Array<{ id: string, quantity: number, assembly: { id: string, assembly: string, components: Array<{ id: string, quantity: number, product: { id: string, product: string, cost: number, labour: number } }> } }> }> } };


export const UpdateProductDocument = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    product {
      id
      cost
      labour
    }
  }
}
    `;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const EstimateDocument = gql`
    query Estimate {
  estimate(id: "00000000-0000-0000-0000-000000000001") {
    id
    estimate
    groups {
      id
      group
      lineItems {
        id
        quantity
        assembly {
          id
          assembly
          components {
            id
            quantity
            product {
              id
              product
              cost
              labour
            }
          }
        }
      }
    }
  }
}
    `;

export function useEstimateQuery(options?: Omit<Urql.UseQueryArgs<EstimateQueryVariables>, 'query'>) {
  return Urql.useQuery<EstimateQuery>({ query: EstimateDocument, ...options });
};