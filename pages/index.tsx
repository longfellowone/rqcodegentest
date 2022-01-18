import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { ProjectsQuery, useProjectsQuery } from "../generated/graphql";

// For setup
// https://github.com/longfellowone/cloud-client

const Home: NextPage = () => {
  const { isLoading, isError, data } = useProjectsQuery<ProjectsQuery>();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong.</div>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useProjectsQuery.getKey(),
    useProjectsQuery.fetcher()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
