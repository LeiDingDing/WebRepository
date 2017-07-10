using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Windows.Forms;

namespace lzq
{
    public class DBManage
    {


        public static string Query(int id)
        {
            string sql = "select * from student where id="+id;
            DataTable dt = SqlHelper2.GetTable(sql);
            string json = JsonHelper.ToJson(dt);
            return json;
        }
        public static int GetMaxId()
        {
            string sql = " SELECT MAX(ID) from 报奖";
            DataTable dt = SqlHelper2.GetTable(sql);
            DataRow[] rows = dt.Select();
            return Convert.ToInt32(rows[0][0]);
        }
        public static bool ValidateUsername(string role, int username)
        {
            bool flag = false;
            string sql = "";
            if (role == "1")
            {
                sql = "select * from student where id=" + username;
            }
            else if (role == "2")
            {
                sql = "select * from teacher where id=" + username;
            }
            
            DataTable dt = SqlHelper2.GetTable(sql);
            if (dt.Rows.Count > 0)
            {
                flag = true;
            }
            return flag;
        }
        public static string ValidateUserpass(string role, int username, string password)
        {
            string ret = "";
            string sql = "";
            if (role == "1")
            {
                sql = "select roleid,姓名 from student where id=" + username + " and 密码='" + password + "'";
            }
            else if (role == "2")
            {
                sql = "select roleid,姓名 from teacher where id=" + username + " and 密码='" + password + "'";
            }
            
            DataTable dt = SqlHelper2.GetTable(sql);
            if (dt.Rows.Count > 0)
            {
                DataRow[] rows = dt.Select();
                string roleid=rows[0][0].ToString();
                string name =rows[0][1].ToString();
                ret = roleid + "," + name;
            }
            return ret;
        }



        


    }
}