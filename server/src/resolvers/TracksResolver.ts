import {
  Resolver,
  Query,
  Args,
  ArgsType,
  ObjectType,
  Field,
  UseMiddleware,
  Int,
  Arg,
  Mutation,
} from "type-graphql";
import { isAuth } from '../middleware';
import { readdirSync } from 'fs';
import { firestore_db, musicBucket } from '../apollo/firebase-config';
import path = require('path');
import mm = require('music-metadata');
import { fsAddTrack, gsUploadTrack, TrackInput } from "./util";

const pathToTmpMusic = path.join(__dirname, '..', 'tmp-music');

@ObjectType()
class StagedTrack {
  @Field(() => String)
  format: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  artist: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  genre: string[];

  @Field(() => String)
  filename: string;

  @Field({ nullable: true })
  bpm?: string;
}

@ArgsType()
class SearchTracksArgs {
  @Field(() => String)
  query: string;

  @Field(() => String)
  queryType: string;
}

@ObjectType()
class Track {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  uploader?: string

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  artist?: string;

  @Field(() => [String])
  artists?: string[];

  @Field(() => Int)
  duration?: number;

  @Field({ nullable: true })
  key?: string;

  @Field({ nullable: true })
  bpm?: string;

  @Field(() => [String])
  genre?: string[];

  @Field(() => [String])
  keywords?: string[];

  @Field({ nullable: true })
  storageBucket?: string;

  @Field({ nullable: true })
  filename?: string;

  @Field({ nullable: true })
  format?: string;
}

@ArgsType()
class FileNames {
  @Field(() => [String])
  filenames: string[]
}


// @ArgsType()
// class Files {
//   @Field(() => [File])
//   files: File[]
// }


@Resolver()
export class TracksResolver {

  @Query(() => [StagedTrack])
  @UseMiddleware(isAuth)
  async getStagedTracks() {
    const files = readdirSync(pathToTmpMusic)

    const mds = await Promise.all(files.map(async (file: string) => {
      try {
        const metadata = await mm.parseFile(path.join(pathToTmpMusic, file));

        const { format: {
          container, duration
        }, common: {
          title, bpm, key, artist, genre
        } } = metadata;

        return {
          format: container || '',
          title: title || '',
          duration: duration && Math.trunc(duration) || 0,
          artist: artist || '',
          key: key || '',
          bpm: bpm || '',
          genre: genre || [],
          filename: file
        }
      } catch (error) {
        console.log(error.message);
        return null
      }
    }).filter((x) => x !== null))

    return {
      tracks: mds
    }
  }

  @Query(() => [Track])
  @UseMiddleware(isAuth)
  async searchTracks(
    @Args() { query, queryType }: SearchTracksArgs
  ): Promise<Track[]> {
    if (!query.length) return [];

    let tracksRef;
    if (queryType === 'keywords') {
      tracksRef = firestore_db.collection('tracks')
        .where(queryType, 'array-contains-any', query.split(' '))
    } else {
      tracksRef = firestore_db.collection('tracks')
        .where(queryType, '>=', query)
        .where(queryType, '<', query + '~');
    }
    const docs = await tracksRef.get()
    const tracks: any = [];
    docs.forEach((snapshot: { data: () => any; }) => {
      const data = snapshot.data()
      tracks.push(data)
    })
    return tracks
  }

  // @TODO: test this query
  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async downloadTrack(
    @Arg("filename") filename: string
  ) {
    const destination = path.join(__dirname, '..', 'new-music', filename)
    const options = {
      destination,
    }

    try {
      await musicBucket.file(filename).download(options)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteFiles(
    @Args() { filenames }: FileNames
  ) {
    // @TODO: delete the files
    console.log('[TracksResolver] filenames: ', filenames)
    return true
  }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async stageTracks(
  //   @Args() { files }: Files
  // ) {
  //   const len = readdirSync(pathToTmpMusic).length;
  //   files = files.slice(0, 10 - len);
  //   await Promise.all(files.map(async (file) => {
  //     const { createReadStream, filename } = await file;
  //     await new Promise(resolve =>
  //       createReadStream()
  //         .pipe(createWriteStream(path.join(pathToTmpMusic, filename)))
  //         .on('close', resolve)
  //     )
  //   }))

  //   return true
  // }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async uploadTrack(
    @Arg("entry") entry: TrackInput
  ): Promise<boolean> {
    // @TODO: check for duplicates
    // const fileExists = await checkBucketForFile(entry.filename);
    if (!entry._filename) throw new Error('No source filename provided');

    try {
      await gsUploadTrack(entry._filename, entry.filename);

      delete entry._filename
      await fsAddTrack(entry);
    } catch (err) {
      throw new Error(err.message)
    }

    // @TODO: return parts of res from both uploads
    return true
  }
}