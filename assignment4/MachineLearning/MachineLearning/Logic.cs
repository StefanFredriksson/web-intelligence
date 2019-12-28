using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MachineLearning
{
    public static class Logic
    {
        public static List<Type> GetCategories(float[][] values, int[] labels)
        {
            List<Type> types = new List<Type>();

            foreach (int label in labels)
            {
                Type type = types.Find(t => t.type == label);

                if (type == null)
                {
                    types.Add(new Type(label));
                }
            }

            for (int i = 0; i < values.Length; i++)
            {
                for (int j = 0; j < values[i].Length; j++)
                {
                    Type type = types.Find(t => t.type == labels[i]);
                    Category cat = type.cats.Find(c => c.category == j);

                    if (cat == null)
                    {
                        cat = new Category(j);
                        type.cats.Add(cat);
                    }

                    cat.values.Add(values[i][j]);
                }
            }

            foreach (Type type in types)
            {
                foreach (Category cat in type.cats)
                {
                    cat.mean = GetMean(cat.values);
                    cat.std = GetStandardDeviation(cat.values, cat.mean);
                }
            }

            return types;
        }

        private static float GetMean(List<float> values)
        {
            float sum = 0;

            foreach (float value in values)
            {
                sum += value;
            }

            return sum / values.Count;
        }

        private static float GetStandardDeviation(List<float> values, float mean)
        {
            float sum = 0;

            foreach (float value in values)
            {
                sum += (float)Math.Pow(value - mean, 2.0);
            }

            float std = (float)Math.Sqrt((1 / ((float)values.Count - 1)) * sum);
            return std;
        }

        public static float GetPDF(float value, float mean, float std)
        {
            float pdf = (1 / ((float)Math.Sqrt(2 * Math.PI) * std)) * (float)Math.Exp(-((float)Math.Pow(value - mean, 2)) / (2 * (float)Math.Pow(std, 2)));
            return pdf;
        }

        public static void Normalize(List<Type> types)
        {
            float sum = 0;

            foreach (Type type in types)
            {
                sum += type.probability;
            }

            foreach (Type type in types)
            {
                type.probability /= sum;
            }
        }

        public static void Randomize(float[][] X, int[] y)
        {
            const int NUMBER_OF_TIMES = 10000;
            Random rand = new Random();

            for (int i = 0; i < NUMBER_OF_TIMES; i++)
            {
                int rndIndex1 = rand.Next(X.Length);
                int rndIndex2 = rand.Next(X.Length);
                float[] tempRow = X[rndIndex1];
                int tempLabel = y[rndIndex1];
                X[rndIndex1] = X[rndIndex2];
                y[rndIndex1] = y[rndIndex2];
                X[rndIndex2] = tempRow;
                y[rndIndex2] = tempLabel;
            }
        }

        public static float AccuracyScore(int[] preds, int[] y)
        {
            int count = 0;

            for (int i = 0; i < y.Length; i++)
            {
                if (preds[i] == y[i])
                {
                    count++;
                }
            }

            return count / (float)y.Length;
        }

        public static int[][] ConfusionMatrix(int[] preds, int[] y)
        {
            int count = 0;

            foreach (int label in y)
            {
                if (label == count)
                {
                    count++;
                }
            }

            int[][] matrix = new int[count][];

            for (int i = 0; i < count; i++)
            {
                matrix[i] = new int[count];
            }

            for (int i = 0; i < y.Length; i++)
            {
                matrix[y[i]][preds[i]]++;
            }

            return matrix;
        }

        public static int GetNrOfCorrectPredictions(int[] preds, int[] actual)
        {
            int sum = 0;

            for (int i = 0; i < preds.Length; i++)
            {
                if (preds[i] == actual[i])
                {
                    sum++;
                }
            }

            return sum;
        }
    }
}
