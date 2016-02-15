using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Test.Api.Owin.Controllers
{
    [RoutePrefix("api/v1")]
    public class CustomerController : ApiController
    {
        [Route("customer")]
        public IHttpActionResult GetCustomers()
        {
            return Ok();
        }
        [Route("company/{companyId:int}/customer/{customerId}")]
        [HttpGet]
        public IHttpActionResult GetCustomer(int companyId, int customerId)
        {
            return Ok();
        }
        [Route("company/{companyId:int}/customer")]
        [HttpPost]
        public IHttpActionResult CreateCustomer(int companyId, object customer)
        {
            return Ok();
        }
    }
}
