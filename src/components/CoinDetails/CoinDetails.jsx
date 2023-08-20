import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { server } from "../..";
import { useParams } from "react-router-dom";
import ErrorComponent from "../Error/ErrorComponent";
import Chart from "../Chart/Chart";
// import { icons } from "react-icons";

const CoinDetails = () => {
  const params = useParams();
  const [coins, setConins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState("");

  const currencySysmbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24H", "7D", "14D", "30D", "60D", "200D", "365D", "Max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24H":
        setDays("24H");
        setLoading(true);
        break;
      case "7D":
        setDays("7D");
        setLoading(true);
        break;
      case "14D":
        setDays("14D");
        setLoading(true);
        break;
      case "30D":
        setDays("30D");
        setLoading(true);
        break;
      case "60D":
        setDays("60D");
        setLoading(true);
        break;
      case "200D":
        setDays("200D");
        setLoading(true);
        break;
      case "365D":
        setDays("365D");
        setLoading(true);
        break;
      case "Max":
        setDays("Max");
        setLoading(true);
        break;

      default:
        setDays("24H");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setConins(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Coins Details"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box borderWidth={1} w={"full"}>
            <Chart arr={chartArray} currency={currencySysmbol} days={days} />
          </Box>

          <HStack p={"4"} overflowX={'auto'}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR(₹)</Radio>
              <Radio value={"usd"}>USD($)</Radio>
              <Radio value={"eur"}>EUR(€)</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text
              fontSize={"medium"}
              fontWeight={"bold"}
              alignSelf={"center"}
              opacity={"0.7"}
            >
              Last Updated on{" "}
              {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coins.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>
                {currencySysmbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coins.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySysmbol}${coins.market_data.high_24h[currency]}`}
              low={`${currencySysmbol}${coins.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coins.market_data.circulating_supply}
              />
              <Item
                title={"Market Capital"}
                value={`${currencySysmbol}${coins.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySysmbol}${coins.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySysmbol}${coins.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={52} colorScheme="teal" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
