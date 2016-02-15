using Owin;
using Parser.Api.Owin;
using System;
using System.IO;
using System.Web.Http;

namespace Owin_Api
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            appBuilder.UseWebApi(config);

            string solutionPath = @"C:\temp\services.json";
            new ApiParser().Parse(config.Services.GetApiExplorer().ApiDescriptions, solutionPath);
        }
    }
}