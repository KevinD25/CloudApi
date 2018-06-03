using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Model
{
    public class Director
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        [JsonIgnore]
        public ICollection<Movie> Movies { get; set; }
    }
}
