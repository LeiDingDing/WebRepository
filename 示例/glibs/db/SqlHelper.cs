using System;
using System.Collections.Generic;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

public class SqlHelper
{
    public static readonly string conString =
        ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
        //此处连接字符串设置错误，无法单步调试到！！！！！
    //增删改
    public static bool ExeNonQuery(string sql, CommandType type, params SqlParameter[] lists)
    {
        bool bFlag = false;
        using (SqlConnection con = new SqlConnection(conString))
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = sql;
            cmd.CommandType = type;
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
                int result = cmd.ExecuteNonQuery();
                if (result > 0)
                {
                    bFlag = true;
                }

            }
            catch { ;}
        }
        return bFlag;
    }

    //查．读
    public static SqlDataReader ExeDataReader(string sql, CommandType type, params SqlParameter[] lists)
    {
        SqlConnection con = new SqlConnection(conString);
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = sql;
        cmd.CommandType = type;

        if (con.State == ConnectionState.Closed)
        {
            con.Open();
        }

        if (lists != null)
        {
            foreach (SqlParameter p in lists)
            {
                cmd.Parameters.Add(p);
            }
        }

        SqlDataReader reader = cmd.ExecuteReader();

        return reader;
    }

    //返回单个值
    public static object GetScalar(string sql, CommandType type, params SqlParameter[] lists)
    {
        object returnValue = null;
        using (SqlConnection con = new SqlConnection(conString))
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = sql;
            cmd.CommandType = type;
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
                returnValue = cmd.ExecuteScalar();

            }
            catch { ; }
        }
        return returnValue;
    }

    //返回单个值
    public static DataTable GetScalar(string sql, params SqlParameter[] lists)  //zq
    {
        using (SqlConnection con = new SqlConnection(conString))
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
                SqlDataAdapter sdap = new SqlDataAdapter();
                sdap.SelectCommand = cmd;
                DataTable dt = new DataTable();
                sdap.Fill(dt);            
                return dt;
            }
            catch
            { 
                return null; 
            }
        }
    }

    //返回单个值
    public static int GetScalarInt(string sql, params SqlParameter[] lists)  //zq
    {
        int returnValue = 0;
        using (SqlConnection con = new SqlConnection(conString))
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
                returnValue =Convert.ToInt32(cmd.ExecuteScalar());

            }
            catch { returnValue = -1; }
        }
        return returnValue;
    }

    public static int GetScalarInt(string sql)  //zq
    {
        int returnValue = 0;
        using (SqlConnection con = new SqlConnection(conString))
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = sql;
            
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

    public static object GetScalar(string sql)  //zq
    {
        object returnValue = null;
        using (SqlConnection con = new SqlConnection(conString))
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = sql;
            
            try
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
                returnValue = cmd.ExecuteScalar();

            }
            catch { ; }
        }
        return returnValue;
    }

    //事务
    public static bool ExeNonQueryTran(List<SqlCommand> list)
    {
        bool flag = true;
        SqlTransaction tran = null;
        using (SqlConnection con = new SqlConnection(conString))
        {
            try
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                    tran = con.BeginTransaction();
                    foreach (SqlCommand com in list)
                    {
                        com.Connection = con;
                        com.Transaction = tran;
                        com.ExecuteNonQuery();
                    }
                    tran.Commit();
                }
            }
            catch 
            {
                //Console.Write(ex.Message);
                tran.Rollback();
                flag = false;
            }
        }
        return flag;
    }
    //返回DataTable
    public static DataTable GetTable(string sql)
    {
        SqlConnection conn = new SqlConnection(conString);
        SqlDataAdapter da = new SqlDataAdapter(sql, conn);
        DataTable table = new DataTable();
        da.Fill(table);
        return table;
    }
    /// <summary>
    /// 调用带参数的存储过程，返回dataTable
    /// </summary>
    /// <param name="proc">存储过程的名称</param>
    /// <param name="rows">一页几行</param>
    /// <param name="page">当前页</param>
    /// <param name="tabName">表名</param>
    /// <returns>dataTable</returns>
    public static DataTable Proc_Table(string proc, int rows, int page, string tabName)
    {
        SqlConnection conn = new SqlConnection(conString);
        SqlCommand cmd = new SqlCommand(proc, conn);
        //指定调用存储过程
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@rows", rows);
        cmd.Parameters.AddWithValue("@page", page);
        cmd.Parameters.AddWithValue("@tabName", tabName);
        SqlDataAdapter apt = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        apt.Fill(dt);
        return dt;
    }

   //调用带参数的存储过程返回datatable
    public static DataTable GetTablebyproc(string proc, int pageRow, int pagSize, string tabName)
    {
        SqlConnection conn = new SqlConnection(conString);
        SqlCommand cmd = new SqlCommand(proc,conn);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@rows", pageRow);
        cmd.Parameters.AddWithValue("@pagesize", pagSize);
        cmd.Parameters.AddWithValue("@tablename", tabName);
        SqlDataAdapter apt = new SqlDataAdapter(cmd);
        DataTable table = new DataTable();
        apt.Fill(table);
        return table;

    }
    public static DataTable GetDataByPager(string tbname, string fieldkey, int pagecurrent, int pagesize, string fieldshow, string fieldorder, string wherestring, ref int pagecount)
    {
        SqlParameter[] parameters = {
				new SqlParameter("@tbname",   SqlDbType.VarChar, 100),
                new SqlParameter("@FieldKey", SqlDbType.VarChar, 100),
                new SqlParameter("@PageCurrent", SqlDbType.Int),
                new SqlParameter("@PageSize", SqlDbType.Int),
                new SqlParameter("@FieldShow", SqlDbType.VarChar, 200),
                new SqlParameter("@FieldOrder", SqlDbType.VarChar, 200),
                new SqlParameter("@WhereString", SqlDbType.VarChar, 500),
                new SqlParameter("@RecordCount", SqlDbType.Int),
			};
        parameters[0].Value = tbname;
        parameters[1].Value = fieldkey;
        parameters[2].Value = pagecurrent;
        parameters[3].Value = pagesize;
        parameters[4].Value = fieldshow;
        parameters[5].Value = fieldorder;
        parameters[6].Value = wherestring;
        parameters[7].Direction = ParameterDirection.Output;
        DataTable dt = ExecuteQuery("sp_get_data", parameters).Tables[0];
        pagecount = Convert.ToInt32(parameters[7].Value);
        return dt;
    }
    /// <summary>
    /// 执行有参数的查询类存储过程
    /// </summary>
    /// <param name="pstrStoreProcedure">存储过程名</param>
    /// <param name="pParms">存储过程的参数数组</param>
    /// <returns>查询得到的结果集</returns>
    public static DataSet ExecuteQuery(string pstrStoreProcedure, SqlParameter[] pParms)
    {
        DataSet dsResult = new DataSet();
        SqlDataAdapter sda = new SqlDataAdapter();
        SqlConnection con = new SqlConnection(conString);
        SqlCommand cmd;
        int intCounter;
        try
        {
            if (con.State != ConnectionState.Open)
                con.Open();
            cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = pstrStoreProcedure;
            if (pParms != null)
            {
                for (intCounter = 0; intCounter < pParms.GetLength(0); intCounter++)
                {
                    cmd.Parameters.Add(pParms[intCounter]);
                }
            }
            sda.SelectCommand = cmd;
            sda.Fill(dsResult);


        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
        finally
        {
            //清空关闭操作
            sda.Dispose();
            con.Close();
            con.Dispose();

        }
        return dsResult;
    }
    /// <summary>
    /// 此分页存储过程直没修改 大家可以用自己的
    /// </summary>
    /// <param name="tableName">表名</param>
    /// <param name="getFields">需要返回的列</param>
    /// <param name="orderName">排序的字段名</param>
    /// <param name="pageSize">页尺寸</param>
    /// <param name="pageIndex">页码</param>
    /// <param name="isGetCount">返回记录总数,非 0 值则返回</param>
    /// <param name="orderType">设置排序类型,0表示升序非0降序</param>
    /// <param name="strWhere"></param>
    /// <returns></returns>
    //public static DataSet GetList(string tableName, string getFields, string orderName, int pageSize, int pageIndex, bool isGetCount, bool orderType, string strWhere)
    //{
    //    SqlParameter[] parameters = {
    //            new SqlParameter("@tblName", SqlDbType.VarChar, 255),
    //            new SqlParameter("@strGetFields", SqlDbType.VarChar, 1000),
    //            new SqlParameter("@fldName", SqlDbType.VarChar, 255),
    //          new SqlParameter("@PageSize", SqlDbType.Int),
    //       new SqlParameter("@PageIndex", SqlDbType.Int),
    //        new SqlParameter("@doCount", SqlDbType.Bit),
    //            new SqlParameter("@OrderType", SqlDbType.Bit),
    //            new SqlParameter("@strWhere", SqlDbType.VarChar, 1500)            
    //                             };
    //    parameters[0].Value = tableName;
    //    parameters[1].Value = getFields;
    //    parameters[2].Value = orderName;
    //    parameters[3].Value = pageSize;
    //    parameters[4].Value = pageIndex;
    //    parameters[5].Value = isGetCount ? 1 : 0;
    //    parameters[6].Value = orderType ? 1 : 0;
    //    parameters[7].Value = strWhere;
    //    return SqlHelper.RunProcedure("pro_pageList", parameters, "ds");
    //}
    //public static DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName)
    //{
    //    using (SqlConnection connection = new SqlConnection(conString))
    //    {
    //        DataSet dataSet = new DataSet();
    //        connection.Open();
    //        new SqlDataAdapter { SelectCommand = BuildQueryCommand(connection, storedProcName, parameters) }.Fill(dataSet, tableName);
    //        connection.Close();
    //        return dataSet;
    //    }
    //}
    /// <summary>
    /// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
    /// </summary>
    /// <param name="connection">数据库连接</param>
    /// <param name="storedProcName">存储过程名</param>
    /// <param name="parameters">存储过程参数</param>
    /// <returns>SqlCommand</returns>
    /// 
    /*
    private static SqlCommand BuildQueryCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
    {
        SqlCommand command = new SqlCommand(storedProcName, connection)
        {
            CommandType = CommandType.StoredProcedure;
        };
        foreach (SqlParameter parameter in parameters)
        {
            if (parameter != null)
            {
                if (((parameter.Direction == ParameterDirection.InputOutput) || (parameter.Direction == ParameterDirection.Input)) && (parameter.Value == null))
                {
                    parameter.Value = DBNull.Value;
                }
                command.Parameters.Add(parameter);
            }
        }
        return command;
    }
     * */

    //根据表名和主键id来进行删除
    public static int DelData(string tabName, string ID)
    {
        if (ID != string.Empty && ID != "0")
        {
            string sql = string.Format("delete from {0}  WHERE (ID IN ({1}))", tabName, ID);
            int delNum = ExecuteSql(sql);
            return delNum;
        }
        return 0;
    }
    //增删改返回执行条数
    public static int ExecuteSql(string SQLString)
    {
        int num2;
        using (SqlConnection connection = new SqlConnection(conString))
        {
            SqlCommand command = new SqlCommand(SQLString, connection);
            try
            {
                connection.Open();
                num2 = command.ExecuteNonQuery();  //返回影响行数
            }
            catch (SqlException exception)
            {
                connection.Close();
                throw exception;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
            }
        }
        return num2;
    }

    /// <summary>
    /// 获取分页数据
    /// </summary>
    /// <param name="index">当前页</param>
    /// <param name="size">每一页数据行数</param>
    /// <param name="ht">查询条件key是字段，value是对应的值</param>
    /// <param name="fieldList">要返回的字段</param>
    /// <param name="orderby">排序规则不要order by ,如 AddDate desc,userid asc</param>
    /// <returns></returns>
    public static DataTable GetSearchePage(int index, int size, string stb, string sc, string fieldList, string orderby, out int irowcount)
    {
        //string sc; //过滤条件
        irowcount = GetScalarInt("select count(*) from " + stb + " where " + sc);
        //sql 2005支持,但sql 2000不支持 {
        ///*
        string sql = "select * from (select {0},ROW_NUMBER() over(order by {1}) as num_zq from {2} where {3}) as tb";
        sql += " where num_zq between {4} and {5}";
        sql = string.Format(sql, fieldList, orderby, stb, sc, (index - 1) * size + 1, index * size);
        //*/

        //sql 2000支持 {
        /*
        string orderby2;
        if (orderby.IndexOf("desc") > 0)
        {
            orderby2 = orderby.Replace("desc", "asc");
        }
        else
        {
            orderby2 = orderby.Replace("asc", "desc");
        }
        string sql = "select * from (select top {0} * from (select top {1} {2} from {3} where {4} order by {5}) t order by {6})  t order by {5}";
        sql = string.Format(sql, irowcount >= index * size ? size : irowcount - (index-1) * size, index * size, fieldList, stb, sc, orderby, orderby2);
        
        */
        //sql 2000支持 }
        return GetTable(sql);
    }

    
}