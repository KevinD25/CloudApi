using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Model
{
    public class DBInitializer
    {
        public static void Initialize(McuContext ctx)
        {
            ctx.Database.EnsureCreated();

            if (!ctx.Movies.Any())
            {
                var movie = new Movie()
                {
                    Title = "Iron Man",
                    Release = 2008,
                    DirectorID = 0,
                    Score = 7.9
                };
                ctx.Movies.Add(movie);
                ctx.SaveChanges();
            }
        }
    }
}
