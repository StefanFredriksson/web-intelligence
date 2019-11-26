using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    /**
     *  Class representing a cluster.
     */
    class Cluster
    {
        public Cluster left, right;
        public Blog blog;
        public double distance;

        public Cluster() { }

        public Cluster(Blog blog)
        {
            this.blog = blog;
        }
    }
}
