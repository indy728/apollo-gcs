import React from 'react';
import { useQuery, } from "@apollo/client";
import styled from 'styled-components';
import {SONGS_QUERY} from '../../../../apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const QuerySection = styled(Container)`
  && {
    padding: 40px 0;

    &:first-of-type {
      border-top: 1px solid grey;
    }
    &:not(:first-of-type) {
      border-bottom: 1px solid grey;
    }
  }
`

const TrackList = ({query = '', list: {key, text, queryType = 'artist'}}) => {
  const {data, error, loading} = useQuery(SONGS_QUERY, {
    variables: {query, queryType}
  })
  console.log(data)

  let rows = undefined
  if (data) {
    rows = data.searchTracks
  } 

  if (!rows || !rows.length) {
    return null
  }

  // if (loading) return <div>...searching...</div>
  if (error) return <div>...error...</div>

  return (
    <QuerySection key={key}>
      <Typography variant="h5">
        {text}
      </Typography>
      {rows && loading ? <div>...searching...</div> : (
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
    </QuerySection>
  )
}

export default TrackList;
