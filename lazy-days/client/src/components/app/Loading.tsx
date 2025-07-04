import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function Loading() {
  const isFetching = useIsFetching(); // for now, just don't display
  const isMutating = useIsMutating(); // for now, just don't display
  const display = isFetching || isMutating ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
