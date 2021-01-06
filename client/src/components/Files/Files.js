import { useQuery } from "@apollo/client";
import React from "react";
import {FILES_QUERY} from './files.gql'

const Files = () => {
  const { data, loading, error } = useQuery(FILES_QUERY);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error.message)
    return <div>error importing files</div>
  }

  return (
    <div>
      {data.files.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`http://localhost:4000/img/${x}`}
          alt={x}
        />
      ))}
    </div>
  );
};

export default Files;
