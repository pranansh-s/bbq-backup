import { FC } from "react";
import OutletCard from "./OutletCard";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

const PriceCard: FC<{item: any}> = ({item}) => {
  const { pathname } = useRouter();

  const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#000000E6',
      color: theme.palette.common.white,
      fontSize: 13,
      fontWeight: 700,
      
      borderTop: 1, 
      borderColor: '#FC5C2C',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      backgroundColor: '#000000',
      color: '#FFFFFF',
      
      borderTop: 1, 
      borderColor: '#FC5C2C',
    },
  }));

  function createData(
    name: string,
    priceLunch: number,
    priceDinner: number,
  ) {
    return { name, priceLunch, priceDinner };
  }
    
  const weekdays = [
    createData('Vegetarian', item.Prices.find((x: any) => x.Day === "Wednesday" && x.Session === "Lunch").Veg, item.Prices.find((x: any) => x.Day === "Wednesday" && x.Session === "Dinner").Veg),
    createData('Non Vegetarian', item.Prices.find((x: any) => x.Day === "Wednesday" && x.Session === "Lunch").NonVeg, item.Prices.find((x: any) => x.Day === "Wednesday" && x.Session === "Dinner").NonVeg),
  ];

  const weekends = [
    createData('Vegetarian', item.Prices.find((x: any) => x.Day === "Sunday" && x.Session === "Lunch").Veg, item.Prices.find((x: any) => x.Day === "Sunday" && x.Session === "Dinner").Veg),
    createData('Non Vegetarian', item.Prices.find((x: any) => x.Day === "Sunday" && x.Session === "Lunch").NonVeg, item.Prices.find((x: any) => x.Day === "Sunday" && x.Session === "Dinner").NonVeg),
  ];
  return (
    <div className="flex odd:flex-row-reverse justify-between">
      {pathname === '/prices' && <div className="w-[30rem] lg:block hidden"><OutletCard item={item}/></div>}
      <div className="lg:w-1/2 w-full">
        {pathname === '/prices' && <h3 className="font-fontBold lg:text-3xl text-2xl mb-3 text-center lg:hidden block">{item.Name}</h3>}

        <TableContainer component={Paper} className="lg:mb-6 mb-2 border-2 border-secondary">
            <Table sx={{ minWidth: 320 }} aria-label="Price Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Weekdays ({item.Weekdays})</StyledTableCell>
                        <StyledTableCell align="right">Lunch</StyledTableCell>
                        <StyledTableCell align="right">Dinner</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {weekdays.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.priceLunch} {item.Currency} *</StyledTableCell>
                        <StyledTableCell align="right">{row.priceDinner} {item.Currency} *</StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>



        <TableContainer component={Paper} className="lg:mb-6 mb-2 border-2 border-secondary">
            <Table sx={{ minWidth: 320 }} aria-label="Price Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Weekends ({item.Weekends})</StyledTableCell>
                        <StyledTableCell align="right">Lunch</StyledTableCell>
                        <StyledTableCell align="right">Dinner</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {weekends.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.priceLunch} {item.Currency} *</StyledTableCell>
                        <StyledTableCell align="right">{row.priceDinner} {item.Currency} *</StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <label className="text-sm font-fontBold">Kids {item.ChildPrice} {item.Currency}</label>
      </div>
    </div>
  )
}

export default PriceCard;
