import React from 'react';
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {SONGS_QUERY} from '../apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const SongsList = () => {
  const [getSongs, {data, error, loading}] = useLazyQuery(SONGS_QUERY)
  console.log(data)

  let rows = undefined
  if (data) {
    rows = data.songs
  }

  return (
    <main>
      {rows && (
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Song Title</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">BPM</TableCell>
            <TableCell align="right">key</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={row.title + idx}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.artist}</TableCell>
              <TableCell align="right">{row.bpm}</TableCell>
              <TableCell align="right">{row.key}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    <div onClick={getSongs}><span>GET SONGS</span></div>
    </main>
  )
}

export default SongsList;
