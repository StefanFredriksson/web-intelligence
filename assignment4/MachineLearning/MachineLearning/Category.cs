using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MachineLearning
{
    public class Category
    {
        public List<float> values = new List<float>();
        public float mean, std;
        public int category;

        public Category(int category)
        {
            this.category = category;
        }
    }
}
