using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/v1/movies")]
    public class MovieController : Controller
    {
        private readonly McuContext ctx;
        public MovieController(McuContext ctx)
        {
            this.ctx = ctx;
        }

        
        [Route("{id}")]
        [HttpGet]
        public IActionResult GetMovie(int id)
        {
            var movie = ctx.Movies
                                .Include(d => d.Director)
                                .SingleOrDefault(d => d.ID == id);
            if(movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        [HttpGet]
        public List<Movie> GetAllMovies(string title, string director, int? page, string sort,  int length = 2, string dir = "asc")
        {
            IQueryable<Movie> query = ctx.Movies;

            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(d => d.Title == title);
            if (!string.IsNullOrWhiteSpace(director))
                query = query.Where(d => d.Director.Name == director);
            if(!string.IsNullOrWhiteSpace(director))
                query = query.Where(d => d.Director.FirstName + "_" + d.Director.Name == director);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "title":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Title);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Title);
                        break;
                    case "director":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Director.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Director.Name);
                        break;
                    case "release":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Release);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Release);
                        break;
                    case "score":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Score);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Score);
                        break;
                }
            }



            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return ctx.Movies.ToList();
        }
        
        
        [HttpPost]
        public IActionResult CreateMovie([FromBody] Movie newMovie)
        {
            ctx.Movies.Add(newMovie);
            ctx.SaveChanges();
            return Created("", newMovie);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteMovie(int id)
        {
            var movie = ctx.Movies.Find(id);
            if (movie == null)
            {
                return NotFound();
            }
            ctx.Movies.Remove(movie);
            ctx.SaveChanges();
            return NoContent();
        }

        [Route("{id}/director")]
        [HttpGet]
        public IActionResult GetMovieDirector(int id)
        {
            var movie = ctx.Movies
                                .Include(d => d.Director)
                                .SingleOrDefault(d => d.ID == id);
            var director = movie.Director;
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(director);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}