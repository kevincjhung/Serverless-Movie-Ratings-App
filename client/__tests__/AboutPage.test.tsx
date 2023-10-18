import About from '../src/pages/about'
import {render, screen} from '@testing-library/react'


// use describe to group test suites together
describe('About Page - Rendering', () => {
  
    test('renders the About Page heading', () => {
        render(<About />);
        const heading = screen.getByText('About');
        expect(heading).toBeInTheDocument();
    });
    
    test('renders the About page paragraph description', () => {
        render(<About />);
        const paragraph = screen.getByText('MovieFlix is a movie database that allows users to discover movies and add movies to the database.');
        expect(paragraph).toBeInTheDocument();
    })
})

