import { InterfaceType, Field, Int, InputType } from 'type-graphql';
import { firestore_db, admin, musicBucket } from '../../apollo/firebase-config';
import path = require('path');

const pathToTmpMusic = path.join(__dirname, '..', '..', 'tmp-music');

const fsCreateDoc = async (collection: string, docname: string, data: any) => {
  return await firestore_db.collection(collection).doc(docname).set(data);
}

const fsGetRef = async (collection: string, docname: string) => {
  return await firestore_db.collection(collection).doc(docname);
}

const toAlnumID = (str: string) => {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^0-9a-zA-Z]/g, '')
    .toLowerCase();
}

const fsAddArtist = async (artist = '', _artist = '', id = '') => {
  return await fsCreateDoc('artists', _artist, {
    name: artist,
    tracks: [id],
    bio: {
      about: '',
      members: [],
      labels: [],
      picture: '',
    }
  })
}

const fsUpdateArtist = async (artist = '', _artist = '', id = '') => {
  try {
    const ref = await fsGetRef('artists', _artist);
    const doc = await ref.get();

    if (!doc.exists) {
      await fsAddArtist(artist, _artist, id)
    } else {
      await ref.update({
        tracks: admin.firestore.FieldValue.arrayUnion(id),
      })
    }
  } catch (err) {
    console.error(err);
    throw new Error('Artist failed to update in Cloud Firestore')
  }
}

const fsAddGenre = async (genre = '', _genre = '', id = '') => {
  return await fsCreateDoc('genres', _genre, {
    name: genre,
    tracks: [id],
  })
}

const fsUpdateGenre = async (genre = '', _genre = '', id = '') => {
  try {
    const ref = await fsGetRef('genres', _genre);
    const doc = await ref.get();

    if (!doc.exists) {
      await fsAddGenre(genre, _genre, id)
    } else {
      await ref.update({
        tracks: admin.firestore.FieldValue.arrayUnion(id),
      })
    }
  } catch (err) {
    console.error(err);
    throw new Error('Genre failed to update in Cloud Firestore')
  }
}

const fsAddUser = async (username = '', id = '') => {
  return await fsCreateDoc('users', username, {
    username,
    name: '',
    tracks: [id],
    bio: {
      about: '',
      picture: '',
    }
  })
}

const fsUpdateUser = async (username = '', id = '') => {
  try {
    const ref = await fsGetRef('users', username);
    const doc = await ref.get();

    if (!doc.exists) {
      await fsAddUser(username, id)
    } else {
      await ref.update({
        uploads: admin.firestore.FieldValue.arrayUnion(id),
      })
    }
  } catch (err) {
    console.error(err);
    throw new Error('User failed to update in Cloud Firestore')
  }
}

@InterfaceType()
export abstract class ITrack {
  @Field(() => String)
  uploader: string;

  @Field(() => String)
  _uploader: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  _title: string;

  @Field(() => String)
  artist: string;

  @Field(() => String)
  _artist: string;

  @Field(() => String, { nullable: true })
  artists?: string;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  key: string;

  @Field(() => [String])
  keywords: string[];

  @Field(() => String)
  bpm: string;

  @Field(() => String)
  genre: string;

  @Field(() => String)
  storageBucket: string;

  @Field(() => String)
  filename: string;

  @Field(() => String)
  _filename: string;

  @Field(() => String)
  format: string;
}

@InputType()
export class TrackInput {
  @Field(() => String)
  uploader: string;

  @Field(() => String)
  _uploader: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  _title: string;

  @Field(() => String)
  artist: string;

  @Field(() => String)
  _artist: string;

  @Field(() => String, { nullable: true })
  artists?: string;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  key: string;

  @Field(() => [String])
  keywords: string[];

  @Field(() => String)
  bpm: string;

  @Field(() => String)
  genre: string;

  @Field(() => String)
  storageBucket: string;

  @Field(() => String)
  filename: string;

  @Field(() => String)
  _filename?: string;

  @Field(() => String)
  format: string;
}

export const fsAddTrack = async (entry: TrackInput) => {
  try {
    const { id }: { id: string } = await firestore_db.collection('tracks').add(
      entry
    )

    entry.artist.split(', ').forEach((artist) => {
      let _artist = toAlnumID(artist);

      fsUpdateArtist(artist, _artist, id);
    });
    await fsUpdateGenre(entry.genre, toAlnumID(entry.genre), id)
    await fsUpdateUser(entry.uploader, id);

    return {
      id
    }
  } catch (err) {
    console.log('[tracks.helpers] err: ', err);
    throw new Error('Track failed to add to database');
  }
}

export const gsUploadTrack = async (filename: string, destination: string) => {
  if (!filename.length) throw new Error('No filename received for upload');
  try {
    const [file] = await musicBucket.upload(path.join(pathToTmpMusic, filename), {
      gzip: true,
      destination: destination || filename
    })

    if (!file.id) throw new Error('Upload id not found');
  } catch (err) {
    throw new Error(err.message)
  }

  return true
}