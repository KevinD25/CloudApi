using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Model
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public int Release { get; set; }
        public Director Director { get; set; }
        public double Score { get; set; }
    }
}
