"use client"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import NavBar from './NavBar';

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
	
	let a = `
	Title
	Genre
	Description
	Director
	Actors
	Year
	Runtime Minutes
	Rating
	Votes
	Revenue (Millions)
	Metascore`

	return (
		<>
		
		</>
	)
}