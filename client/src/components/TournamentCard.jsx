import * as React from "react";
import { Box, Center, Image, Flex, Text } from "@chakra-ui/react";

export default function TournamentCard({ data }) {
  return (
    <Center h="22vh" className="tournament-card">
      <Flex p="5" maxW="1000px" maxH="400px" borderWidth="1px">
        <Image borderRadius="md" src={data.imageUrl || "https://st4.depositphotos.com/3334457/24073/i/450/depositphotos_240731538-stock-photo-soccer-players-in-action-on.jpg"} w="25%" />
        <Box ml={4} className="tournament-card-content">
          <Flex align="baseline">
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="pink.800"
              className="tournament-card-title"
            >
              {data.date} {data.time}
            </Text>
          </Flex>
          <Text fontSize="xl" fontWeight="semibold" lineHeight="short" className="tournament-card-description">
            {data.name}
          </Text>
          <Text>{data.place} &bull; {data.prize} Kč &bull; {data.type} &bull; {data.teams.length} týmů</Text>
          <Text>Dokončeno: {data.isFinished ? 'Ano' : 'Ne'}</Text>
        </Box>
      </Flex>
    </Center>
  );
}
