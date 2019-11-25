using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    public class WordCount
    {
        public string word;
        public double count;

        public WordCount() { }

        public WordCount(string word, double count)
        {
            this.word = word;
            this.count = count;
        }
    }
}
