import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from "@tanstack/react-query";

import { toast } from "@/components/app/toast";

const createTitle = (errorMsg: string, actionType: 'query' | 'mutation') => {
  const action = actionType === "query" ? "fetch" : "update";
  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
}

function errorHandler(title: string) {
  const id = "react-query-toast";


  if (!toast.isActive(id)) {
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      refetchOnWindowFocus: false,
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const title = createTitle(error.message, 'query');
      errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = createTitle(error.message, 'mutation');
      errorHandler(title);
    },
  }),
}

export const queryClient = new QueryClient({ ...queryClientOptions })