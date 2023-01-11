import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  US: number,
  AU: number,
  NZ: number,
) {
  return { name, US, AU, NZ };
}

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
    .catch((err) =>{
      console.log(err);
    })

    axios
    .get("https://api.coinbase.com/v2/prices/BTC-AUD/spot")
    .then((res) => {
      setAUPrice(res.data.data.amount);
    })
    .catch((err) =>{
      console.log(err);
    })

    axios
    .get("https://api.coinbase.com/v2/prices/BTC-NZD/spot")
    .then((res) => {
      setNZPrice(res.data.data.amount);
    })
    .catch((err) =>{
      console.log(err);
    })

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


const rows = [
  createData('1 BTC', (Math.round(usPrice * 100) / 100).toLocaleString(), (Math.round(auPrice * 100) / 100).toLocaleString(), (Math.round(nzPrice * 100) / 100).toLocaleString()),
  createData('1 SAT', (usPrice/100000000).toFixed(5), (auPrice/100000000).toFixed(5), (nzPrice/100000000).toFixed(5)),
  createData('1000 SATS', (Math.round(usPrice/100000 * 100) / 100).toLocaleString(), (Math.round(auPrice/100000 * 100) / 100).toLocaleString(), (Math.round(nzPrice/100000 * 100) / 100).toLocaleString()),
  createData('100,000 SATS', (Math.round(usPrice/1000 * 100) / 100).toLocaleString(), (Math.round(auPrice/1000 * 100) / 100).toLocaleString(), (Math.round(nzPrice/1000 * 100) / 100).toLocaleString()),
  createData('1,000,000 SATS', (Math.round(usPrice/100 * 100) / 100).toLocaleString(), (Math.round(auPrice/100 * 100) / 100).toLocaleString(), (Math.round(nzPrice/100 * 100) / 100).toLocaleString()),
];

  return (
    <div className="App">
      <h1>ILD's Bitcoin Price Calculator</h1>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={"25%"}>Currency</TableCell>
            <TableCell align="right" width={"25%"}>US$</TableCell>
            <TableCell align="right" width={"25%"}>AU$</TableCell>
            <TableCell align="right">NZ$</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">${row.US}</TableCell>
              <TableCell align="right">${row.AU}</TableCell>
              <TableCell align="right">${row.NZ}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}

export default App;
