using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace lzq
{
    public class PrintData
    {
        public static void Printword()
        {
            /*private static Word._Document wDoc = null;// --word文档
            private static Word._Application wApp = null;// --word进程

            //开启一个新的word进程

            Word.Application thisApplication = new Word.ApplicationClass();
            wApp = thisApplication;

            string tmpDocFile="D:\Documents and Settings\Administrator\桌面\tmp.doc";
            object templatefile = tmpDocFile;
            wDoc = wApp.Documents.Add(ref templatefile, ref missing, ref missing, ref missing); //在现有进程内打开文档
            wDoc.Activate(); //当前文档置前

            //------------------------字符替换模块----------------------------------------------------------------------
            //替换模版中的字符开始
            object replaceAll = Word.WdReplace.wdReplaceAll; //替换所有
            wApp.Selection.Find.ClearFormatting();
            wApp.Selection.Find.Text = "#old#";        //替换的字符为#old#
            wApp.Selection.Find.Format = false;
            wApp.Selection.Find.Forward = true;    //向前查找
            wApp.Selection.Find.MatchByte = true;
            wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindAsk;
            wApp.Selection.Find.Replacement.ClearFormatting();
            wApp.Selection.Find.Replacement.Text = "new string"; //替换后新字符
            wApp.Selection.Find.Execute(
            ref missing, ref missing, ref missing, ref missing, ref missing,
            ref missing, ref missing, ref missing, ref missing, ref missing,
            ref replaceAll, ref missing, ref missing, ref missing, ref missing);
//替换模版中的字符开始结束

//一般我们要在模版内插入图片，这个位置是事先定好的，我们在模版内使用字符串“#Image#”来代替

            string FileName = "c:\1.jpg";//图片所在路径
            object LinkToFile = false;
            object SaveWithDocument = true;

            wApp.Selection.Find.ClearFormatting();
            wApp.Selection.Find.Text = "#Image#";
            wApp.Selection.Find.Format = false;
            wApp.Selection.Find.Forward = true;
            wApp.Selection.Find.MatchByte = true;
            wApp.Selection.Find.Wrap = Word.WdFindWrap.wdFindAsk;

            if (wApp.Selection.Find.Execute(
                    ref missing, ref missing, ref missing, ref missing, ref missing,
                    ref missing, ref missing, ref missing, ref missing, ref missing,
                    ref missing, ref missing, ref missing, ref missing, ref missing))
            {
                wApp.Selection.InlineShapes.AddPicture(FileName, ref LinkToFile, ref SaveWithDocument, ref missing);
            }
//插入图片结束 , 如果有多个图片需要替换，循环该模块即可


            object background = false; //这个很重要，否则关闭的时候会提示请等待Word打印完毕后再退出，加上这个后可以使Word所有

            //页面发送完毕到打印机后才执行下一步操作
            wDoc.SaveAs(ref filename, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref

            missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing);
                        wDoc.PrintOut(ref background, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref

            missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing, ref missing,

            ref missing);
            object saveOption = Word.WdSaveOptions.wdSaveChanges;
            wDoc.Close(ref saveOption, ref missing, ref missing); //关闭当前文档，如果有多个模版文件进行操作，则执行完这一步后接着执行打开Word文档的方法即可
            saveOption = Word.WdSaveOptions.wdDoNotSaveChanges;       
            wApp.Quit(ref saveOption, ref missing, ref missing); //关闭Word进程*/

        }
        public static string GetMD5(string myString)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] fromData = System.Text.Encoding.Unicode.GetBytes(myString);
            byte[] targetData = md5.ComputeHash(fromData);
            string byte2String = null;

            for (int i = 0; i < targetData.Length; i++)
            {
                byte2String += targetData[i].ToString("x");
            }

            return byte2String;
        }
    }
}