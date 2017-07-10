using Microsoft.Office.Interop.Word;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lzq
{
    public class ExportClass
    {
        public static void OutPutWordDT(string strTitle, System.Data.DataTable dt, bool isColname)
        {
           
            Object Nothing = System.Reflection.Missing.Value;
            Application oword = new Application();
            Document odoc = oword.Documents.Add(ref Nothing, ref Nothing, ref Nothing, ref Nothing);
            odoc.Paragraphs.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            try
            {
                Table otable = odoc.Tables.Add(oword.Selection.Range, dt.Rows.Count + 2, dt.Columns.Count, ref Nothing, ref Nothing);
                otable.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//设置对其方式
                otable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;//设置表格边框样式
                otable.Cell(1, 1).Merge(otable.Cell(1, dt.Columns.Count)); //合并单元格
                otable.Cell(1, 1).Range.Text = strTitle;
                otable.Cell(1, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                otable.Cell(1, 1).Range.Font.Bold = 1;
                otable.Cell(1, 1).Range.Font.Size = 20;
                if (isColname)
                {
                    int intCol = 0;
                    for (int ii = 0; ii < dt.Columns.Count; ii++)
                    {
                        intCol += 1;
                        otable.Cell(2, intCol).Range.Text = dt.Columns[ii].ColumnName;
                        otable.Cell(2, intCol).Range.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;//设置单元格样式
                    }
                }
                int intRow = 2;
                for (int ii = 0; ii < dt.Rows.Count; ii++)
                {
                    intRow += 1;
                    int intcol = 0;
                    for (int jj = 0; jj < dt.Columns.Count; jj++)
                    {
                        intcol += 1;
                        otable.Cell(intRow, intcol).Range.Text = dt.Rows[ii][jj].ToString();
                        otable.Cell(intRow, intcol).Range.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;//设置单元格样式
                    }
                }
                oword.Visible = true;
            }
            catch (Exception) { }
        }
        
        
    }
}