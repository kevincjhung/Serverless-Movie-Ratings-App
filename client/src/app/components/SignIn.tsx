"use client"
import { signIn } from 'next-auth/react'
import Button from '@mui/material/Button';


export default function SignIn() {
  return (
    <div>
      <Button 
        variant="outlined" 
        className="text-slate-50"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </div>
  )
}