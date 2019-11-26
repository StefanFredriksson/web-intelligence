using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ClusterOfBlogs
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        /**
         * Retrieves blogs from server.
         */
        private async Task<List<Blog>> GetBlogs()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("http://localhost:3000/getdata");
            string data = await response.Content.ReadAsStringAsync();
            JavaScriptSerializer JSSerializer = new JavaScriptSerializer();
            return JSSerializer.Deserialize<List<Blog>>(data);
        }

        /**
         * Event listener for K-Means.
         */
        public async void KMeansEvent(object sender, RoutedEventArgs e)
        {
            List<Blog> blogs = await GetBlogs();
            List<Centroid> centroids = KMeans.GetCentroids(blogs);
            PrintKMeans(centroids);
        }

        /**
         * Prints the K-Means tree.
         */
        public void PrintKMeans (List<Centroid> centroids)
        {
            int count = 0;
            int blogCount = 0;

            treeView.Items.Clear();

            foreach (Centroid centroid in centroids)
            {
                TreeViewItem folder = new TreeViewItem();
                
                foreach (Blog blog in centroid.blogs)
                {
                    TreeViewItem child = new TreeViewItem();
                    child.Header = blog.title;
                    folder.Items.Add(child);
                    blogCount++;
                }
                folder.Header = "Cluster " + ++count + " (" + blogCount + ")";
                treeView.Items.Add(folder);
                blogCount = 0;
            }
        }

        /**
         * Event listener for Hierarchical.
         */
        public async void HierarchicalEvent(object sender, RoutedEventArgs e)
        {
            List<Blog> blogs = await GetBlogs();
            Cluster root = Hierarchical.GetRootCluster(blogs);
            treeView.Items.Clear();
            treeView.Items.Add(Traverse(root));
        }

        /**
         * Creates the Hierarchical tree using a recursive method.
         */
        private TreeViewItem Traverse(Cluster root)
        {
            TreeViewItem folder = new TreeViewItem();
            folder.IsExpanded = true;

            if (root.left != null)
            {
                folder.Items.Add(Traverse(root.left));
            }

            if (root.right != null)
            {
                folder.Items.Add(Traverse(root.right));
            }

            if (root.distance == 0)
            {
                folder.Header = root.blog.title;
            }

            return folder;
        }
    }
}
