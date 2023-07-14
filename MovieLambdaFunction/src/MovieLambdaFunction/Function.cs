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
		// TODO: Connection string will be changed to ENV
    // var connectionString = "Server=containers-us-west-38.railway.app;Port=6425;User Id=postgres;Password=P2VdpWJUTyGMVatXXyor;Database=railway";
    var connectionString = "Host=containers-us-west-38.railway.app;Database=railway;Username=postgres;Password=P2VdpWJUTyGMVatXXyor;Port=6425";
		
		var ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
			.UseNpgsql(connectionString)
			.Options;

		// create a new instance of the DbContext class
		dbContext = new DatabaseContext(ContextOptions);
	}

  public APIGatewayHttpApiV2ProxyResponse FunctionHandler( APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context )
	{
    var movies = dbContext.Movies.ToList();
		
		var response = new APIGatewayHttpApiV2ProxyResponse
    {
      StatusCode = (int)HttpStatusCode.OK,
      Body = System.Text.Json.JsonSerializer.Serialize(movies),
      Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
    };
    
		return response;
  }
}
