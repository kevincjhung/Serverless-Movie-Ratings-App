// !! TODO: Change this to jsx and see if it works

"use client"
// Material UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { useState } from 'react';


export default function MovieInputForm() {
	const [formData, setFormData] = useState({
		movieTitle: '',
		genre: '',
		description: '',
		director: '',
		actors: '',
		year: '',
		runtimeMinutes: '',
		rating: '',
		votes: '',
		revenueMillions: '',
		metascore: '',
	});

	const movieGenres = [
		{
			value: 'Adventure',
			label: 'Adventure',
		},
		{
			value: 'Crime',
			label: 'Crime',
		},
		{
			value: 'Mystery',
			label: 'Mystery',
		},
		{
			value: 'Comedy',
			label: 'Comedy',
		},
		{
			value: 'Drama',
			label: 'Drama',
		},
		{
			value: 'Horror',
			label: 'Horror',
		},
		{
			value: 'Thriller',
			label: 'Thriller',
		},
		{
			value: 'Music',
			label: 'Music',
		},
		{
			value: 'Western',
			label: 'Western',
		},
		{
			value: 'Family',
			label: 'Family',
		},
		{
			value: 'Musical',
			label: 'Musical',
		},
		{
			value: 'Biography',
			label: 'Biography',
		},
		{
			value: 'Romance',
			label: 'Romance',
		},
		{
			value: 'Action',
			label: 'Action',
		},
		{
			value: 'Sci-Fi',
			label: 'Sci-Fi',
		},
		{
			value: 'War',
			label: 'War',
		},
		{
			value: 'Fantasy',
			label: 'Fantasy',
		},
		{
			value: 'History',
			label: 'History',
		},
		{
			value: 'Animation',
			label: 'Animation',
		},
		{
			value: 'Sport',
			label: 'Sport',
		},
	];

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("handleFormSubmi()")

		// You can add your own API endpoint for the POST request
		const endpoint = 'https://kutu61dwp5.execute-api.ca-central-1.amazonaws.com/movies'; // Replace this with your actual endpoint

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Handle successful form submission, e.g., show a success message
				console.log('Form submitted successfully!');
			} else {
				// Handle errors, e.g., show an error message
				console.error(response);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};



	return (
		<>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '30ch' },
				}}
				noValidate
				autoComplete="off"
				className='mt-4 max-w-screen-md'
			>
				<TextField
					required
					id="title"
					label="Title"
					defaultValue=""
				/>
				<TextField
					id="year"
					label="Year"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="runtimeMinutes"
					label="Runtime Minutes"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="rating"
					label="Rating"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="votes"
					label="Votes"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="metaScore"
					label="Meta Score"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="revenueMillions"
					label="Revenue (Millions)"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="genre"
					select
					label="Genre"
					defaultValue="Genre1"
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
				/>
				<TextField
					id="actors"
					label="Actors"
					helperText="Separate actor names with commas"
				/>
				<TextField
					id="outlined-multiline-static"
					label="Description"
					multiline
					rows={4}
					helperText="Write a short description of the movie"
				/>
				<button type="submit" >
					Submit
				</button>
			</Box>
		</>
	)
}