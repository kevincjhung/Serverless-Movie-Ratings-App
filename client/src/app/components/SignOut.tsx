"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
	return (
		<div >
			<button onClick={() => signOut({ callbackUrl: '/' })}>
				Sign Out
			</button>
		</div>
	)
}