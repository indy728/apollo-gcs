import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import {FILES_QUERY, DELETE_FILE} from '../apollo'
import styled from 'styled-components';

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

const Files = () => {
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
      <Table>
        <tbody>

      {data.files && data.files.map((x, i) => (
          <TableRow key={i} index={i}>
            <TableCell># {i}</TableCell>
            <TableCell className="path-name">
              <div>
                {x}
              </div>
              </TableCell>
            <TableCell>
              <a href={`http://localhost:4000/img/${x}`} download={x}>
                Download  
              </a>
            </TableCell>
            <TableCell>
              <div onClick={() => handleDelete(x)}>
                Delete
              </div>
              </TableCell>
          </TableRow>
        // <img
        //   style={{ width: 200 }}
        //   key={x}
        //   src={`http://localhost:4000/img/${x}`}
        //   alt={x}
        // />
      ))}
        </tbody>

      </Table>

    </div>
  );
};

export default Files;
