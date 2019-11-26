using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClusterOfBlogs
{
    /**
     *  Logic for generating the Hierarchical cluster.
     */
    static class Hierarchical
    {
        /**
         *  Main loop of the algorithm.
         */
        public static Cluster GetRootCluster(List<Blog> blogs)
        {
            List<Cluster> clusters = InitializeClusters(blogs);

            while (clusters.Count > 1)
            {
                double closest = Double.MaxValue;
                Cluster clusterA = null, clusterB = null;

                foreach (Cluster cA in clusters)
                {
                    foreach (Cluster cB in clusters)
                    {
                        double distance = Pearson(cA.blog, cB.blog);

                        if (distance < closest && cA != cB)
                        {
                            closest = distance;
                            clusterA = cA;
                            clusterB = cB;
                        }
                    }
                }

                Cluster newCluster = Merge(clusterA, clusterB, closest);
                clusters.Add(newCluster);
                clusters.Remove(clusterA);
                clusters.Remove(clusterB);
            }

            return clusters[0];
        }

        /**
         *  Creates a cluster for each blog.
         */
        private static List<Cluster> InitializeClusters(List<Blog> blogs)
        {
            List<Cluster> clusters = new List<Cluster>();

            foreach (Blog blog in blogs)
            {
                clusters.Add(new Cluster(blog));
            }

            return clusters;
        }

        /**
         *  Calculates the Pearson similarity between two blogs.
         */
        private static double Pearson(Blog blogA, Blog blogB)
        {
            double blogASum = 0, blogBSum = 0, blogASqSum = 0, blogBSqSum = 0, pSum = 0;
            int nrWords = blogA.wordCount.Count;

            for (int i = 0; i < nrWords; i++)
            {
                double cntA = blogA.wordCount[i].count;
                double cntB = blogB.wordCount[i].count;
                blogASum += cntA;
                blogBSum += cntB;
                blogASqSum += Math.Pow(cntA, 2);
                blogBSqSum += Math.Pow(cntB, 2);
                pSum += cntA * cntB;
            }

            double num = pSum - (blogASum * blogBSum / nrWords);
            double den = Math.Sqrt((blogASqSum - Math.Pow(blogASum, 2) / nrWords) * (blogBSqSum - Math.Pow(blogBSum, 2) / nrWords));

            return 1.0 - num / den;
        }

        /**
         *  Merges two clusters together.
         */
        private static Cluster Merge(Cluster clusterA, Cluster clusterB, double distance)
        {
            int nrWords = clusterA.blog.wordCount.Count;

            Cluster newCluster = new Cluster();
            newCluster.left = clusterA;
            newCluster.right = clusterB;

            Blog newBlog = new Blog();

            for (int i = 0; i < nrWords; i++)
            {
                double cntA = clusterA.blog.wordCount[i].count;
                double cntB = clusterB.blog.wordCount[i].count;
                double cnt = (cntA + cntB) / 2;
                newBlog.wordCount.Add(new WordCount(clusterA.blog.wordCount[i].word, cnt));
            }
            newBlog.title = clusterA.blog.title;
            newCluster.blog = newBlog;
            newCluster.distance = distance;

            return newCluster;
        }
    }
}
