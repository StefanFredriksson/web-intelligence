using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace MachineLearning
{
    public static class DataLogic
    {
        public static float[][] GetData(string fileName)
        {
            List<float[]> data = new List<float[]>();

            string[] rawData = ReadFile(fileName);

            foreach (string line in rawData)
            {
                List<float> row = new List<float>();
                List<string> values = new List<string>(line.Split(','));
                values.RemoveAt(values.Count - 1);
                foreach (string value in values)
                {
                    if (float.TryParse(value, out float result))
                    {
                        row.Add(result);
                    }
                }

                if (row.Count > 0)
                {
                    data.Add(row.ToArray());
                }
            }

            return data.ToArray();
        }

        public static int[] GetLabels(string fileName)
        {
            List<string> rawData = new List<string>(ReadFile(fileName));
            rawData.RemoveAt(0);
            List<int> labels = new List<int>();
            Dictionary<string, int> d = new Dictionary<string, int>();

            foreach (string line in rawData)
            {
                string[] values = line.Split(',');
                string value = values[values.Length - 1];

                if (!d.ContainsKey(value))
                {
                    d.Add(value, d.Count);
                }

                labels.Add(d[value]);
            }

            return labels.ToArray();
        }

        private static string[] ReadFile(string fileName)
        {
            string dest = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"..\..\Data\" + fileName));
            List<string> text = new List<string>();

            if (File.Exists(dest))
            {
                using (StreamReader reader = new StreamReader(dest))
                {
                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine();
                        text.Add(line);
                    }
                }
            }

            return text.ToArray();
        }

        public static List<string> GetFiles()
        {
            string dest = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), @"..\..\Data"));
            List<string> fileNames = new List<string>();
            if (Directory.Exists(dest))
            {
                string[] files = Directory.GetFiles(dest);

                foreach (string file in files)
                {
                    int start = file.LastIndexOf('\\');
                    int end = file.LastIndexOf('.');
                    int length = end - (start + 1);
                    fileNames.Add(file.Substring(start + 1, length));
                }
            }

            return fileNames;
        }
    }
}
