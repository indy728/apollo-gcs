import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import {TRACK_UPLOAD, UNSTAGE_TRACKS} from '../../apollo'
import {useForm, Controller} from 'react-hook-form'
import styled from 'styled-components'
import TagList from './tag-list';
import {TrackInfoHeader} from './header';
import {
  uploadFilenameController,
  trackTitleController,
  artistController,
  bpmController,
  genreController,
  trackDurationController,
  trackKeyController,
} from './controllers';
import {MyInputField} from '../../ui'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


const UploadCard = styled.div`
  width: 100%;
  background-color: ${({theme: {primary}}) => primary[0]};
  padding: 1rem 2rem;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};

  &:not(:first-of-type){
    margin-top: 20px;
  }

  div, input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const getKeywords = ({title, artist, key, tags}) => {
  const keywords = [];

  // Split title by word, remove parentheses
  title.split(' ')
    .forEach((x) => {
      keywords.push(x.toLowerCase().replace(/\W+/g, ''))
    });
  // Split artists and split artist names by whitespace
  artist.split(', ')
    .map(y => y.split(' ')).flat()
    .forEach(z => {
      keywords.push(z.toLowerCase())
    });
  // Include key in keywords
  if (key && key.length) {
    keywords.push(key)
  }
  // @TODO: Include tags (ie deep house, techno, etc..)

  return keywords
}


const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  > :not(:first-child) {
    padding-left: 2rem;
  }

  &:not(:first-of-type) {
    padding-top: 1.2rem;
  }
`;

const FlexGridItem = styled.div`
  flex: ${({xs}) => xs || 1};

  label {
    font-size: 80%;
    font-style: italic;
  }

  
`;

const FUFWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;
const FUFLabelWrapper = styled.div`
  display: flex;
  font-size: 80%;
  font-style: italic;

  /* > :not(:first-child) {
    margin-left: 1rem;
  } */
`;
const FUFLabel = styled.div``;
const FUFEditWrapper = styled.div`
  margin-left: 1rem;
  transform: scale(.8) translateY(-5px);
  cursor: pointer;
`;
const FUFMetadata = styled.div`
  margin-left: 1.2rem;
  color: ${({theme: {text}}) => text.alert};
`;
const FUFValue = styled.div`
  display: flex;
  height: 3rem;
  line-height: 3rem;
  width: ${({width}) => width || '100%'};
  padding: 0 .5rem;
`;

const FUFEdit = ({onClick}) => {
  return (
    <FUFEditWrapper onClick={onClick}>
      <FontAwesomeIcon size="xs" icon={faPencilAlt} />
    </FUFEditWrapper>
  )
}

const FlexSpacer = styled.div`
  flex: 1;
`;

const FileUploadField = ({
  label,
  onClickEdit = null,
  isEditing = false,
  metadata = '',
  inputField = null,
  children,
  prefill,
  required
}) => {
  return (
    <FUFWrapper>
      <FUFLabelWrapper>
        <FUFLabel>{required && '*'}{label}:</FUFLabel>
        {!!metadata.length && <FUFMetadata>({metadata})</FUFMetadata>}
      </FUFLabelWrapper>
      {isEditing || (required && !prefill.length) ? inputField : (
        <FUFValue>
          {prefill}
          {!!onClickEdit && <FUFEdit onClick={onClickEdit} />}
        </FUFValue>

      )}
    </FUFWrapper>
  )
}

const keyTable = {
  '1a': ['Abmin', '6m'],
  '2a': ['Ebmin', '7m'],
  '3a': ['Bbmin', '8m'],
  '4a': ['Fmin', '9m'],
  '5a': ['Cmin', '10m'],
  '6a': ['Gmin', '11m'],
  '7a': ['Dmin', '12m'],
  '8a': ['Amin', '1m'],
  '9a': ['Emin', '2m'],
  '10a': ['Bmin', '3m'],
  '11a': ['F#min', '4m'],
  '12a': ['Dbmin', '5m'],
  '1b': ['Bmaj', '6d'],
  '2b': ['F#maj', '7d'],
  '3b': ['Dbmaj', '8d'],
  '4b': ['Abaj', '9d'],
  '5b': ['Ebaj', '10d'],
  '6b': ['Bbmaj', '11d'],
  '7b': ['Fmaj', '12d'],
  '8b': ['Cmaj', '1d'],
  '9b': ['Gmaj', '2d'],
  '10b': ['Dmaj', '3d'],
  '11b': ['Amaj', '4d'],
  '12b': ['Emaj', '5d'],
}

const keyTableOptions = Object.entries(keyTable).map(([camelot, [fifth, openKey]]) => ({value: camelot, label: `${camelot} - ${fifth} - ${openKey}`}));

const findKey = (key) => {
  console.log('[upload-form.component] key: ', key)
  if (key.toLowerCase() in keyTable) return key.toLowerCase();

  return Object.keys(keyTable).find(k => keyTable[k].find(x => {
    console.log('[upload-form.component] x, key: ', x, key)
    return x.toLowerCase() === key.toLowerCase()
  })) 
}

const KeyDisplay = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
`

const getKeyString = (key) => {
  if (!key) return '--'

  const [fifth, openKey] = keyTable[key]

  return (
    <KeyDisplay>
      <span>{key}</span>
      <span>--</span>
      <span>{fifth}</span>
      <span>--</span>
      <span>{openKey}</span>
    </KeyDisplay>
  )
}


const AddTagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const AddTagSubmit = styled.div`
  margin-left: .8rem;
  padding: .4rem .5rem;
  border-radius: .2rem;
  background-color: ${({disabled}) => disabled ? 'grey' : 'orangered'};

`;

const AddTag = ({addTag}) => {
  const [newTag, setNewTag] = useState('');
  const handleChange = ({target: {value}}) => {
    const allowAlnum = /[^a-z0-9\s]/i
    setNewTag(value.replace(allowAlnum, '').toLowerCase());
  }
  const handleSubmit = () => {
    addTag(newTag);
    setNewTag('');
  }
  const disabled = newTag.length === 0;

  return (
    <AddTagWrapper>
      <MyInputField width="12rem" inputProps={{onChange: handleChange, value: newTag, placeholder: "ie: 'uplifting' or 'anjuna'"}}/>
      <AddTagSubmit onClick={handleSubmit} disabled={disabled}>Add Tag</AddTagSubmit>
    </AddTagWrapper>
  )
}

const LegendRow = styled.div`
  margin-top: 1.6rem;
  margin-bottom: .8rem;
  display: flex;
  /* justify-content: flex-end; */

  .legend {
    display: flex;
    font-style: italic;
    font-size: 80%;

    > :not(:first-child) {
      margin-left: 3rem;
    }

    &__nb {
      display: none;
    }

    &__required {
      
    }

    &__metadata {
      color: ${({theme: {text}}) => text.alert}
    }
  }
`;

export const UploadForm = ({metadata: {
  title, filename: _filename, format, artist, duration, bpm, key
}, unstageTracks}) => {
  duration = duration || 0
  const songLength = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`
  const [trackUpload, {loading, data, error}] = useMutation(TRACK_UPLOAD, {
    onCompleted: (x) => {

      console.log(x)
    }
  })
  const [{keywords, custom}, setTags] = useState({
    keywords: getKeywords({title, artist}),
    custom: [],
  });


  const removeTag = (idx) => {
    const newTags = [...custom];
    newTags.splice(idx, 1)
    setTags({
      keywords,
      custom: newTags
    })
  };
  
  const addTag = (newTag) => {
    if (newTag.length) {
      const newTags = [...custom]; 
      newTags.push(newTag);
      setTags({
        keywords,
        custom: newTags
      })
    }
  }

  
  const [editInputs, setEditInputs] = useState({
    filename: false,
    trackTitle: false,
    artist: false,
    trackDuration: false,
    bpm: false,
    trackKey: false,
    genre: false,
  })

  const filetypeRe = /\.[0-9a-z]+$/i
  const [_format] = _filename.match(filetypeRe);
  const filename = _filename.replace(filetypeRe, '');

  const {register, errors, handleSubmit, control} = useForm({
    defaultValues: {
      title: title || '',
      filename,
      artist: artist || '',
      duration: songLength,
      bpm: bpm || '',
      key: key || '',
      genre: '',
      keywords: [],
    }
  });

  const onSubmit = values => {
    const _artist = values.artist.toLowerCase();
    const _title = values.title.toLowerCase();
    console.log('[upload-form.component] values.duration: ', values.duration)
    
    // @TODO: sux
    
    const [min, sec] = values.duration.split(':');
    const intDuration = +min * 60 + +sec;
    const entry = {
      ...values,
      filename: values.filename + _format,
      duration: intDuration,
      _filename,
      //  @TODO: grab from auth
      uploader: 'indy',
      keywords,
      _artist,
      _title
    }

    // @TODO: before uncommenting track upload, make sure it sources _filename and uploads filename!!

    // trackUpload({variables: {entry}}).then(({data: {trackUpload: res}}) => {
    //   if (!res.length) {
    //     console.log('[upload-form.component] values.filename: ', values.filename)
    //     // unstageTracks({variables: {files: [filename]}})
    //   }
    // })
  }

  if (loading) {
    return <div>...Uploading...</div>
  }

  if (error) {
    return <div>...Error...</div>
  }

  const onClickEdit = (key) => setEditInputs({...editInputs, [key]: true});

  const formInputRows = [
    [
      {
        id: "_filename",
        gridItem: {xs: 5},
        uploadField: {
          label: "Filename",
          prefill: _filename,
        },
      },
      {
        id: "format",
        gridItem: {xs: 1},
        uploadField: {
          label: "Format",
          prefill: format,
        },
      },
      {
        id: "filename",
        gridItem: {xs: 6},
        uploadField: {
          label: "Upload as",
          onClickEdit: () => onClickEdit('filename'),
          isEditing: editInputs.filename,
          inputField: uploadFilenameController({control, _format}),
          prefill: _filename,
        },
      },
    ],
    [
      {
        id: "track-title",
        gridItem: {},
        uploadField: {
          label: "Track title",
          onClickEdit: () => onClickEdit('trackTitle'),
          isEditing: editInputs.trackTitle,
          inputField: trackTitleController({control}),
          required: true,
          prefill: title,
        },
      },
      {
        id: "artist",
        gridItem: {},
        uploadField: {
          label: "Artist",
          onClickEdit: () => onClickEdit('artist'),
          isEditing: editInputs.artist,
          inputField: artistController({control}),
          required: true,
          prefill: artist,
        },
      },
    ],
    [
      {
        id: "length",
        gridItem: {xs: 2},
        uploadField: {
          label: "Length",
          onClickEdit: () => onClickEdit('trackDuration'),
          isEditing: editInputs.trackDuration,
          inputField: trackDurationController({control}),
          metadata: `${duration}s`,
          prefill: songLength,
        },
      },
      {
        id: "bpm",
        gridItem: {xs: 2},
        uploadField: {
          label: "BPM",
          onClickEdit: () => onClickEdit('bpm'),
          isEditing: editInputs.bpm,
          inputField: bpmController({control}),
          metadata: bpm,
          prefill: bpm,
        },
      },
      {
        id: "track-key",
        gridItem: {xs: 4},
        uploadField: {
          label: "Key",
          onClickEdit: () => onClickEdit('trackKey'),
          isEditing: editInputs.trackKey,
          inputField: trackKeyController({control}),
          metadata: key,
          prefill: getKeyString(findKey(key)),
        },
      },
      {
        id: "genre",
        gridItem: {xs: 4},
        uploadField: {
          label: "Genre",
          onClickEdit: () => onClickEdit('genre'),
          isEditing: editInputs.genre,
          inputField: genreController({control}),
          // metadata: genre,
          required: true,
          prefill: /*genre ||*/ '',
        },
      },
    ]
  ]

  return (
    <UploadCard>
      <TrackInfoHeader />
      {formInputRows.map((row, i) => (
        <FlexRow key={`row-${i}`}>
          {row.map((item) => (
            <FlexGridItem key={item.id} {...item.gridItem}>
              <FileUploadField {...item.uploadField} />
            </FlexGridItem>
          ))}
        </FlexRow>
      ))}
      <FlexRow>
        <TagList keywords={keywords} custom={custom} removeTag={removeTag} />
      </FlexRow>
      <FlexRow>
        <AddTag addTag={addTag} />
      </FlexRow>
      <LegendRow>
        <div className="legend">
          <span className="legend__required">*required</span>
          <span className="legend__metadata">(indicates info taken from track metadata)</span>
        </div>
      </LegendRow>
          {/* <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button type="submit" onClick={() => unstageTracks({variables: {files: [filename]}})}>Remove</Button> */}
    </UploadCard>
    )
}