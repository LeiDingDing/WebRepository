using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Security.Cryptography;


public class SqlHelper2 
    {
        private static string str = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString; 
        public static int ExecuteNonQuery(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sql;
                    cmd.Parameters.AddRange(parameters);
                    return cmd.ExecuteNonQuery();
                }
            }

        }
        public static object ExecuteSalar(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sql;
                    cmd.Parameters.AddRange(parameters);
                    return cmd.ExecuteScalar();
                }
            }
        }
        public static DataTable ExecuteDataTable(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sql;
                    cmd.Parameters.AddRange(parameters);
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    DataSet dataset = new DataSet();
                    adapter.Fill(dataset);
                    return dataset.Tables[0];
                }
            }
        }
        public static SqlDataReader ExecuteReader(string sql, params SqlParameter[] parameters)
        {
            try
            {

                SqlConnection conn = new SqlConnection(str);//返回DataReader时,是不可以用using()的  
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                {
                    cmd.CommandText = sql;
                    return cmd.ExecuteReader();
                }
            }
            catch //(Exception ex)   
            {
                return null;
            }

        }
        //党员系统引入
        public static DataTable GetSearchePage(int index, int size, string stb, string sc, string fieldList, string orderby, out int irowcount)
        {
            if (sc != "")
            {
                string sql = string.Format("select count(*) from " + stb + " where " + sc);
                irowcount = GetScalarInt(sql);//"select count(*) from " + stb + " where " + sc);
                sql = "select * from (select {0},ROW_NUMBER() over(order by {1}) as num from {2} where {3}) as tb";
                sql += " where num between {4} and {5}";
                sql = string.Format(sql, fieldList, orderby, stb, sc, (index - 1) * size + 1, index * size);
                return GetTable(sql);
            }
            else
            {
                string sql = string.Format("select count(*) from " + stb);
                irowcount = GetScalarInt(sql);//"select count(*) from " + stb + " where " + sc);
                sql = "select * from (select {0},ROW_NUMBER() over(order by {1}) as num from {2}) as tb";
                sql += " where num between {3} and {4}";
                sql = string.Format(sql, fieldList, orderby, stb, (index - 1) * size + 1, index * size);
                return GetTable(sql);
            }
        }
        public static int GetScalarInt(string sql, params SqlParameter[] lists)  //zq
        {
            int returnValue = 0;
            using (SqlConnection con = new SqlConnection(str))
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                cmd.CommandText = sql;
                if (lists != null)
                {
                    foreach (SqlParameter p in lists)
                    {
                        cmd.Parameters.Add(p);
                    }
                }
                try
                {
                    if (con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    returnValue = Convert.ToInt32(cmd.ExecuteScalar());

                }
                catch { returnValue = -1; }
            }
            return returnValue;
        }
        public static DataTable GetTable(string sql)
        {
            SqlConnection conn = new SqlConnection(str);
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable table = new DataTable();
            da.Fill(table);
            return table;
        }
    }

