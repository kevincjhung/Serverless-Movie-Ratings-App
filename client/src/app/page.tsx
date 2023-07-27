// Materials UI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth/next';
import { authOptions } from "../pages/api/auth/[...nextauth]"

import MovieCard from './components/MovieCard';
import NavBar from './components/NavBar';
import Head from 'next/head';

type Movie = {
  Id: string
  Title: string
  Genre: String
  Description: string
  Director: string
  Actors: string
  Year: number
  RuntimeMinutes: number
  Rating: number
  Votes: number
  RevenueMillions: number
  Metascore: number
}



export default async function Home() {

  const session = await getServerSession(authOptions);

  // if(!session?.accessT){
  //   redirect('/api/auth/signin')
  //   return null
  // }

  // Make a request to the API for movie data
  const result: Movie[] = await fetch("https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies", {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${session?.accessToken}`
    },
  }).then((res) => res.json())


  return (
    <>
      <Head>
        <title>movieFlix - Discover Movies</title>
      </Head>
      <main>
        {result.map((movie) => (
          <MovieCard key={movie.Id} movie={movie} />
        ))}
      </main>
    </>
  )
}
