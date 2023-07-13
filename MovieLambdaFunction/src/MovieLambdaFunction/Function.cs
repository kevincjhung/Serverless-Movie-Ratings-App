using Amazon.Lambda.Core;
using System.Net;
using Amazon.Lambda.APIGatewayEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(
    typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer)
)]

namespace MovieLambdaFunction;

public class Function
{
  public APIGatewayHttpApiV2ProxyResponse FunctionHandler(
    APIGatewayHttpApiV2ProxyRequest request,
    ILambdaContext context
  )
  {
    // Console.WriteLine($"The request body is: {request.Body}");
    // Console.WriteLine($"The request path parameters are: {request.PathParameters}");
    // Console.WriteLine($"The request query string parameters are: {request.QueryStringParameters}");
    // Console.WriteLine($"The request http method is: {request.RequestContext.Http.Method}");

		// TODO: Implement database connection and query here



    var response = new APIGatewayHttpApiV2ProxyResponse
    {
      StatusCode = (int)HttpStatusCode.OK,
      Body = System.Text.Json.JsonSerializer.Serialize(new { message = "Hello World" }),
      Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
    };
    return response;
  }
}
