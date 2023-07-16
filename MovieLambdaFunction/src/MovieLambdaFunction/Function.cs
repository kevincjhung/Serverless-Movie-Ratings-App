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

  // Constructor to override, and set up database connection
  public Function()
  {
    DotNetEnv.Env.Load();

    var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
		
		var ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
			.UseNpgsql(connectionString)
			.Options;

		dbContext = new DatabaseContext(ContextOptions);
	}

  public APIGatewayHttpApiV2ProxyResponse FunctionHandler( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context )
	{
    var movies = dbContext.Movies.ToList();
    var method = request.RequestContext.Http.Method;

    switch(method)
    {
      case "GET":
        return GetAllMovies(request, context);
      default:
        return new APIGatewayHttpApiV2ProxyResponse
        {
          StatusCode = (int)HttpStatusCode.OK,
          Body = $"the request method is {method}"
        };
    }
  }
  
  // get all movies from database
  public APIGatewayHttpApiV2ProxyResponse GetAllMovies( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context )
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
}
