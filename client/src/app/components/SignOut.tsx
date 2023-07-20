"use client"
import { signOut } from "next-auth/react"
import Button from '@mui/material/Button';
export default function SignOut() {
	return (
		<div >
			<Button
				onClick={() => signOut({ callbackUrl: '/' })}
				variant="outlined"
				className="text-slate-50"
			>
				Sign Out
			</Button>
		</div>
	)
}