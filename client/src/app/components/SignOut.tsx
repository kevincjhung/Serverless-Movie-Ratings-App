"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
	return (
		<div >
			<button onClick={() => signOut({ callbackUrl: '/' })}
				className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
			>
				Sign Out
			</button>
		</div>
	)
}