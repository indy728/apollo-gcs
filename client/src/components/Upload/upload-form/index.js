import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import {TRACK_UPLOAD} from 'components/apollo'
import {useForm} from 'react-hook-form'
import {TagList, TagInput} from './tags';
import {TrackInfoHeader} from './header';
import Legend from './legend';
import {
  uploadFilenameController,
  trackTitleController,
  artistController,
  bpmController,
  genreController,
  trackDurationController,
  trackKeyController,
} from './controllers';
import {FlexGridItem} from 'components/ui'
import {filenameFormatTuple, findKey, keyTable, getKeywords} from './util';
import {toTitleCase} from 'components/util';
import {UploadCard, FormRow, KeyDisplay} from './upload-form.styles';
import UploadField from './upload-field';

export const UploadForm = ({metadata: {
  title, filename: _filename, format, artist, duration = 0, bpm, key, genre: genreArray
}, unstageTracks}) => {

  // CREATED FORM VARIABLES
  const songLength = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`
  const [_format, filename] = filenameFormatTuple(_filename);
  const genre = genreArray.length !== 0 && genreArray[0].toLowerCase() || '';
  const initialValues = {
    title: title || '',
    filename,
    _filename,
    artist: artist || '',
    duration: songLength,
    bpm: bpm || '',
    key: key || '',
    genre: genre || '',
  };

  // FORM
  const {register, errors, control, getValues} = useForm({
    defaultValues: {...initialValues}
  });

  // GQL
  const [trackUpload, {loading, data, error}] = useMutation(TRACK_UPLOAD, {
    onCompleted: (x) => {
      console.log(x)
    }
  })

  // STATE MANAGEMENT
  const [{keywords, custom}, setTags] = useState({
    keywords: getKeywords({title, artist, genre}),
    custom: [],
  });
  const [editInputs, setEditInputs] = useState({
    filename: false,
    trackTitle: false,
    artist: false,
    trackDuration: false,
    bpm: false,
    trackKey: false,
    genre: false,
  })

  // METHODS
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
  };

  const onClickEdit = (key) => setEditInputs({...editInputs, [key]: true});

  const handleUnstage = () => {
    unstageTracks({variables: {files: [_filename]}})
  };

  const handleUpload = () => {
    const newValues = {
      ...initialValues,
      ...getValues()
    };

    const _artist = newValues.artist.toLowerCase();
    const _title = newValues.title.toLowerCase();
    
    const [min, sec] = newValues.duration.split(':');
    const intDuration = +min * 60 + +sec;

    const entry = {
      ...newValues,
      filename: newValues.filename + _format,
      duration: intDuration,
      genre: newValues.genre.toLowerCase(),
      _filename,
      //  @TODO: grab from auth
      uploader: 'indy',
      keywords: [...keywords, ...custom],
      _artist,
      _title
    }

    trackUpload({variables: {entry}}).then(({data: {trackUpload: res}}) => {
      if (!res.length) {
        console.log('[upload-form.component] values.filename: ', values.filename)
        unstageTracks({variables: {files: [filename]}})
      }
    })
  };

  const _getKeyString = (key) => {
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

  if (loading) {
    return <div>...Uploading...</div>
  }

  if (error) {
    return <div>...Error...</div>
  }

  const formInputRows = [
    {
      "track-title": {
        gridItem: {},
        uploadField: {
          label: "Track title",
          control,
          onClickEdit: () => onClickEdit('trackTitle'),
          isEditing: editInputs.trackTitle,
          inputField: trackTitleController({control}),
          required: true,
          prefill: title,
        },
      },
      artist: {
        gridItem: {},
        uploadField: {
          label: "Artist",
          control,
          onClickEdit: () => onClickEdit('artist'),
          isEditing: editInputs.artist,
          inputField: artistController({
            control,
            // @TODO: error doesn't work
            ref: register({
              required: true,
              maxLength: 50,
            })
          }),
          required: true,
          prefill: artist,
        },
      },
    },
    {
      length: {
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
      bpm: {
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
      "track-key": {
        gridItem: {xs: 4},
        uploadField: {
          label: "Key",
          onClickEdit: () => onClickEdit('trackKey'),
          isEditing: editInputs.trackKey,
          inputField: trackKeyController({control}),
          metadata: key,
          prefill: _getKeyString(findKey(key)),
        },
      },
      genre: {
        gridItem: {xs: 4},
        uploadField: {
          label: "Genre",
          onClickEdit: () => onClickEdit('genre'),
          isEditing: editInputs.genre,
          inputField: genreController({control}),
          metadata: genre,
          required: true,
          prefill: toTitleCase(genre),
        },
      },
    },
    {
      _filename: {
        gridItem: {xs: 5},
        uploadField: {
          label: "Filename",
          prefill: _filename,
        },
      },
      format: {
        gridItem: {xs: 1},
        uploadField: {
          label: "Format",
          prefill: format,
        },
      },
      filename: {
        gridItem: {xs: 6},
        uploadField: {
          label: "Upload as",
          onClickEdit: () => onClickEdit('filename'),
          isEditing: editInputs.filename,
          inputField: uploadFilenameController({control, _format}),
          prefill: _filename,
        },
      },
    },
  ]

  return (
    <UploadCard>
      <TrackInfoHeader upload={handleUpload} unstage={handleUnstage}/>
      {formInputRows.map((row, i) => (
        <FormRow className="form-row" key={`row-${i}`}>
          {Object.entries(row).map(([id, item]) => (
            <FlexGridItem key={id} {...item.gridItem}>
              <UploadField {...item.uploadField} />
            </FlexGridItem>
          ))}
        </FormRow>
      ))}
      <FormRow className="form-row">
        <TagList keywords={keywords} custom={custom} removeTag={removeTag} />
      </FormRow>
      <FormRow className="form-row">
        <TagInput addTag={addTag} />
      </FormRow>
      <Legend />
          {/* <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button type="submit" onClick={() => unstageTracks({variables: {files: [filename]}})}>Remove</Button> */}
    </UploadCard>
    )
}