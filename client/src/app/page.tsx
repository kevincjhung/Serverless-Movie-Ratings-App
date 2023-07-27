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
  // const result: Movie[] = await fetch("https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies", {
  //   method: "GET",
  //   cache: "no-store",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${session?.accessToken}`
  //   },
  // }).then((res) => res.json())


  // ! hardcoded so you don't have to keep hitting the API, REMOVE LATER
  const result = [
    {
      Id: '06a3957c-fa67-4dbe-a972-29e90ae1f54f',
      Title: 'Batman v Superman: Dawn of Justice',
      Genre: 'Action,Adventure,Sci-Fi',
      Description: 'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.',
      Director: 'Zack Snyder',
      Actors: 'Ben Affleck, Henry Cavill, Amy Adams, Jesse Eisenberg',
      Year: 2016,
      RuntimeMinutes: 151,
      Rating: 6.7,
      Votes: 472307,
      RevenueMillions: 330.25,
      Metascore: 44
    },
    {
      Id: '06b3957c-fa67-4dbe-a972-29e90ae1f54f',
      Title: 'Guardians of the Galaxy',
      Genre: 'Action,Adventure,Sci-Fi',
      Description: 'A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.',
      Director: 'James Gunn',
      Actors: 'Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldaña',
      Year: 2014,
      RuntimeMinutes: 101,
      Rating: 8.1,
      Votes: 757074,
      RevenueMillions: 333.13,
      Metascore: 76
    },
    {
      Id: '06x3957c-fa67-4dbe-a972-29e90ae1f54f',
      Title: 'Kingsman: The Secret Service',
      Genre: 'Action,Adventure,Comedy',
      Description: 'A spy organization recruits an unrefined, but promising street kid into the agency\t&sbquo;s ultra-competitive training program, just as a global threat emerges from a twisted tech genius.',
      Director: 'Matthew Vaughn',
      Actors: 'Colin Firth, Taron Egerton, Samuel L. Jackson,Michael Caine',
      Year: 2014,
      RuntimeMinutes: 129,
      Rating: 7.7,
      Votes: 440209,
      RevenueMillions: 128.25,
      Metascore: 58
    }
  ]



  return (
    <main>
      {result.map((movie) => (
        <MovieCard key={movie.Id} movie={movie} />
      ))}
    </main>
  )
}
