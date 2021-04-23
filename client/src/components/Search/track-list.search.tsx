import React from 'react';
// import { useQuery, useLazyQuery} from "@apollo/client";
// import {TRACKS_QUERY, DOWNLOAD_TRACKS} from '../../../../apollo';

import {
  QuerySection,
  StyledTableRow,
  StyledTableCell,
  StyledTableHead,
  StyledTBody,
  StyledTHead,
  TracksTable,
} from './styles.search';

//////////
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import StyledTableCell from '@material-ui/core/StyledTableCell';
// import Typography from '@material-ui/core/Typography'
///////////

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import fileDownload from 'js-file-download'
import { useSearchTracksQuery, Track } from 'generated/graphql';
import {Typography} from 'components/ui';

interface ILocalAPI {
  url: string;
  [key: string]: any;
}

export const localAPI = ({url, ...props}: ILocalAPI): AxiosPromise<any> => {
  const body = JSON.stringify({
    ...props
  });
  const options: AxiosRequestConfig = {
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

const downloadTrack = async({filename}: {filename: string}) => {
  console.log('[client/src/components/Search/track-list.search.js] filename: ', filename)
  // try {
  //   const res = await localAPI({url: 'http://localhost:4000/download', filename});
  //   fileDownload(new Blob([res.data]), filename)
  // } catch (err) {
  //   console.log('[track-list.search] err.message: ', err.message)
  // }
}

interface IData {
  title: string
  artist: string
  bpm: string
  key: string
  filename: string
  [key: string]: string | number
}

interface ITrackVars {
  filename: string
}

const DataRow = ({data: {title, artist, bpm, key, filename}, idx}: {data: IData, idx: number}) => {
  const retrieveTrackFromStorage = ({variables}: {variables: ITrackVars}) => {
    downloadTrack({filename: variables.filename})
    console.log('[client/src/components/Search/track-list.search.js] variables: ', variables);
  // const [
  //   retrieveTrackFromStorage,
  //   { loading }
  // ] = useLazyQuery(DOWNLOAD_TRACKS, {
  //   fetchPolicy: "network-only",
  //   onCompleted: () => downloadTrack({filename}),
  //   // onError: err => null, display error popup,
  // })
  }

  return (
    <StyledTableRow key={idx}>
      <StyledTableCell>{title}</StyledTableCell>
      <StyledTableCell>{artist}</StyledTableCell>
      <StyledTableCell align="center">{bpm}</StyledTableCell>
      {/* <StyledTableCell>{key}</StyledTableCell> */}
      <StyledTableCell>{filename}</StyledTableCell>
      <StyledTableCell align="center">
        {
        // loading ? <div>...retrieving...</div> : (
          <>
          <div style={{cursor: 'pointer'}} onClick={() => retrieveTrackFromStorage({variables: {filename}})}>
            Select
            
          </div>
          {/* {data && data.retrieveTrackFromStorage === 'Success' && (
            <div onClick={() => localAPI({url: 'http://localhost:4000/download', filename})}>
              Download
            </div>
          )} */}
          </>
        // )
        }
      </StyledTableCell>
    </StyledTableRow>
  )
}

interface ITrackList {
  key: string,
  text: string,
  queryType: string,
}

interface IProps {
  query: string
  list: ITrackList
}

const TrackList: React.FC<IProps> = ({query = '', list: {key, text, queryType = '_artist'}}) => {
  const {data, loading} = useSearchTracksQuery({variables: {query, queryType}});
  const rows = data?.searchTracks || []

  if (!rows?.length) {
    return null
  }

  return (
    <QuerySection key={key} className="bbg-here">
      <Typography tag="h2" fontSize="1.4rem" ml="1.4rem">
        {text}
      </Typography>
      {rows && loading ? <div>...searching...</div> : (
      // <TableContainer component={Paper}>
      <TracksTable aria-label="simple table">
        <StyledTHead>
          <StyledTableRow>
            <StyledTableHead>Song Title</StyledTableHead>
            <StyledTableHead>Artist</StyledTableHead>
            <StyledTableHead align="center">BPM</StyledTableHead>
            {/* <StyledTableHead>Key</StyledTableHead> */}
            <StyledTableHead>Filename</StyledTableHead>
            <StyledTableHead align="center">
              Download
            </StyledTableHead>
          </StyledTableRow>
        </StyledTHead>
        <StyledTBody>
          {rows.map((row: any, idx: number) => (
            <DataRow key={idx} idx={idx} data={row} />
          ))}
        </StyledTBody>
      </TracksTable>
    /* </TableContainer> */
    )}
    </QuerySection>
  )
}

export default TrackList;
