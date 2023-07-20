
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Signin from './SignIn';

import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function NavBar() {
	const session = await getServerSession(authOptions);
	return (
		<>
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
					<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
						Movie Ratings App
					</Typography>
					<Typography component="div" sx={{ flexGrow: 1 }}>
						{!session ? <Signin /> : <p>Welcome, {session.user?.email}</p>}
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	)
}