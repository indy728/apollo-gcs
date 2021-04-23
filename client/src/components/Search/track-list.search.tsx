import React from 'react';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import fileDownload from 'js-file-download'
import { useSearchTracksQuery } from 'generated/graphql';
import {Typography} from 'components/ui';
import {
  QuerySection,
  StyledTableRow,
  StyledTableCell,
  StyledTableHead,
  StyledTBody,
  StyledTHead,
  TracksTable,
  DownloadButton,
} from './styles.search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
          <DownloadButton style={{cursor: 'pointer'}} onClick={() => retrieveTrackFromStorage({variables: {filename}})}>
            <FontAwesomeIcon icon={faDownload} />
          </DownloadButton>
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
      <Typography tag="h2" fontSize="1.4rem" mh="1.4rem" mb=".8rem">
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
