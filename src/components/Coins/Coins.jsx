import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setConins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySysmbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const bts = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setConins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };
 
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR(₹)</Radio>
              <Radio value={"usd"}>USD($)</Radio>
              <Radio value={"eur"}>EUR(€)</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                currencySysmbol={currencySysmbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {bts.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ id, name, img, sysmbol, price, currencySysmbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all .3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"65"} h={"65"} objectFit={"contain"} alt="exchange" />
      <Heading size={"md"} noOfLines={1}>
        {sysmbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text fontWeight={"bold"}>
        {price ? `${currencySysmbol}${price}` : "NA"}
      </Text>
    </VStack>
  </Link>
);

export default Coins;
