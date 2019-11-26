using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    /**
     * Represents the frequency of a word for every blog. 
     */
    public class WordFrequency
    {
        public string word;
        public double max = Double.MinValue, min = Double.MaxValue;

        public WordFrequency (string word)
        {
            this.word = word;
        }
    }
}
