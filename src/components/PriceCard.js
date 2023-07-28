import { Box, Paper, Grid, Typography } from '@mui/material/'
import { styled } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function PriceCardData({country, price}) {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const BTC = () =>
    <Typography>
      {"BTC = $" + (Math.round(price * 100) / 100).toLocaleString()}
    </Typography>
  const SAT1 = () => 
    <Typography>
      {"1 SAT = $" + (price / 100000000).toFixed(5)}
    </Typography>
  const SATS1000 = () =>
    <Typography>
      {"1,000 SATS = $" + (Math.round((price / 100000) * 100) / 100).toFixed(2)}
    </Typography>
  const SATS10000 = () =>
    <Typography>
      {"10,000 SATS = $" + (Math.round((price / 10000) * 100) / 100).toLocaleString()}
    </Typography>
  const SATS100000 = () =>
    <Typography>
      {"100,000 SATS = $" + (Math.round((price / 1000) * 100) / 100).toLocaleString()}
    </Typography>
  const SATS1000000 = () =>
    <Typography>
      {"1,000,000 SATS = $" +
      (Math.round((price / 100) * 100) / 100).toLocaleString()}
    </Typography>

  const Flag = () => {
    if (country === "AU") {
      return <img src="../AU.jpg" width="100%" alt="Australia" />;
    }
    if (country === "US") {
      return <img src="../US.jpg" width="100%" alt="UAS" />;
    }

    if (country === "NZ") {
      return <img src="../NZ.jpg" width="70%" alt="New Zealand" />;
    }

  };

  return (
    <Box
      sx={{
        paddingY: 4,
        w: '100%'
      }}
    >
      <Paper sx={{w: '100%'}} elevation={8}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box style={{width: '100%', padding: 10}}>
              <Flag />
            </Box>
          </Grid>
          <Grid item xs={7}>
              <Grid style={{padding: 10}}>
                <Div>
                  <BTC />
                </Div>
                <Div>
                  <SAT1 />
                </Div>
                <Div>
                  <SATS1000 />
                </Div>
                <Div>
                  <SATS10000 />
                </Div>
                <Div>
                  <SATS100000 />
                </Div>
                <Div>
                  <SATS1000000 />
                </Div>
              </Grid>
            </Grid>
          </Grid>
      </Paper>
    </Box>
  );
}
