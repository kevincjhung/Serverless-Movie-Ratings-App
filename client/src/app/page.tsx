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
  console.log({ session })

  // if(!session?.accessT){
  //   redirect('/api/auth/signin')
  //   return null
  // }

  const handleLogout = async () => {
    const data = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`
      },
    }).then((res) => res.json());

    if (data.success) {
      // Redirect to the sign-in page after successful logout
      window.location.href = '/';
    } else {
      console.log('Logout failed:', data);
    }
  };

  // Make a request to the API for movie data
  // const result: Movie[] = await fetch("https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies", {
  //   method: "GET",
  //   cache: "no-store",
  //   headers: {
  //     "Content-Type": "application/json",
  //      Authorization: `${session?.accessToken}` 
  //   },
  // }).then((res) => res.json())


  // ! hardcoded so you don't have to keep hitting the API, REMOVE LATER
  const result = [
    {
      Id: '06a3957c-fa67-4dbe-a972-29e90ae1f54f',
      Title: 'Guardians of the Galaxy',
      Genre: 'Action,Adventure,Sci-Fi',
      Description: 'A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.',
      Director: 'James Gunn',
      Actors: 'Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldaña',
      Year: 2014,
      RuntimeMinutes: 121,
      Rating: 8.1,
      Votes: 757074,
      RevenueMillions: 333.13,
      Metascore: 76
    }
  ]



  return (
    <main>
      <NavBar />
      {result.map((movie) => (
        <MovieCard key={movie.Id} movie={movie} />
      ))}
    </main>
  )
}
