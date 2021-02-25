import React, {useEffect} from 'react';
import { useQuery, useLazyQuery} from "@apollo/client";
import styled from 'styled-components';
import {TRACKS_QUERY, DOWNLOAD_TRACKS} from '../../../../apollo';
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
import fileDownload from 'js-file-download'


const QuerySection = styled(Container)`
  && {
    padding: 40px 0;
    background-color: ${({theme: {primary}}) => primary[0]};

    /* &:first-of-type {
      border-top: 1px solid grey;
    } */
    &:not(:last-of-type) {
      border-bottom: 1px solid ${({theme: {primary}}) => primary[2]};
    }
  }
`

const StyledTableRow = styled(TableRow)`
  background-color: ${({theme: {primary}}) => primary[1]};

  &:nth-of-type(odd) {
    background-color: ${({theme: {primary}}) => primary[2]};
  }

  :hover {
    background-color: ${({theme: {primary}}) => primary[3]};
  }
`

const StyledTableCell = styled(TableCell)`
`

const TracksTable = styled(Table)`
  background-color: ${({theme: {black}}) => black};
  
  & th, td {
    color: ${({theme: {text}}) => text.white};
    font-family: 'Barlow Condensed', sans-serif;
  }
`

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
    responseType: 'blob',
  };

  return axios(options)
}

const downloadTrack = async({filename}) => {
  try {
    const res = await localAPI({url: 'http://localhost:4000/download', filename});
    fileDownload(new Blob([res.data]), filename)
  } catch (err) {
    console.log('[track-list.search] err.message: ', err.message)
  }
}

const DataRow = ({data: {title, artist, bpm, key, filename}, idx}) => {
  const [
    retrieveTrackFromStorage,
    { loading }
  ] = useLazyQuery(DOWNLOAD_TRACKS, {
    fetchPolicy: "network-only",
    onCompleted: () => downloadTrack({filename}),
    // onError: err => null, display error popup,
  })

  return (
    <StyledTableRow key={idx}>
      <StyledTableCell component="th" scope="row">
        {title}
      </StyledTableCell>
      <StyledTableCell align="right">{artist}</StyledTableCell>
      <StyledTableCell align="right">{bpm}</StyledTableCell>
      <StyledTableCell align="right">{key}</StyledTableCell>
      <StyledTableCell align="right">{filename}</StyledTableCell>
      <StyledTableCell align="right">
        {loading ? <div>...retrieving...</div> : (
          <>
          <div onClick={() => retrieveTrackFromStorage({variables: {filename}})}>
            Select
            
          </div>
          {/* {data && data.retrieveTrackFromStorage === 'Success' && (
            <div onClick={() => localAPI({url: 'http://localhost:4000/download', filename})}>
              Download
            </div>
          )} */}
          </>
        )
        }
      </StyledTableCell>
    </StyledTableRow>
  )
}

const TrackList = ({query = '', list: {key, text, queryType = 'artist'}}) => {
  const {data, error, loading} = useQuery(TRACKS_QUERY, {
    variables: {query, queryType}
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
            <TableCell align="right">
              Download
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <DataRow key={idx} idx={idx} data={row} />
          ))}
        </TableBody>
      </TracksTable>
    </TableContainer>)}
    </QuerySection>
  )
}

export default TrackList;
