using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    /**
     *  Class representing a centroid.
     */
    public class Centroid
    {
        public List<double> count = new List<double>();
        public List<Blog> blogs = new List<Blog>();
        public List<Blog> prevBlogs = new List<Blog>();
    }
}
