import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PriceCard from "./components/PriceCard";
import CalcCard from "./components/CalcCard";
import { Container, Grid, Typography, Stack } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sanserif',
    h1: {
      fontSize: '3rem'
    },
    h3: {
      fontSize: '4rem'
    }
  },
  components: {
    MuiTextField: {
      fontSize: '5rem'
    }
  }
});

function App() {
  const [usPrice, setUSPrice] = useState(0);
  const [auPrice, setAUPrice] = useState(0);
  const [nzPrice, setNZPrice] = useState(0);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => {
        setUSPrice(res.data.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.coinbase.com/v2/prices/BTC-AUD/spot")
      .then((res) => {
        setAUPrice(res.data.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.coinbase.com/v2/prices/BTC-NZD/spot")
      .then((res) => {
        setNZPrice(res.data.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPrice();
  }, []);

  // Run these functions every 5 seconds after initial page load
  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="App">
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          justifyContent="center" 
          sx={{p: 4}}
        >
          <img
              src="../logo192.png"
              height={50}
              alt="BTC"
            />
          <Typography variant="h1"> Calculator</Typography>
        </Stack>
        <CalcCard
          auPriceProp={auPrice}
          usPriceProp={usPrice}
          nzPriceProp={nzPrice}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <PriceCard class="item" price={auPrice} country="AU" />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PriceCard class="item" price={usPrice} country="US" />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PriceCard class="item" price={nzPrice} country="NZ" /> 
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
