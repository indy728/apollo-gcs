export const filenameFormatTuple = (_filename) => {
  const filetypeRe = /\.[0-9a-z]+$/i
  const [_format] = _filename.match(filetypeRe);
  const filename = _filename.replace(filetypeRe, '');

  return [_format, filename];
}

export const keyTable = {
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

export const findKey = (key) => {
  if (key.toLowerCase() in keyTable) return key.toLowerCase();

  return Object.keys(keyTable).find(k => keyTable[k].find(x => {
    return x.toLowerCase() === key.toLowerCase()
  })) 
}

export const getKeywords = ({title, artist, genre}) => {
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
  genre.length !== 0 && keywords.push(genre);

  return keywords;
}