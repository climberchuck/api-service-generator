using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Test.Api.Owin.Controllers
{
    [RoutePrefix("api/v1")]
    public class OrderController : ApiController
    {
        [Route("order")]
        public IHttpActionResult GetOrders()
        {
            return Ok();
        }
        [Route("company/{companyId:int}/order/{orderId}")]
        [HttpGet]
        public IHttpActionResult GetOrder(int companyId, int orderId, string searchText)
        {
            return Ok();
        }
        [Route("company/{companyId:int}/order")]
        [HttpPost]
        public IHttpActionResult CreateOrder(int companyId, object order)
        {
            return Ok();
        }
    }
}
