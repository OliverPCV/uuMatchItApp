import * as React from "react";
import { Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";


export default function TournamentCard() {
  return (
    <Center h="22vh">
      <Flex p="5" maxW="1000px" maxH="400px" borderWidth="1px">
        <Image borderRadius="md" src="https://st4.depositphotos.com/3334457/24073/i/450/depositphotos_240731538-stock-photo-soccer-players-in-action-on.jpg" w="25%" />
        <Box ml={4}>
          <Flex align="baseline">
            <Text
              
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="pink.800"
            >
              15:00
            </Text>
          </Flex>
          <Text  fontSize="xl" fontWeight="semibold" lineHeight="short">
            Pojďte si zahrát fotbal blabla
          </Text>
          <Text>Horní Měcholupy &bull; 5000kč &bull; 5na5 &bull; 9/16 teamů</Text>
          
        </Box>
      </Flex>
    </Center>
  );
}
