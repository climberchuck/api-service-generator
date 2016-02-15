using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.IO;
using System.Web.Http.Description;

namespace Parser.Api.Owin
{
    public class ApiParser
    {
        public void Parse(ICollection<ApiDescription> apiDescriptions, string fileName)
        {
            List<ApiOutputModel> apis = new List<ApiOutputModel>();
            foreach (var api in apiDescriptions)
            {
                var a = new ApiOutputModel();
                a.HttpMethod = api.HttpMethod.ToString();
                a.UrlTemplate = api.RelativePath.ToLower();
                a.ServiceName = api.ActionDescriptor.ControllerDescriptor.ControllerName;
                a.MethodName = api.ActionDescriptor.ActionName;
                apis.Add(a);
            }
            WriteToFile(apis, fileName);
        }
        public void WriteToFile(object obj, string fileName)
        {
            using (FileStream fs = File.Open(fileName, FileMode.Create))
            using (StreamWriter sw = new StreamWriter(fs))
            using (JsonWriter jw = new JsonTextWriter(sw))
            {
                jw.Formatting = Formatting.Indented;

                JsonSerializer serializer = new JsonSerializer();
                serializer.ContractResolver = new CamelCasePropertyNamesContractResolver();
                serializer.Serialize(jw, obj);
            }
        }
        class ApiOutputModel
        {
            public ApiOutputModel()
            {
            }

            public string UrlTemplate { get; set; }
            public string HttpMethod { get; set; }
            public string MethodName { get; set; }
            public string ServiceName { get; set; }
        }
    }
}
