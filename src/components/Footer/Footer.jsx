import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

// const imgScr='<i class="fa-brands fa-contao"></i>';

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.600"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} alignItems={"center"} h={"full"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={'center'}>We are the best crypto trading app in India, we provide our guidence at a very cheap price.</Text>
        </VStack>
        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={imgScr}/>
          {/* <Text>Our Founder</Text> */}
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
