import MovieInputForm from "../components/MovieInputForm"

// edit metadata 
export const metadata = {
	title: 'Add A Movie',
}

export default async function Page() {

	
	return (
		<div>
			<MovieInputForm />
		</div>
	)
}
