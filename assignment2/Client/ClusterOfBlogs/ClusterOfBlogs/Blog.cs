using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    public class Blog
    {
        public string title;
        public List<WordCount> wordCount = new List<WordCount>();
    }
}
