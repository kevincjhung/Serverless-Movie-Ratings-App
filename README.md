# MovieFlix - Discover Movies

MovieFlix is a full-stack web application that allows users to add, display, and edit movie data. It provides a sleek and responsive user interface built with Next.js (v13) and Material UI components.

### Key Features
* This is a full-stack application built with Next.js for the frontend and AWS Lambda (.NET 7) for the backend.
* Utilizes TypeScript for enhanced type safety and developer experience.
* Data persistence achieved through CockroachDB, offering distributed SQL capabilities for high availability and scalability.
* Secure user authentication integrated with Amazon Cognito and NextAuth.
* Deployed on Vercel, providing a cloud platform for static sites and serverless functions.

### Technologies Used
**Frontend:** Next.js, Material UI, TypeScript

**Backend:** AWS Lambda (.NET 7), Docker

**Database:** CockroachDB

**Authentication:** Amazon Cognito, NextAuth

**Deployment:** Vercel

### Visit The App

[**movieflix-discover-movies.vercel.app**](https://movieflix-discover-movies.vercel.app)
<div style="display: flex; justify-content: center;">
  <img src="/client/public/favicon.ico" alt="Movie Web App Logo" width="400" height="400" />
</div>
Image Source: <a href="https://www.flaticon.com/free-icons/google-play-movie" title="google play movie icons">iconixar</a>




## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
  - [Frontend](#frontend)
    - [Installation and Setup](#installation-and-setup)
    - [Next.js and Material UI](#nextjs-and-material-ui)
    - [Movie Input Form](#movie-input-form)
    - [Navigation Bar](#navigation-bar)
  - [Backend](#backend)
    - [AWS Lambda Function](#aws-lambda-function)
    - [Serverless Relational Database: CockroachDB](#serverless-relational-database-cockroachdb)
    - [Authentication](#authentication)
      - [NextAuth and Amazon Cognito](#nextauth-and-amazon-cognito)
- [Conclusion](#conclusion)



## Project Overview



### Frontend

The frontend of the application is kept in a separate repository for deployment purposes. You can find it at: 
https://github.com/kevincjhung/Serverless-movie-ratings-frontend

#### Installation and Setup

To run the frontend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/kevincjhung/your-repo.git`
2. Navigate to the frontend directory: `cd client`
3. Install dependencies: `npm install` or `yarn`
4. Start the development server: `npm run dev` or `yarn dev`

#### Next.js and Material UI

The frontend leverages the power of Next.js, combining React with server-side rendering to enhance performance and SEO. Next.js also enables static site generation for faster page loads and excellent user experience. Material UI provides a set of beautiful and customizable UI components, ensuring a sleek and consistent design across the application.

##### Movie Input Form

The Movie Input Form component allows users to add new movie data to the database. The form is built with Material UI's TextField components and performs client-side validation to ensure data integrity. Upon submission, the form sends a POST request to the AWS Lambda function, adding the movie to the CockroachDB database.

##### Navigation Bar

The Navigation Bar, powered by NextAuth and Amazon Cognito, allows users to access different pages of the Movie Web App and displays their authentication status. If authenticated, users are greeted with a welcome message and can sign out. If not authenticated, they are prompted to sign in.

### Backend

#### AWS Lambda Function

The backend is implemented as an AWS Lambda function, a serverless compute service that automatically scales based on demand, allowing for cost optimization and operational simplicity. The Lambda function is written in .NET 7, and is deployed as a dockerized container.


#### Serverless Relational Database: CockroachDB

The Movie Web App employs a serverless relational database, CockroachDB, for data persistence. CockroachDB offers distributed SQL capabilities and ensures high availability, fault tolerance, and horizontal scalability. 

#### Authentication

##### NextAuth and Amazon Cognito

To secure the application and manage user authentication, NextAuth is integrated with Amazon Cognito, a fully managed service that provides scalable and secure user sign-up, sign-in, and access control. Amazon Cognito ensures a seamless and secure authentication process, protecting user data and maintaining a smooth user experience.

#### Features To Be implemented

**Data Validation For All Form Fields**
Currently, the "year", "runtimeMinutes", "metascore", and "revenueMillions" fields on the add-movie page lack data validation. Implementing data validation and providing user feedback can enhance the user experience. For instance, graying out the submit button until all necessary checks pass, ensuring that users enter valid data.

**Responsive Design for NavBar**
The navigation bar (navBar) can be improved with responsive design to adapt gracefully to different screen sizes. By implementing responsive design techniques, we can ensure that the navBar remains visually appealing and user-friendly, even on narrow screens.

**Enhanced Display for Movie Cards**
Consider improving the appearance of movie cards on the main page by displaying them in a grid layout. This will allow users to view multiple movie cards at once and enhance the overall user experience. Additionally, you may explore options like implementing a carousel slider at the top or adding a hero banner to highlight featured movies.

**Individual Movie Pages**
Create dedicated pages for individual movies to display more detailed information about each movie. Consider adding essential details like trailers and links to the IMDB page, providing users with comprehensive movie information.

**Integration with A Cloud Storage Service**
Integrate the application with Azure Blob Storage to enable efficient storage and retrieval of movie-related media, such as display photos and arrays of photos. Enhance the individual movie pages by incorporating a photo gallery that showcases images related to each movie.
