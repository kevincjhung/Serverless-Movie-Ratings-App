"use client"

// Material UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

//
import { useState } from 'react';
import { Typography } from '@mui/material';

/**
 * POST request on thunderclient works
 * POST request with pre-written form data works
 * 
 */


export default function MovieInputForm() {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Director: '',
    Actors: '',
    Year: '',
    RuntimeMinutes: '',
    Rating: '',
    Votes: '',
    RevenueMillions: '',
    MetaScore: '',
  });


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

    // convert the values to the correct types for runtimeMinutes, rating, votes, revenueMillions, metaScore
    if (
      id === 'runtimeMinutes' ||
      id === 'rating' ||
      id === 'votes' ||
      id === 'revenueMillions' ||
      id === 'metaScore'
    ) {
      const numericValue = inputValue.trim() === '' ? '' : Number(inputValue);
      setFormData({
        ...formData,
        [id]: numericValue,
      });
      return;
    }

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

      let fakeFormData = {
        "Title": "Tomás El Trenito 2",
        "Genre": "adventure",
        "Description": "Black Mamba is an electrifying action-packed thriller that follows the journey of a skilled assassin, known only as Black Mamba.",
        "Director": "Evelyn Hawthorne",
        "Actors": "Saoirse Ronan, Max Irons, Jake Abel, Diane Kruger",
        "Year": 2014,
        "RuntimeMinutes": 122,
        "Rating": 6,
        "Votes": 92852,
        "RevenueMillions": 5.62,
        "Metascore": 35
      }
      
      const requestData = {
        ...formData,
        Year: Number(formData.Year),
        RuntimeMinutes: Number(formData.RuntimeMinutes),
        Rating: Number(formData.Rating),
        Votes: Number(formData.Votes),
        RevenueMillions: Number(formData.RevenueMillions),
        MetaScore: Number(formData.MetaScore),
      };
  
    

      console.log('form data: \n')
      console.log(requestData)

      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestData),
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
            id="Title"
            label="Title"
            onChange={handleInputChange}
            className="mt-4 ml-4"
          />
          <TextField
            id="Year"
            label="Year"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />
          <TextField
            id="RuntimeMinutes"
            label="Runtime Minutes"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />
          <TextField
            id="Rating"
            label="Rating"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />
          <TextField
            id="Votes"
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
            id="RevenueMillions"
            label="Revenue (Millions)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />

          <TextField
            id="Director"
            label="Director"
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />
          <TextField
            id="Actors"
            label="Actors"
            helperText="Separate actor names with commas"
            className="mt-4 ml-4"
            onChange={handleInputChange}
          />
        </div>
        <TextField
          id="Description"
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