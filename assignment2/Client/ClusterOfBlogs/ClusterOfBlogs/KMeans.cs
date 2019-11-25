using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    static class KMeans
    {
        private const int NUMBER_OF_CENTROIDS = 4;

        public static List<Centroid> GetClusters(List<Blog> blogs)
        {
            WordFrequency[] wFreq = GetWordFrequencies(blogs);
            List<Centroid> centroids = new List<Centroid>();
            int nrWords = blogs[0].wordCount.Count;
            Random rnd = new Random();

            for (int i = 1; i <= NUMBER_OF_CENTROIDS; i++)
            {
                Centroid cen = new Centroid();

                foreach (WordFrequency freq in wFreq)
                {
                    cen.count.Add(rnd.Next((int)freq.min, (int)freq.max + 1));
                }
                centroids.Add(cen);
            }

            while (true)
            {
                ClearAssignments(centroids);

                foreach (Blog blog in blogs)
                {
                    double distance = Double.MaxValue;
                    Centroid best = null;

                    foreach (Centroid cen in centroids)
                    {
                        double cenDist = Pearson(blog, cen);

                        if (cenDist < distance)
                        {
                            best = cen;
                            distance = cenDist;
                        }
                    }

                    best.blogs.Add(blog);
                }

                foreach (Centroid cen in centroids)
                {
                    for (int j = 0; j < nrWords; j++)
                    {
                        double avg = 0;

                        foreach (Blog blog in cen.blogs)
                        {
                            avg += blog.wordCount[j].count;
                        }

                        avg /= cen.blogs.Count;
                        cen.count[j] = avg;
                    }
                }

                if (ShouldExit(centroids))
                {
                    break;
                }
            }

            return centroids;
        }

        private static void ClearAssignments (List<Centroid> centroids)
        {
            foreach (Centroid cen in centroids)
            {
                cen.prevBlogs = new List<Blog>(cen.blogs);
                cen.blogs.Clear();
            }
        }

        private static double Pearson(Blog blog, Centroid centroid)
        {
            double blogSum = 0, cenSum = 0, blogSqSum = 0, cenSqSum = 0, pSum = 0;
            int nrWords = blog.wordCount.Count;

            for (int i = 0; i < nrWords; i++)
            {
                double blogCnt = blog.wordCount[i].count;
                double cenCnt = centroid.count[i];
                blogSum += blogCnt;
                cenSum += cenCnt;
                blogSqSum += Math.Pow(blogCnt, 2);
                cenSqSum += Math.Pow(cenCnt, 2);
                pSum += blogCnt * cenCnt;
            }

            double num = pSum - (blogSum * cenSum / nrWords);
            double den = Math.Sqrt((blogSqSum * Math.Pow(blogSum, 2) / nrWords) * (cenSqSum * Math.Pow(cenSum, 2) / nrWords));

            return 1.0 - num / den;
        }

        private static WordFrequency[] GetWordFrequencies(List<Blog> blogs)
        {
            WordFrequency[] wFreq = new WordFrequency[blogs[0].wordCount.Count];

            for (int i = 0; i < wFreq.Length; i++)
            {
                wFreq[i] = new WordFrequency(blogs[0].wordCount[i].word);
            }

            foreach (Blog blog in blogs)
            {
                for (int i = 0; i < blog.wordCount.Count; i++)
                {
                    double count = blog.wordCount[i].count;

                    if (count > wFreq[i].max)
                    {
                        wFreq[i].max = count;
                    }

                    if (count < wFreq[i].min)
                    {
                        wFreq[i].min = count;
                    }
                }
            }

            return wFreq;
        }

        private static bool ShouldExit(List<Centroid> centroids)
        {
            bool firstIteration = true;

            foreach (Centroid cen in centroids)
            {
                if (cen.blogs.Count == cen.prevBlogs.Count)
                {
                    firstIteration = false;
                    for (int i = 0; i < cen.blogs.Count; i++)
                    {
                        if (cen.blogs[i].title != cen.prevBlogs[i].title)
                        {
                            return false;
                        }
                    }
                }
            }

            return firstIteration ? false : true;
        }
    }
}
