using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v1/directors")]
    public class DirectorController : Controller
    {
        private readonly McuContext ctx;
        public DirectorController(McuContext ctx)
        {
            this.ctx = ctx;
        }


        [Route("{id}")]
        [HttpGet]
        public IActionResult GetDirector(int id)
        {
            var director = ctx.Directors.Find(id);
            if (director == null)
            {
                return NotFound();
            }
            return Ok(director);
        }

        public List<Director> GetAllDirectors()
        {
            return ctx.Directors.ToList();
        }


        [HttpPost]
        public IActionResult CreateDirector([FromBody] Director newDirector)
        {
            ctx.Directors.Add(newDirector);
            ctx.SaveChanges();
            return Created("", newDirector);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteDirector(int id)
        {
            var director = ctx.Directors.Find(id);
            if (director == null)
            {
                return NotFound();
            }
            ctx.Directors.Remove(director);
            ctx.SaveChanges();
            return NoContent();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}