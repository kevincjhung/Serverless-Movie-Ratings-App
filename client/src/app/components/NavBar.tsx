// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


// Components
import Signin from './SignIn';
import SignOut from './SignOut';
import NavBarMenu from './NavBarMenu';

// Next Auth
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function NavBar() {
	const session = await getServerSession(authOptions);
	
	return (
		<>
			<AppBar position="static">
        <Toolbar className="bg-gradient-to-r from-gray-500 to-gray-800 shadow-md">
				<NavBarMenu 
          items={[  
          { label: 'Home', link: '/' },
          { label: 'Add A Movie', link: '/add_movie' },
          { label: 'About', link: '/' },
          { label: 'Contact', link: '/' },
        ]} />
					<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}  >
						Movie Ratings App
					</Typography>
					<Typography component="div" className="mr-4" >
						{!session ? <Signin /> : <p>Welcome, {session.user?.email}</p>}
					</Typography>
					{session ? <SignOut /> : null}
				</Toolbar>
			</AppBar>
		</>
	)
}