using Amazon.Lambda.Core;
using System.Net;
using System.Reflection;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(
    typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer)
)]

namespace MovieLambdaFunction;

public class Function
{
    DatabaseContext dbContext;

    public Function()
    {
        DotNetEnv.Env.Load();

        var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

        var ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseNpgsql(connectionString)
            .Options;

        dbContext = new DatabaseContext(ContextOptions);
    }

    public APIGatewayHttpApiV2ProxyResponse FunctionHandler(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        var routekey = request.RouteKey;
        var method = request.RequestContext.Http.Method;

        switch (routekey)
        {
            case "GET /movies":
                return GetAllMovies(request, context);
            case "GET /movies/{id}":
                return GetMovie(request, context);
            case "POST /movies":
                return AddMovie(request, context);
            case "PUT /movies/{id}":
                return EditMovie(request, context);
            case "DELETE /movies/{id}":
                return DeleteMovie(request, context);
            //     case "get /movies/{id}/ratings":
            //     // return GetMovieRatings(request, context);
            //     case "POST /movies/{id}/ratings":
            //     // return AddMovieRatings(request, context);
            //     case "PUT /movies/{id}/ratings":
            //     // return EditMovieRatings(request, context);
            //     case "DELETE /movies/{id}/ratings":
            //     // return DeleteMovieRatings(request, context);
            default:
                return new APIGatewayHttpApiV2ProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.MethodNotAllowed,
                    Body = System.Text.Json.JsonSerializer.Serialize(request)
                };
        }
    }

    // get all movies from database
    public APIGatewayHttpApiV2ProxyResponse GetAllMovies(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        var movies = dbContext.Movies.ToList();
        var method = request.RequestContext.Http.Method;

        var response = new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = System.Text.Json.JsonSerializer.Serialize(movies),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };

        return response;
    }

    // get a single movie based on the UUID primary key
    public APIGatewayHttpApiV2ProxyResponse GetMovie(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        var movieId = request.PathParameters["id"];

        // convert movieId into a GUID
        Guid guidMovieId = Guid.Parse(movieId);

        var movie = dbContext.Movies.Find(guidMovieId);

        if (movie == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie ID")
            };
        }

        var response = new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = System.Text.Json.JsonSerializer.Serialize(movie),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };

        return response;
    }

    public APIGatewayHttpApiV2ProxyResponse AddMovie(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        var movieData = System.Text.Json.JsonSerializer.Deserialize<Movie>(request.Body);

        // TODO: refactor validation logic

        // if no movieData in body of request, return an error
        if (movieData == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie data")
            };
        }

        // if no movie title was given, return an error
        if (movieData.Title == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie title")
            };
        }

        // if no description was given, return an error
        if (movieData.Description == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie description")
            };
        }

        dbContext.Movies.Add(movieData);
        dbContext.SaveChanges();

        return new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = System.Text.Json.JsonSerializer.Serialize(movieData)
        };
    }
    
    // public APIGatewayHttpApiV2ProxyResponse AddMovie(
    //     APIGatewayHttpApiV2ProxyRequest request,
    //     ILambdaContext context
    // )
    // {
    //     var movieData = System.Text.Json.JsonSerializer.Deserialize<Movie>(request.Body);

    //     // TODO: refactor validation logic

    //     // if no movieData in body of request, return an error
    //     if (movieData == null)
    //     {
    //         return new APIGatewayHttpApiV2ProxyResponse
    //         {
    //             StatusCode = (int)HttpStatusCode.BadRequest,
    //             Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie data")
    //         };
    //     }

    //     // if no movie title was given, return an error
    //     if (movieData.Title == null)
    //     {
    //         return new APIGatewayHttpApiV2ProxyResponse
    //         {
    //             StatusCode = (int)HttpStatusCode.BadRequest,
    //             Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie title")
    //         };
    //     }

    //     // if no description was given, return an error
    //     if (movieData.Description == null)
    //     {
    //         return new APIGatewayHttpApiV2ProxyResponse
    //         {
    //             StatusCode = (int)HttpStatusCode.BadRequest,
    //             Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie description")
    //         };
    //     }

    //     dbContext.Movies.Add(movieData);
    //     dbContext.SaveChanges();

    //     return new APIGatewayHttpApiV2ProxyResponse
    //     {
    //         StatusCode = (int)HttpStatusCode.OK,
    //         Body = System.Text.Json.JsonSerializer.Serialize(movieData)
    //     };
    // }

    public APIGatewayHttpApiV2ProxyResponse EditMovie(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        // the new movie data as provided in the body of the request
        var newMovieData = System.Text.Json.JsonSerializer.Deserialize<Movie>(request.Body);

        var movieId = request.PathParameters["id"];

        // if no newMovieData in body of request, return an error
        if (newMovieData == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie data")
            };
        }

        // if no movie title was given, return an error
        if (newMovieData.Title == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie title")
            };
        }

        // if no description was given, return an error
        if (newMovieData.Description == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie description")
            };
        }

        // convert movieId into a GUID
        Guid guidMovieId = Guid.Parse(movieId);

        // the data for the movie we want to update, as it currently exists in the database
        var currentMovieData = dbContext.Movies.Find(guidMovieId);

        // if no movie with given Id exist, return an error
        if (currentMovieData == null)
        {
            return new APIGatewayHttpApiV2ProxyResponse
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Body = System.Text.Json.JsonSerializer.Serialize("Invalid movie ID")
            };
        }

        // Go through each field in the newMovieData object and update the currentMovieData object. for fields where no value was given, keep original value from currentMovieData
        foreach (PropertyInfo propertyInfo in newMovieData.GetType().GetProperties())
        {
            if (propertyInfo.GetValue(newMovieData, null) != null)
            {
                propertyInfo.SetValue(
                    currentMovieData,
                    propertyInfo.GetValue(newMovieData, null),
                    null
                );
            }
        }

        // remove the id from the currentMovieData object, so that we don't try to update the id field in the database
        currentMovieData.Id = guidMovieId;

        // save changes to database
        dbContext.SaveChanges();

        return new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = System.Text.Json.JsonSerializer.Serialize(newMovieData)
        };
    }

    public APIGatewayHttpApiV2ProxyResponse DeleteMovie(
        APIGatewayHttpApiV2ProxyRequest request,
        ILambdaContext context
    )
    {
        var movieId = request.PathParameters["id"];

        // convert movieId into a GUID
        Guid guidMovieId = Guid.Parse(movieId);

        // check if a movie with that given Id exists
        var movie = dbContext.Movies.Find(guidMovieId);

        // if it exists, delete it
        if (movie != null)
        {
            dbContext.Movies.Remove(movie);
            dbContext.SaveChanges();
        }

        // return a response
        return new APIGatewayHttpApiV2ProxyResponse
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = System.Text.Json.JsonSerializer.Serialize(movie)
        };
    }
}
