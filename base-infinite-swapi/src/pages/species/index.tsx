import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './species';
import Loader from '../../components/Loader';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TSpecies } from 'src/interfaces/species';
import { Container } from './styles';

const fetchUrl = async (pageParam: string): Promise<TSpecies> => {
  const response = await fetch(`https://swapi.py4e.com/api/species/?page=${pageParam}`);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery({
      queryKey: ['species'],
      queryFn: ({ pageParam = '1' }) => fetchUrl(pageParam),
      initialPageParam: '1',
      getNextPageParam: (lastPage) => lastPage.next?.split('=')[1] ?? undefined,
    });

  if (isError) {
    return <Container>Error! {error.toString()}</Container>;
  }

  return (
    <Container>
      {isLoading && <Loader />}
      <InfiniteScroll
        initialLoad={false}
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
      >
        {data?.pages.map((p) =>
          p.results.map((r) => (
            <Species
              key={r.name}
              name={r.name}
              language={r.language}
              averageLifespan={r.average_lifespan}
            />
          )),
        )}
      </InfiniteScroll>
    </Container>
  );
}
