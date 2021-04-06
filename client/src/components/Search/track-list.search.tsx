import React from 'react';
// import { useQuery, useLazyQuery} from "@apollo/client";
// import {TRACKS_QUERY, DOWNLOAD_TRACKS} from '../../../../apollo';

import {QuerySection, StyledTableRow, StyledTableCell, TracksTable} from './styles.search';

//////////
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography'
///////////

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import fileDownload from 'js-file-download'

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
      <StyledTableCell component="th" scope="row">
        {title}
      </StyledTableCell>
      <StyledTableCell align="right">{artist}</StyledTableCell>
      <StyledTableCell align="right">{bpm}</StyledTableCell>
      {/* <StyledTableCell align="right">{key}</StyledTableCell> */}
      <StyledTableCell align="right">{filename}</StyledTableCell>
      <StyledTableCell align="right">
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
  // const {data, error, loading} = useQuery(TRACKS_QUERY, {
  //   variables: {query, queryType}
  // })

  const rows = undefined
  return <div>{query}</div>
}
  // if (data) {
  //   rows = data.searchTracks
  // }

  // if (!rows?.length) {
  //   return null
  // }

  // if (loading) return <div>...searching...</div>
  // if (error) return <div>...error...</div>

  // return (
  //   <QuerySection key={key} className="bbg-here">
  //     <Typography variant="h5">
  //       {text}
  //     </Typography>
  //     {rows && loading ? <div>...searching...</div> : (
  //     <TableContainer component={Paper}>
  //     <TracksTable aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Song Title</TableCell>
  //           <TableCell align="right">Artist</TableCell>
  //           <TableCell align="right">BPM</TableCell>
  //           {/* <TableCell align="right">Key</TableCell> */}
  //           <TableCell align="right">Filename</TableCell>
  //           <TableCell align="right">
  //             Download
  //           </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.map((row: Track, idx: number) => (
  //           <DataRow key={idx} idx={idx} data={row} />
  //         ))}
  //       </TableBody>
  //     </TracksTable>
  //   </TableContainer>)}
  //   </QuerySection>
  // )
// }

export default TrackList;
