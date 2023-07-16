using Amazon.Lambda.Core;
using System.Net;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(
    typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer)
)]

namespace MovieLambdaFunction;

public class Function
{
	DatabaseContext	dbContext;

  public Function()
  {
    // DotNetEnv.Env.Load();

    // var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
		
		// var ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
		// 	.UseNpgsql(connectionString)
		// 	.Options;

		// dbContext = new DatabaseContext(ContextOptions);
	}

  public APIGatewayHttpApiV2ProxyResponse FunctionHandler( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context )
	{
    // var movies = dbContext.Movies.ToList();
    // var method = request.RequestContext.Http.Method;

    // get query params
    // var queryParams = request.QueryStringParameters;


    return new APIGatewayHttpApiV2ProxyResponse
        {
          StatusCode = (int)HttpStatusCode.OK,
          Body = System.Text.Json.JsonSerializer.Serialize(request),
        };

    // switch(method)
    // {
    //   case "GET":
    //     return GetAllMovies(request, context);
    //   default:
    //     return new APIGatewayHttpApiV2ProxyResponse
    //     {
    //       StatusCode = (int)HttpStatusCode.OK,
    //       Body = $"the request method is {method}"
    //     };
    // }
  }
  
  // get all movies from database
  // public APIGatewayHttpApiV2ProxyResponse GetAllMovies( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context )
  // {
  //   var movies = dbContext.Movies.ToList();
  //   var method = request.RequestContext.Http.Method;

  //   var response = new APIGatewayHttpApiV2ProxyResponse
  //   {
  //     StatusCode = (int)HttpStatusCode.OK,
  //     Body = System.Text.Json.JsonSerializer.Serialize(movies),
  //     Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
  //   };
    
  //   return response;
  // }

  // //get a single movie based on the UUID primary key
  // public APIGatewayHttpApiV2ProxyResponse GetOneMovie ( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context ){
  //   var method = request.RequestContext.Http.Method;
  //   var movieId = request.PathParameters["id"];
  //   var movie = dbContext.Movies.Find(movieId);

  //   var response = new APIGatewayHttpApiV2ProxyResponse
  //   {
  //     StatusCode = (int)HttpStatusCode.OK,
  //     Body = System.Text.Json.JsonSerializer.Serialize(movie),
  //     Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
  //   };
    
  //   return response;
  // }
}
