"use client"

// Material UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

//
import { useState } from 'react';
import { Typography } from '@mui/material';


export default function MovieInputForm() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    director: '',
    actors: '',
    year: '',
    runtimeMinutes: '',
    rating: '',
    votes: '',
    revenueMillions: '',
    metaScore: '',
  });

  // TODO: This would later be replaced with a call to an API to get the list of genres
  const movieGenres = [
    {
      value: 'adventure',
      label: 'Adventure',
    },
    {
      value: 'crime',
      label: 'Crime',
    },
    {
      value: 'mystery',
      label: 'Mystery',
    },
    {
      value: 'comedy',
      label: 'Comedy',
    },
    {
      value: 'drama',
      label: 'Drama',
    },
    {
      value: 'horror',
      label: 'Horror',
    },
    {
      value: 'thriller',
      label: 'Thriller',
    },
    {
      value: 'music',
      label: 'Music',
    },
    {
      value: 'western',
      label: 'Western',
    },
    {
      value: 'family',
      label: 'Family',
    },
    {
      value: 'musical',
      label: 'Musical',
    },
    {
      value: 'biography',
      label: 'Biography',
    },
    {
      value: 'romance',
      label: 'Romance',
    },
    {
      value: 'action',
      label: 'Action',
    },
    {
      value: 'sci-Fi',
      label: 'Sci-Fi',
    },
    {
      value: 'war',
      label: 'War',
    },
    {
      value: 'fantasy',
      label: 'Fantasy',
    },
    {
      value: 'history',
      label: 'History',
    },
    {
      value: 'animation',
      label: 'Animation',
    },
    {
      value: 'sport',
      label: 'Sport',
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    // figure out the id of the input field that was changed
    const id = event.target.id;
    
    const inputValue = event.target.value;

    // convert the values to the correct types for runtimeMinutes,rating,votes,revenueMillions,metaScore
    if (id === 'runtimeMinutes' || id === 'rating' || id === 'votes' || id === 'revenueMillions' || id === 'metaScore') {
      setFormData({
        ...formData,
        [id]: Number(inputValue),
      });
      return;
    }
    console.log(typeof(formData.title))

    // update the state
    setFormData({
      ...formData,
      [id]: inputValue,
    });

    console.log(formData)    
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url = 'https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies';
   
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json())


      if (res.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };



  return (
    <>
      <form 
        onSubmit={handleFormSubmit}
        className="max-w-lg mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg"
      >
        <div className="">
          <Typography variant="h4" className="text-center">
            Add A Movie
          </Typography>

        <TextField
            required
            id="title"
            label="Title"
            
            onChange={handleInputChange}
            className="mt-4 ml-4" 
          />
          <TextField
            id="year"
            label="Year"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="runtimeMinutes"
            label="Runtime Minutes"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="rating"
            label="Rating"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="votes"
            label="Votes"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="metaScore"
            label="Meta Score"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="revenueMillions"
            label="Revenue (Millions)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="genre"
            label="Genre"
            select
            defaultValue="Adventure"
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          >
            {movieGenres.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="director"
            label="Director"
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
          <TextField
            id="actors"
            label="Actors"
            helperText="Separate actor names with commas"
            className="mt-4 ml-4" 
            onChange={handleInputChange}
          />
        </div>
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          helperText="Write a short description of the movie"
          fullWidth
          className="mt-4"
          onChange={handleInputChange}
        />
        {/* Use div for button container and apply flex layout */}
        <div className="mt-8 flex justify-center">
          <Button type="submit" variant="contained" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Create
          </Button>
        </div>
      </form>
    </>
  )
}