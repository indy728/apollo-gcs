import React from 'react';
import { useQuery, useLazyQuery} from "@apollo/client";
import styled from 'styled-components';
import {SONGS_QUERY, DOWNLOAD_TRACKS} from '../../../../apollo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import axios from 'axios';

export const localAPI = ({url, ...props}) => {
  const body = JSON.stringify({
    ...props
  });
  let options = {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  };
  console.log('[track-list.search] body: ', body)

  return axios(options).then(res => console.log('[track-list.search] res: ', res))
}

const QuerySection = styled(Container)`
  && {
    padding: 40px 0;
    background-color: ${({theme: {background}}) => background.dark0};

    /* &:first-of-type {
      border-top: 1px solid grey;
    } */
    &:not(:last-of-type) {
      border-bottom: 1px solid ${({theme: {background}}) => background.dark2};
    }
  }
`

const DataRow = styled(TableRow)`
  background-color: ${({theme: {background}}) => background.dark1};

  &:nth-of-type(odd) {
    background-color: ${({theme: {background}}) => background.dark2};
  }

  :hover {
    background-color: ${({theme: {background}}) => background.dark3};
  }
`

const DataCell = styled(TableCell)`
`

const TracksTable = styled(Table)`
  background-color: ${({theme: {background}}) => background.black};
  
  & th, td {
    color: ${({theme: {text}}) => text.white};
    font-family: 'Barlow Condensed', sans-serif;
  }
`

const TrackList = ({query = '', list: {key, text, queryType = 'artist'}}) => {
  const {data, error, loading} = useQuery(SONGS_QUERY, {
    variables: {query, queryType}
  })
  const [
    downloadTracks,
    { 
      data: download_data,
      error: download_error,
      loading: download_loading
    }
  ] = useLazyQuery(DOWNLOAD_TRACKS, {
    fetchPolicy: "network-only"
  })

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
      <TracksTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Song Title</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">BPM</TableCell>
            <TableCell align="right">Key</TableCell>
            <TableCell align="right">Filename</TableCell>
            <TableCell align="right">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <DataRow key={row.title + idx}>
              <DataCell component="th" scope="row">
                {row.title}
              </DataCell>
              <DataCell align="right">{row.artist}</DataCell>
              <DataCell align="right">{row.bpm}</DataCell>
              <DataCell align="right">{row.key}</DataCell>
              <DataCell align="right">{row.filename}</DataCell>
              <DataCell align="right">
                {download_loading ? <div>...downloading...</div> : (
                  <div onClick={() => downloadTracks({variables: {filename: row.filename}})}>
                    Download
                  </div>
                )
                }
              </DataCell>
            </DataRow>
          ))}
        </TableBody>
      </TracksTable>
    </TableContainer>)}
    </QuerySection>
  )
}

export default TrackList;
