
## Table of Contents

1. [Theory](#theory)
   - [AWS Serverless](#aws-serverless)
   - [API Gateway](#api-gateway)
   - [Containers](#containers)
   - [CLI Commands](#cli-commands)
   - [How Many Lambda Functions?](#how-many-lambda-functions)
   - [CORS](#cors)

2. [Steps For Creating AWS Lambda Backend](#steps)
   - [AWS Lambda Serverless Backend](#aws-lambda-serverless-backend)
     - [Prerequisites](#prerequisites)
     - [Setup Steps](#setup-steps)
       - [Install required packages for .NET](#install-required-packages-for-net)
       - [IAM Roles](#iam-roles)
       - [Create a basic lambda function](#create-a-basic-lambda-function)
       - [Fetching Data From The Frontend](#fetching-data-from-the-frontend)
       - [AWS Cognito for Authentication](#aws-cognito-for-authentication)@test
       - [API Gateway Authorization](#api-gateway-authorization)


---

## Theory

### AWS Serverless

AWS Lambda for compute function and API Gateway for API.
For this lecture, use HTTP API instead of REST API as it offers newer features.

In serverless architecture, aim to break the app into small, independent services, unlike monolithic architecture where one app does everything.

**Pros:**

- Scales well
- Pay only for what you use
- Not restricted to a single technology

**Cons:**

- No support for web sockets
- Unsuitable for long-running processes

Lambda functions are designed for small and fast execution, triggered by events like HTTP requests, file uploads, database changes, timers, or messages in a queue.

One Lambda function can handle multiple endpoints.

### API Gateway

API Gateway acts as the serverless HTTP handler, sitting in front of Lambda functions.
Prefer using HTTP API over REST API for newer features.

### Containers

Lambda functions can be deployed using containers, enabling the use of different programming languages.

### CLI Commands

Install Amazon Lambda tools:

```bash
dotnet tool install -g Amazon.Lambda.Tools
```

Install the latest .NET templates:

dotnet new install Amazon.Lambda.Templates

Create a new .NET Lambda function:

dotnet new lambda.EmptyFunction --name MyFunctionName

List Lambda functions:
aws lambda list-functions

Delete all Lambda functions:
aws lambda list-functions --query 'Functions[*].FunctionName' --output text | xargs -n1 aws lambda delete-function --function-name

## How Many Lambda Functions?

For better developer experience, keep related resources in one Lambda function. For example, all code related to a single cloud PostGreSQL database should be in one Lambda function.

## CORS

When connecting frontend to backend, add CORS headers to the API Gateway response. Allow all during development, and restrict to your custom domain in production.



## Steps

Use the Amazon.Lambda.Tools Global Tool for deployment from the command line.

```dotnet tool install -g Amazon.Lambda.Tools```

If already installed, check for updates:

```dotnet tool update -g Amazon.Lambda.Tools```

Deploy function to AWS Lambda:

```
dotnet lambda deploy-function MovieLambdaFunction
```

Database Integration
Install packages for database integration:

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
// or for MySQL
dotnet add package Pomelo.EntityFrameworkCore.MySql
```

Lambda functions are C# classes, and the constructor is called first. You can override it and set up the database connection:

namespace MovieLambdaFunction;

```csharp
public class Function
{
    // Constructor to override and set up the database connection
    public Function()
    {
        var connectionString = "Host=localhost;Database=yourDBName;Username=yourUsername;Password=yourPassword";
        
        services.AddDbContext<DatabaseContext>(opt =>
        {
            opt.UseNpgsql(connectionString);
            if (builder.Environment.IsDevelopment())
            {
                opt.LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
            }
        });
    }

    public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
    {
        // Lambda function logic here
    }
}
```

As for the database connection string, go to the AWS Console and input the environment variable. For a non-lambda project, you can use the library:

```dotnet add package DotNetEnv```

```csharp
    // Program.cs
    DotNetEnv.Load();
```

## AWS Lambda Serverless Backend

This section provides instructions on setting up an AWS Lambda serverless backend using C# for a Next.js client app with Cognito authentication. The backend will use API Gateway to handle HTTP requests and interact with the Lambda functions. Follow the steps below for clarity and organization:

### Prerequisites

Ensure you have the following installed:

.NET Core SDK
AWS CLI
Node.js and npm
Next.js (for the client app)

### Setup Steps

#### Install required packages for .NET:

```dotnet add package Amazon.Lambda.AspNetCoreServer.Hosting```

Add publishReadyToRun to the csproj:

```
dotnet add package Amazon.Lambda.AspNetCoreServer.Hosting
```

In Program.cs, add:

```csharp

using Amazon.Lambda.AspNetCoreServer;
// ...
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
```

Deploy

```csharp
dotnet lambda deploy-function ControllerTestLambda
```

#### IAM Roles

Create a new IAM Role with appropriate permissions, including CloudWatch Logs.

Create an HTTP API in API Gateway and configure routes for GET, POST, PUT, DELETE (except OPTIONS and HEAD). Attach the lambda function integration for each route.

Configure CORS in API Gateway to allow all origins, headers, and methods during development. For production, use your actual website's URL to restrict access to your API.

Create a Next.js app
```npx create-next-app@latest my-app-client```

#### Create a basic lambda function

```dotnet new lambda.image.EmptyFunction --name MyLambdaFunction```

Add the ApiGatewayEvents package:

```dotnet add package Amazon.Lambda.APIGatewayEvents```

Implement the boilerplate code to handle HTTP requests in your Lambda function:

```csharp
// ... (other using statements)
using Amazon.Lambda.APIGatewayEvents;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace MyFunctionName
{
    public class Function
    {
        public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
        {
            // ... (handle the request and provide a response)
        }
    }
}
```

Deploy the function:

```bash
dotnet lambda deploy-function MyLambdaFunction1
```

#### Fetching Data From The Frontend

Fetch data from the API Gateway/Lambda function in your Next.js app:

```javascript
export default async function Home() {
    const data = await fetch("https://your-api-gateway-url")
        .then((res) => res.json());

    return (
        <div>
            <h1>Home</h1>
            <p>{JSON.stringify(data, null, 2)}</p>
        </div>
    );
}
```

#### AWS Cognito for Authentication
Create an AWS Cognito user pool and configure it for your app.

Update the Cognito domain name and client information in the authOptions:

```js
// /pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

// ... (other imports and declarations)

export const authOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID!,
            clientSecret: process.env.COGNITO_CLIENT_SECRET!,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    // ... (callbacks for handling tokens and sessions)
};

export default NextAuth(authOptions);
```

Create a .env file in your client app with Cognito environment variables:

```
COGNITO_CLIENT_ID="your-cognito-client-id"
COGNITO_CLIENT_SECRET="your-cognito-client-secret"
COGNITO_ISSUER="https://cognito-idp.us-west-1.amazonaws.com/us-west-1_6ZUGy3eL4"
```

Use the access token from the session to make the page a protected page on the client side:

```js
// page.tsx

import { getSession } from "next-auth/react";

export default async function Home() {
    const session = await getSession();
    if (!session) {
        // Redirect to signin page or show an unauthorized message
        return null;
    }

    // ... (your component logic)
}
```

#### API Gateway Authorization

In API Gateway, configure authorization by attaching a JWT Authorizer:

Name it as desired.
Set the issuer URL to your Cognito issuer URL.
Add the audience (client ID) from Cognito.
In your Lambda function, check if the user is authorized and send an unauthorized response if needed:

```csharp
// ... (lambda function code)
if (request.RequestContext.Authorizer == null || !request.RequestContext.Authorizer.Jwt.Claims.TryGetValue("sub", out var sub))
{
    return new APIGatewayHttpApiV2ProxyResponse
    {
        StatusCode = (int)HttpStatusCode.Unauthorized,
        Body = System.Text.Json.JsonSerializer.Serialize(new { message = $"Unauthorized" }),
        Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
    };
}

```

With these steps, you have set up an AWS Lambda serverless backend with API Gateway and Cognito authentication for your Next.js client app. The protected pages on the client side will only be accessible to authenticated users.


## Testing with jest

### Setup

install packages:

```bash
 yarn add --save -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest
```

```bash
 yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom
```

create jest.setup.js, then add the following line

```import '@testing-library/jest-dom'```

Add this to jest.config.mjs


```js
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```