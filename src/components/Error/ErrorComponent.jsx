import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      top={"10%"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
      h={"20"}
    >
      <AlertIcon  />
      <Text fontSize={"20px"} fontWeight={"semibold"}>
        {message}
      </Text>
    </Alert>
  );
};

export default ErrorComponent;
