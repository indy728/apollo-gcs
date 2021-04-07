import styled from 'styled-components';

export const UploadMain = styled.main`
  width: 100%;
  margin: 32px auto;
`

/* File selector */

export const FileSelectorSection = styled.section`
  width: 100%;
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

export const FilesHeaderWrapper = styled.div`
  padding: 2rem 0;
`;

export const FilesInputLabel = styled.label`
  &.file-upload__label {
    background-color: ${({theme: {primary}}) => primary[3]};
    box-shadow: 0 1px 5px 1px rgba(255,255,255,.4);
    border-radius: 3px;
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 1rem;
    transition: all .1s linear;
    cursor: pointer;

    :hover {
      box-shadow: 0 2px 10px 3px rgba(255,255,255,.4);
      transform: translateY(-.2rem);
    }

    :active {
      box-shadow: 0 2px 10px 1px rgba(255,255,255,.4);
      transform: translateY(-.1rem);
    }
  }

  input {
    display: none;
  }
`;