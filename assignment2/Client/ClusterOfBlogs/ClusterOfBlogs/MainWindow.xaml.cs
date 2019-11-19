using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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
            InitializeTree();
        }

        private void InitializeTree()
        {
            TreeViewItem item = new TreeViewItem();
            item.Header = "Testing";
            TreeViewItem item2 = new TreeViewItem();
            item2.Header = "1 2 3";
            item.Items.Add(item2);
            treeView.Items.Add(item);
        }

        private async void button_Click(object sender, RoutedEventArgs e)
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("http://localhost:3000/getdata");
            textBox.Text = response.ToString();
        }
    }
}
