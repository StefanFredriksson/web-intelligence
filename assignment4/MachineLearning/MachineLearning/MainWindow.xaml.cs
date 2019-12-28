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
            foldTable.ItemsSource = null;
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
            accuracy = (float)Math.Round(accuracy * 100, 2);
            int[][] matrix = Logic.ConfusionMatrix(predictions, labels);
            int correctPreds = Logic.GetNrOfCorrectPredictions(predictions, labels);
            textBox.Text = "Accuracy: " + accuracy + "% (" + correctPreds + "/" + labels.Length + " correctly classified)";
            PrintTable(matrix);
        }

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            ComboBoxItem item = (ComboBoxItem)fileSelection.SelectedItem;
            string file = (string)item.Content + ".csv";
            float[][] data = DataLogic.GetData(file);
            int[] labels = DataLogic.GetLabels(file);
            ComboBoxItem foldItem = (ComboBoxItem)foldSelection.SelectedItem;
            int folds = int.Parse((string)foldItem.Content);

            if ((bool)randSelection.IsChecked)
            {
                Logic.Randomize(data, labels);
            }

            int[] predictions = CrossValPredict(data, labels, folds);
            float accuracy = Logic.AccuracyScore(predictions, labels);
            accuracy = (float)Math.Round(accuracy * 100, 2);
            int[][] matrix = Logic.ConfusionMatrix(predictions, labels);
            int correctPreds = Logic.GetNrOfCorrectPredictions(predictions, labels);
            textBox.Text = "Total accuracy: " + accuracy + "% (" + correctPreds + "/" + labels.Length + " correctly classified)";
            PrintTable(matrix);
        }

        private int[] CrossValPredict(float[][] X, int[] y, int folds)
        {
            List<int> bestPreds = new List<int>();
            int numOfRows = X.Length / folds;
            int rest = X.Length % folds;
            DataTable dt = new DataTable();

            for (int i = 0; i < folds; i++)
            {
                DataColumn col = new DataColumn();
                col.ColumnName = "fold " + (i + 1);
                dt.Columns.Add(col);
            }

            DataRow dr = dt.NewRow();

            for (int i = 0; i < folds; i++)
            {
                List<float[]> validation = new List<float[]>();
                List<float[]> training = new List<float[]>();
                List<int> labels = new List<int>();

                int fill = 0;

                if (rest > 0)
                {
                    fill = 1;
                    rest--;
                }

                for (int j = 0; j < X.Length; j++)
                {
                    if (j >= numOfRows * i && j < (numOfRows * (i + 1)) + fill)
                    {
                        validation.Add(X[j]);
                        labels.Add(y[j]);
                    }
                    else
                    {
                        training.Add(X[j]);
                    }
                }

                NaiveBayes.Fit(training.ToArray(), y);
                int[] preds = NaiveBayes.Predict(validation.ToArray());

                foreach (int pred in preds)
                {
                    bestPreds.Add(pred);
                }

                DataColumn col = dt.Columns[i];
                float acc = Logic.AccuracyScore(preds, labels.ToArray());

                dr.SetField(col, Math.Round(acc * 100, 2) + "%");
            }
            dt.Rows.Add(dr);
            DataView dv = new DataView(dt);
            foldTable.ItemsSource = dv;

            return bestPreds.ToArray();
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
