// Materials UI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';



export default async function Home() {


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



  // const result: Movie[] = await fetch("https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // "Authorization": accessToken
  //   },
  // }).then((res) => res.json())


  // hardcoded so you don't have to keep hitting the api
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
    },
    {
      Id: '4bce9679-05a5-48da-89ff-7390cd94c09b',
      Title: 'Suicide Squad',
      Genre: 'Action,Adventure,Fantasy',
      Description: 'A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse.',
      Director: 'David Ayer',
      Actors: 'Will Smith, Jared Leto, Margot Robbie, Viola Davis',
      Year: 2016,
      RuntimeMinutes: 123,
      Rating: 6.2,
      Votes: 393727,
      RevenueMillions: 325.02,
      Metascore: 40
    },
    {
      Id: '8954f247-a729-4d7d-8a10-69d7e5d8bcaf',
      Title: 'Sing',
      Genre: 'Animation,Comedy,Family',
      Description: 'In a city of humanoid animals, a hustling theater impresarios attempt to save his theater with a singing competition becomes grander than he anticipates even as its finalists find that their lives will never be the same.',
      Director: 'Christophe Lourdelet',
      Actors: 'Matthew McConaughey,Reese Witherspoon, Seth MacFarlane, Scarlett Johansson',
      Year: 2016,
      RuntimeMinutes: 108,
      Rating: 7.2,
      Votes: 60545,
      RevenueMillions: 270.32,
      Metascore: 59
    },
    {
      Id: '8a63b5df-5ebd-44b5-9373-4bd39032e6bd',
      Title: 'Prometheus',
      Genre: 'Adventure,Mystery,Sci-Fi',
      Description: 'Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.',
      Director: 'Ridley Scott',
      Actors: 'Noomi Rapace, Logan Marshall-Green, Michael Fassbender, Charlize Theron',
      Year: 2012,
      RuntimeMinutes: 124,
      Rating: 7,
      Votes: 485820,
      RevenueMillions: 126.46,
      Metascore: 65
    },
    {
      Id: '8ececc6b-24e6-4bc0-aa6c-cbfba77868f5',
      Title: 'The Great Wall',
      Genre: 'Action,Adventure,Fantasy',
      Description: 'European mercenaries searching for black powder become embroiled in the defense of the Great Wall of China against a horde of monstrous creatures.',
      Director: 'Yimou Zhang',
      Actors: 'Matt Damon, Tian Jing, Willem Dafoe, Andy Lau',
      Year: 2016,
      RuntimeMinutes: 103,
      Rating: 6.1,
      Votes: 56036,
      RevenueMillions: 45.13,
      Metascore: 42
    },
    {
      Id: 'cad85e91-41f7-4797-a3ce-41925926674b',
      Title: 'Split',
      Genre: 'Horror,Thriller',
      Description: 'Three girls are kidnapped by a man with a diagnosed 23 distinct personalities. They must try to escape before the apparent emergence of a frightful new 24th.',
      Director: 'M. Night Shyamalan',
      Actors: 'James McAvoy, Anya Taylor-Joy, Haley Lu Richardson, Jessica Sula',
      Year: 2016,
      RuntimeMinutes: 117,
      Rating: 7.3,
      Votes: 157606,
      RevenueMillions: 138.12,
      Metascore: 62
    }
  ]



  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Ratings App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>


      {result.map((movie) => {
        return (
          <Card variant="outlined" className="m-4">
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {movie.Title}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                {movie.Rating}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                {movie.Genre}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                {movie.Description}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Directed by: {movie.Director}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Starring: {movie.Actors}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {movie.Year}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">...More</Button>
            </CardActions>
          </Card>
        );
      })}
    </main>
  )
}
