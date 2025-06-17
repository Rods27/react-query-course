import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './person';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { TPeople } from 'src/interfaces/people';
import Loader from '../../components/Loader';
import { Container } from './styles';

const fetchUrl = async (pageParam: string): Promise<TPeople> => {
  const response = await fetch(`https://swapi.py4e.com/api/people/?page=${pageParam}`);
  return response.json();
};

export function InfinitePeople() {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery({
      queryKey: ['people'],
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
            <Person key={r.name} name={r.name} hairColor={r.hair_color} eyeColor={r.eye_color} />
          )),
        )}
      </InfiniteScroll>
    </Container>
  );
}
