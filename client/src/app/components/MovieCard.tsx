"use client"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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

export default function MovieCard({ movie }: { movie: Movie }) {
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
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
