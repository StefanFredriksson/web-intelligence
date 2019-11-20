using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    class WordFrequency
    {
        public string word;
        public int max = int.MinValue, min = int.MaxValue;

        public WordFrequency (string word)
        {
            this.word = word;
        }
    }
}
