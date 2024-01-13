import * as React from "react";
import { Box, Center, Image, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../styles/component-style/TeamCard.css";

export default function TournamentCard({ data }) {

  const navigate = useNavigate();
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const goToTournamentDetail = () => {
    navigate(`/tournamentdetail/${data.id}`);
  };

  return (
    <Center h="22vh" className="tournament-card" onClick={goToTournamentDetail}>
      <Flex className="flex" p="5" maxW="1000px" maxH="400px" borderWidth="1px" justifyContent="flex-start">
        <Image borderRadius="md" src={"https://st4.depositphotos.com/3334457/24073/i/450/depositphotos_240731538-stock-photo-soccer-players-in-action-on.jpg"} w="25%" />
        <Box ml={4} className="tournament-card-content">
          <Flex align="baseline">
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
              color="pink.800"
              className="tournament-card-title"
              textAlign="left"
            >
              {formatDate(data.date)}
            </Text>
          </Flex>
          <Text fontSize="xl" fontWeight="semibold" lineHeight="short" className="tournament-card-description" textAlign="left">
            {data.name}
          </Text>
          <Text textAlign="left">{data.place} &bull; {data.prize} Kč &bull; {data.type}</Text>
          <Text textAlign="left">Dokončeno: {data.isFinished ? 'Ano' : 'Ne'}</Text>
        </Box>
      </Flex>
    </Center>



  );
}
