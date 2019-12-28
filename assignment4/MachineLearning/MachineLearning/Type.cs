using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MachineLearning
{
    public class Type
    {
        public int type;
        public List<Category> cats = new List<Category>();
        public float probability;

        public Type(int type)
        {
            this.type = type;
        }
    }
}
