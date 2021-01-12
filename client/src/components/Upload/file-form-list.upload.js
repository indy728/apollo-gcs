import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import {FILES_QUERY, DELETE_FILE} from '../apollo'
import styled from 'styled-components';
import {UploadForm} from './components';


const Table = styled.table`
  border: 2px solid black;
  border-radius: 3px;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`

const TableCell = styled.td`
  padding-left: 10px;

  &:not(:first-child) {
    padding-left: 20px;
  }

  &.path-name {
    > div {
      width: 200px;
      /* width: auto; */
      /* display: inline-block; */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

console.log(FILES_QUERY)

const FileFormList = () => {
  const { data, loading, error } = useQuery(FILES_QUERY);
  const [deleteFiles] = useMutation(DELETE_FILE, {
    refetchQueries: [{ query: FILES_QUERY}],
    // onCompleted: data => console.log('[Files] del_data: ', del_data)
  })

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error.message)
    return <div>error importing files</div>
  }

  console.log('[Files] data: ', data)

  const handleDelete = (file) => {
    console.log('[Files] file: ', file)
    if (file) {
      deleteFiles({variables: {file}})
    }
  }

  return (
    <div>

      {data.files && data.files.map((metadata, i) => {

        return (
          <UploadForm metadata={metadata} idx={i}/>
      )})}
    </div>
  );
};

export default FileFormList;
