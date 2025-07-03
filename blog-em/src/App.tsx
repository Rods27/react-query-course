import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Posts from './components/Posts';
import { DefaultContainer } from './components/Posts/styles';
import GlobalStyle from './styles/Global';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <DefaultContainer>
          <h1 className="title" style={{ margin: '20px 0 0px' }}>
            Blog &apos;em Ipsum
          </h1>
        </DefaultContainer>
        <hr style={{ border: 'none' }} />
        <Posts />
      </div>
      <ReactQueryDevtools />
      <GlobalStyle />
    </QueryClientProvider>
  );
}

export default App;
