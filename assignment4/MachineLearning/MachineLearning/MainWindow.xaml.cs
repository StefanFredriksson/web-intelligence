using System;
using System.Collections.Generic;
using System.Linq;
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
using System.Web.UI.WebControls;
using System.Data;

namespace MachineLearning
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            SetDropDown();
        }

        private void SetDropDown()
        {
            List<string> files = DataLogic.GetFiles();

            foreach (string file in files)
            {
                ComboBoxItem cb = new ComboBoxItem();
                cb.Content = file;
                fileSelection.Items.Add(cb);
            }
            ComboBoxItem item = (ComboBoxItem)fileSelection.Items.GetItemAt(0);
            item.IsSelected = true;
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            ComboBoxItem item = (ComboBoxItem)fileSelection.SelectedItem;
            string file = (string)item.Content + ".csv";
            float[][] data = DataLogic.GetData(file);
            int[] labels = DataLogic.GetLabels(file);

            if ((bool)randSelection.IsChecked)
            {
                Logic.Randomize(data, labels);
            }

            NaiveBayes.Fit(data, labels);
            int[] predictions = NaiveBayes.Predict(data);
            float accuracy = Logic.AccuracyScore(predictions, labels);
            int[][] matrix = Logic.ConfusionMatrix(predictions, labels);
            textBox.Text = accuracy + "";
            PrintTable(matrix);
        }

        private void PrintTable(int[][] matrix)
        {
            DataTable dt = new DataTable();

            for (int i = -1; i < matrix[0].Length; i++)
            {
                DataColumn col = new DataColumn();
                if (i == -1)
                {
                    col.ColumnName = "Types";
                } else
                {
                    col.ColumnName = i + "";
                }
                dt.Columns.Add(col);
            }

            for (int i = 0; i < matrix.Length; i++)
            {
                DataRow dr = dt.NewRow();

                for (int j = 0; j < matrix[i].Length; j++)
                {
                    if (j == 0)
                    {
                        DataColumn temp = dt.Columns[j];
                        dr.SetField(temp, i);
                    }

                    DataColumn col = dt.Columns[j + 1];
                    dr.SetField(col, matrix[i][j]);
                }
                dt.Rows.Add(dr);
            }

            DataView dv = new DataView(dt);
            table.ItemsSource = dv;
        }
    }
}
