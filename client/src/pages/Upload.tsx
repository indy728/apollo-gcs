import React from 'react';
import FileFormList from 'components/Upload/file-form-list.upload';
import FileSelector from 'components/Upload/file-selector.upload';
import {UploadMain} from 'components/Upload/styles.upload';


const Upload: React.FC = () => {
  // Check to see if there are tracks staged for upload on Node server
  // const queryResult = useQuery(FILES_QUERY);

  // const [unstageTracks] = useMutation(UNSTAGE_TRACKS, {
  //   refetchQueries: [{ query: FILES_QUERY }],
  // })
  // const [stageTracks] = useMutation(STAGE_TRACKS, {
  //   refetchQueries: [{ query: FILES_QUERY}],
  // })

  return (
    <UploadMain>
      {/* <FileFormList queryResult={queryResult} unstageTracks={unstageTracks}/>
      <FileSelector queryResult={queryResult} stageTracks={stageTracks} /> */}
    </UploadMain>
  )
}

export default Upload;