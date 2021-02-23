import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {
  FUFWrapper,
  FUFLabelWrapper,
  FUFLabel,
  FUFValue,
  FUFEditWrapper,
  FUFMetadata,
} from './upload-field.styles';

const FUFEdit = ({onClick}) => {
  return (
    <FUFEditWrapper onClick={onClick}>
      <FontAwesomeIcon size="xs" icon={faPencilAlt} />
    </FUFEditWrapper>
  )
}

const UploadField = ({
  label,
  onClickEdit = null,
  isEditing = false,
  metadata = '',
  inputField = null,
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

export default UploadField;