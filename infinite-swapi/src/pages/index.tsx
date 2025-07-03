import { InfinitePeople } from './people';
import { InfiniteSpecies } from './species';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MainWrapper } from './styles';
const queryClient = new QueryClient();

export const Home = () => {
  return (
    <>
      <h1>Infinite SWAPI</h1>
      <MainWrapper>
        <InfinitePeople />
        <InfiniteSpecies />
      </MainWrapper>
    </>
  );
};

export default Home;
