import { gql } from "apollo-server-express";

const queries = gql`
type Query {
  movie(id: ID!): Movie_detailed!
}

type Movie_detailed {
  adult: Boolean
  backdrop_path: String
  belongs_to_collection: String
  budget: Int
  genres: [Genres]
  homepage: String
  id: Int
  imdb_id: String
  original_language: String
  original_title: String
  overview: String
  popularity: Float
  poster_path: String
  production_companies: [Production_companies]
  production_countries: [Production_countries]
  release_date: String
  revenue: Int
  runtime: Int
  spoken_languages: [Spoken_languages]
  status: String
  tagline: String
  title: String
  video: Boolean
  vote_average: Float
  vote_count: Int
  credits: Credits
  videos: [Video]
  reviews: [Review]
  similar: Similar
  images: Movie_images
}

type Genres {
  id: Int
  name: String
}

type Production_companies {
  name: String
  id: Int
  logo_path: String
  origin_country: String
}

type Production_countries {
  iso_3166_1: String
  name: String
}

type Spoken_languages {
  iso_639_1: String
  name: String
}

type Similar {
  page: Int
  results: [Movie]
}

type Credits {
  crew: [Crew_Credit],
  cast: [Cast_Credit]
}

type Cast_Credit {
  cast_id: Int
  character: String
  credit_id: String
  gender: Int
  id: Int
  name: String
  order: Int 
  profile_path: String
}

type Crew_Credit {
  credit_id: String
  department: String
  gender: Int
  id: Int
  job: String
  name: String
  profile_path: String
}

type Video {
  id: String
  iso_639_1: String
  iso_3166_1: String
  key: String
  name: String
  site: String
  size: Int
  type: String
}

type Review {
  id: String
  author: String
  content: String
  url: String
}

type Movie_images {
  backdrops: [ImageSpec]
  posters: [ImageSpec]
}

type ImageSpec {
  aspect_ratio: Float
  file_path: String
  height: Int
  iso_639_1: Int
  vote_average: Float
  vote_count: Int
  width: Int  
}
extend type Query {
  config: Config!
}

type Config {
  images: Images
  change_keys: [String]
}

type Images {
  base_url: String
  secure_base_url: String
  backdrop_sizes: [String]
  logo_sizes: [String]
  poster_sizes: [String]
  profile_sizes: [String]
  still_sizes: [String]
}
extend type Query {
  genres: [Genres!]!
  genresTv: [Genres!]!
}
extend type Query {
  movies(query: String): [Movie!]
  popular(query: String): [Movie!]
  nowplaying(query: String): [Movie!]
  upcoming(query: String): [Movie!]
}

type Movie {
  id: ID!
  title: String!
  poster_path: String
  adult: Boolean
  overview: String
  release_date: String
  genre_ids: [Int]
  genre_names: Genre_names
  original_title: String
  original_language: String
  backdrop_path: String 
  popularity: Float
  vote_count: Int
  video: Boolean
  vote_average: Float
}

type Genre_names {
  genre_name: [String]
}
extend type Query {
  person(id: ID!): Person!
}

type Person {
  id: ID!
  name: String
  birthday: String 
  known_for_department: String
  deathday: String
  also_known_as: [String]
  gender: Int
  biography: String
  popularity: Float
  place_of_birth: String
  profile_path: String 
  adult: Boolean
  imdb_id: String
  homepage: String
  combined_credits: Person_Credits
  movie_credits: Person_Movie_Credits
  tv_credits: Person_Tv_Credits
  images: [Profile_Image]
}

type Person_Movie_Credits {
  cast: [Person_Movie_Cast_Credit]
  crew: [Person_Movie_Crew_Credit]
}

type Person_Movie_Cast_Credit {
  character: String
  credit_id: String
  id: Int
  release_date: String
  vote_count: Int
  video: Boolean
  adult: Boolean
  vote_average: Float
  title: String
  genre_ids: [Int]
  original_language: String
  original_title: String
  popularity: Float
  backdrop_path: String
  overview: String
  poster_path: String 
  media_type: String
}

type Person_Movie_Crew_Credit {
  id: Int
  department: String
  original_language: String
  original_title: String
  job: String
  overview: String
  vote_count: Int
  video: Boolean
  poster_path: String
  backdrop_path: String
  title: String
  popularity: Float
  genre_ids: [Int]
  vote_average: Float
  adult: Boolean
  release_date: String
  credit_id: String
  media_type: String
}

type Person_Tv_Credits {
  cast: [Person_Tv_Cast_Credit]
  crew: [Person_Tv_Crew_Credit]
}

type Person_Tv_Cast_Credit {
  credit_id: String
  original_name: String
  id: Int
  genre_ids: [Int]
  character: String
  name: String
  poster_path: String
  vote_count: Int
  vote_average: Float
  popularity: Float
  episode_count: Int
  original_language: String
  first_air_date: String
  backdrop_path: String
  overview: String
  origin_country: [String]
  media_type: String
}

type Person_Tv_Crew_Credit {
  id: Int
  department: String
  original_language: String
  episode_count: Int
  job: String
  overview: String
  origin_country: [String]
  original_name: String
  genre_ids: [Int]
  name: String
  first_air_date: String
  backdrop_path: String
  popularity: Float
  vote_count: Int
  vote_average: Float
  poster_path: String
  credit_id: String
  media_type: String
}

type Person_Credits {
  cast: [Person_Cast_Credit]
  crew: [Person_Crew_Credit]
}

union Person_Cast_Credit = Person_Movie_Cast_Credit | Person_Tv_Cast_Credit
union Person_Crew_Credit = Person_Movie_Crew_Credit | Person_Tv_Crew_Credit

type Profile_Image {
  aspect_ratio: Float
  file_path: String
  height: Int
  vote_average: Float
  vote_count: Int
  width: Int
}
extend type Query {
  topPeople(query: String): [Top_person!]
}

type Top_person {
  id: ID!
  name: String
  profile_path: String
  popularity: Float
}
extend type Query {
  tv(id:ID!): Tv_detailed!
}

type Tv_detailed {
  backdrop_path: String
  created_by: [Created_By]
  episode_run_time: [Int]
  first_air_date: String
  genres: [Genres]
  homepage: String
  id: Int
  in_production: Boolean
  languages: [String]
  last_air_date: String
  last_episode_to_air: [Episode]
  name: String
  next_episode_to_air: String
  networks: [Network]
  number_of_episodes: Int
  number_of_seasons: Int
  origin_country: [String]
  original_language: String
  original_name: String
  overview: String
  popularity: Float
  poster_path: String
  production_companies: [Production_companies]
  seasons: [Season]
  status: String
  type: String
  vote_average: Float
  vote_count: Int
  credits: Credits
  videos: [Video]
  reviews: [Review]
  similar: Similar_tv
  images: Movie_images
}

type Created_By {
  id: Int
  credit_id: String
  name: String
  gender: Int
  profile_path: String
}

type Episode {
  air_date: String
  episode_number: Int
  id: Int
  name: String
  overview: String
  production_code: String
  season_number: Int
  show_id: Int
  still_path: String
  vote_average: Float
  vote_count: Int
}

type Network {
  name: String
  id: Int
  logo_path: String
  origin_country: String
}

type Season {
  air_date: String
  episode_count: Int
  id: Int
  name: String
  overview: String
  poster_path: String
  season_number: Int
}

type Similar_tv {
  page: Int
  results: [Tv]
}
extend type Query {
  tvs(query: String): [Tv!]
}

type Tv {
  id: ID!
  title: String!
  poster_path: String
  overview: String
  release_date: String
  genre_ids: [Int]
  genre_names: Genre_names
  backdrop_path: String 
  popularity: Float
  vote_count: Int
  vote_average: Float
}
extend type Query {
  tvSeason(id:Int!, season: Int!): Tv_Season
}

type Tv_Season {
  _id: String
  name: String
  air_date: String
  episodes: [Tv_Episode]
  overview: String
  id: Int
  poster_path: String
  season_number: Int
}

type Tv_Episode {
  id: Int
  name: String
  episode_number: Int
  season_number: Int
  air_date: String
  overview: String
  guest_stars: [Cast]
  crew: [Crew]
  production_code: String
  still_path: String
  vote_average: Float
  vote_count: Int
}

type Crew {
  id: Int
  credit_id: String
  name: String
  department: String
  job: String
  profile_path: String
}

type Cast {
  name: String
  credit_id: String
  character: String
  profile_path: String
  order: Int
}

extend type Query {
  search(query: String!): [Search!] 
}

type Search {
  id: Int
  media_type: String
  name: String
  title: String
  profile_path: String
  poster_path: String
  release_date: String
  first_air_date: String
}
`;

export default queries;