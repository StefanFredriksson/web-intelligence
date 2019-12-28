using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MachineLearning
{
    class NaiveBayes
    {
        private static List<Type> data;

        public static void Fit(float[][] X, int[] y)
        {
            data = Logic.GetCategories(X, y);
        }

        public static int[] Predict(float[][] X)
        {
            List<int> bestPreds = new List<int>();

            for (int i = 0; i < X.Length; i++)
            {
                foreach (Type type in data)
                {
                    float product = 1;
                    for (int j = 0; j < X[i].Length; j++)
                    {
                        float value = X[i][j];
                        Category cat = type.cats.Find(c => c.category == j);

                        if (cat != null)
                        {
                            float pdf = Logic.GetPDF(value, cat.mean, cat.std);
                            product *= pdf;
                        }
                    }

                    type.probability = product;
                }

                Logic.Normalize(data);

                float max = float.MinValue;
                int bestType = -1;
                foreach (Type type in data)
                {
                    if (type.probability > max)
                    {
                        max = type.probability;
                        bestType = type.type;
                    }
                }

                bestPreds.Add(bestType);
            }

            return bestPreds.ToArray();
        }
    }
}
