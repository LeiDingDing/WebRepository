using System;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using System.Data;
using System.Reflection;
using System.Data.Common;
using Newtonsoft.Json;
using System.IO;
using System.Text.RegularExpressions;

public class JsonHelper
{
    public JsonHelper()
    {
    }

    public static string ObjectToJSON(Object obj)
    {
        JsonSerializer serializer = new JsonSerializer();
        StringWriter sw = new StringWriter();
        serializer.Serialize(new JsonTextWriter(sw), obj);
        return sw.GetStringBuilder().ToString();
    }
    public static string DataRowToJSON(DataRow dr, string drName)
    {
        StringBuilder sb = new StringBuilder();
        StringWriter sw = new StringWriter(sb);

        using (JsonWriter jw = new JsonTextWriter(sw))
        {
            JsonSerializer ser = new JsonSerializer();
            jw.WriteStartObject();
            jw.WritePropertyName(drName);
            jw.WriteStartObject();

            string filePath = "";
            foreach (DataColumn dc in dr.Table.Columns)
            {
                string columnName = dc.ColumnName;
                if (columnName.CompareTo("filePath") == 0)
                {
                    filePath = columnName;
                }
            }

            foreach (DataColumn dc in dr.Table.Columns)
            {
                jw.WritePropertyName(dc.ColumnName);
                string columnName = dc.ColumnName;
                if (columnName.CompareTo("fileName") == 0)
                {
                    ser.Serialize(jw, "<a href='" + filePath + "'>" + dr[dc].ToString() + "</a>");
                }
                else
                {
                    ser.Serialize(jw, dr[dc].ToString());
                }
            }
            jw.WriteEndObject();
            jw.WriteEndObject();
            sw.Close();
            jw.Close();
        }

        return sb.ToString();
    }

    public static string DataTableToJSON(DataTable dt, string dtName)
    {
        StringBuilder sb = new StringBuilder();
        StringWriter sw = new StringWriter(sb);

        using (JsonWriter jw = new JsonTextWriter(sw))
        {
            JsonSerializer ser = new JsonSerializer();
            jw.WriteStartObject();
            jw.WritePropertyName(dtName);
            jw.WriteStartArray();

            //string filePath = "";
            foreach (DataRow dr in dt.Rows)
            {

                jw.WriteStartObject();

                /*foreach (DataColumn dc in dt.Columns)
                {
                    jw.WritePropertyName(dc.ColumnName);
                    ser.Serialize(jw, dr[dc].ToString());
                }*/
                foreach (DataColumn dc in dt.Columns)
                {
                    string columnName = dc.ColumnName;
                    if (columnName.CompareTo("fileName") == 0)
                    {
                        jw.WritePropertyName(dc.ColumnName);
                        ser.Serialize(jw, "<a href='../upload/" + dr[dc].ToString() + "'>" + dr[dc].ToString() + "</a>");
                    }
                    else
                    {
                        jw.WritePropertyName(dc.ColumnName);
                        ser.Serialize(jw, dr[dc].ToString());
                    }
                }


                jw.WriteEndObject();
            }
            jw.WriteEndArray();
            jw.WriteEndObject();

            sw.Close();
            jw.Close();

        }

        return sb.ToString();
    }

    #region 通用方法
    /// <summary>
    /// 格式化字符型、日期型、布尔型
    /// </summary>
    public static string StringFormat(string str, Type type)
    {
        if (type == typeof(string))
        {
            str = StringFilter(str);
            str = "\"" + str + "\"";
        }
        else if (type == typeof(DateTime) || type == typeof(DateTime?))
        {
            str = "\"" + str + "\"";
        }
        else if (type == typeof(bool))
        {
            str = str.ToLower();
        }
        else if (type == typeof(Guid))
        {
            str = "\"" + str + "\"";
        }
        else if (type != typeof(string) && string.IsNullOrEmpty(str))
        {
            str = "\"" + str + "\"";
        }
        return str;
    }

    /// <summary>
    /// 过滤字符串
    /// </summary>
    public static string StringFilter(string str)
    {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.Length; i++)
        {
            char c = str.ToCharArray()[i];
            switch (c)
            {
                case '\"':
                    sb.Append("\\\""); break;
                case '\\':
                    sb.Append("\\\\"); break;
                case '/':
                    sb.Append("\\/"); break;
                case '\b':
                    sb.Append("\\b"); break;
                case '\f':
                    sb.Append("\\f"); break;
                case '\n':
                    sb.Append("\\n"); break;
                case '\r':
                    sb.Append("\\r"); break;
                case '\t':
                    sb.Append("\\t"); break;
                default:
                    sb.Append(c); break;
            }
        }
        return sb.ToString();
    }
    #endregion

    #region 列转json
    /// <summary>
    /// 列转json
    /// </summary>
    /// <param name="dt">表</param>
    /// <param name="r">列</param>
    public static string ColumnToJson(DataTable dt, int r)
    {
        StringBuilder strSql = new StringBuilder();
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            strSql.Append(dt.Rows[i][r]);
            strSql.Append(",");
        }
        return strSql.ToString().Trim(',');
    }
    #endregion

    #region 对象转json
    /// <summary>
    /// 对象转json
    /// </summary>
    public static string ToJson(object jsonObject)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("{");
        PropertyInfo[] propertyInfo = jsonObject.GetType().GetProperties();
        for (int i = 0; i < propertyInfo.Length; i++)
        {
            object objectValue = propertyInfo[i].GetGetMethod().Invoke(jsonObject, null);
            Type type = propertyInfo[i].PropertyType;
            string strValue = objectValue.ToString();
            strValue = StringFormat(strValue, type);
            sb.Append("\"" + propertyInfo[i].Name + "\":");
            sb.Append(strValue + ",");
        }
        sb.Remove(sb.Length - 1, 1);
        sb.Append("}");
        return sb.ToString();
    }
    #endregion

    #region list转json
    /// <summary>
    /// list转json
    /// </summary>
    public static string ListToJson<T>(IList<T> list)
    {
        object obj = list[0];
        return ListToJson<T>(list, obj.GetType().Name);
    }

    private static string ListToJson<T>(IList<T> list, string JsonName)
    {
        StringBuilder Json = new StringBuilder();
        if (string.IsNullOrEmpty(JsonName))
            JsonName = list[0].GetType().Name;
        Json.Append("{\"" + JsonName + "\":[");
        if (list.Count > 0)
        {
            for (int i = 0; i < list.Count; i++)
            {
                T obj = Activator.CreateInstance<T>();
                PropertyInfo[] pi = obj.GetType().GetProperties();
                Json.Append("{");
                for (int j = 0; j < pi.Length; j++)
                {
                    Type type = pi[j].GetValue(list[i], null).GetType();
                    Json.Append("\"" + pi[j].Name.ToString() + "\":" + StringFormat(pi[j].GetValue(list[i], null).ToString(), type));
                    if (j < pi.Length - 1)
                    {
                        Json.Append(",");
                    }
                }
                Json.Append("}");
                if (i < list.Count - 1)
                {
                    Json.Append(",");
                }
            }
        }
        Json.Append("]}");
        return Json.ToString();
    }
    #endregion

    #region 对象集合转换为json
    /// <summary>
    /// 对象集合转换为json
    /// </summary>
    /// <param name="array">对象集合</param>
    /// <returns>json字符串</returns>
    public static string ToJson(IEnumerable array)
    {
        string jsonString = "[";
        foreach (object item in array)
        {
            jsonString += ToJson(item) + ",";
        }
        jsonString = jsonString.Substring(0, jsonString.Length - 1);
        return jsonString + "]";
    }
    #endregion

    #region 普通集合转换Json
    /// <summary>    
    /// 普通集合转换Json   
    /// </summary>   
    /// <param name="array">集合对象</param> 
    /// <returns>Json字符串</returns>  
    public static string ToArrayString(IEnumerable array)
    {
        string jsonString = "[";
        foreach (object item in array)
        {
            jsonString = ToJson(item.ToString()) + ",";
        }
        jsonString.Remove(jsonString.Length - 1, jsonString.Length);
        return jsonString + "]";
    }
    #endregion

    #region  DataSet转换为Json
    /// <summary>    
    /// DataSet转换为Json   
    /// </summary>    
    /// <param name="dataSet">DataSet对象</param>   
    /// <returns>Json字符串</returns>    
    public static string ToJson(DataSet dataSet)
    {
        string jsonString = "{";
        foreach (DataTable table in dataSet.Tables)
        {
            jsonString += "\"" + table.TableName + "\":" + ToJson(table) + ",";
        }
        jsonString = jsonString.TrimEnd(',');
        return jsonString + "}";
    }
    #endregion



    #region Datatable转换为Json
    /// <summary>     
    /// Datatable转换为Json     
    /// </summary>    
    public static string ToJson(DataTable dt)
    {
        if (dt.Rows.Count > 0)
        {
            StringBuilder jsonString = new StringBuilder();
            jsonString.Append("[");
            DataRowCollection drc = dt.Rows;
            for (int i = 0; i < drc.Count; i++)
            {
                jsonString.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    string strKey = dt.Columns[j].ColumnName;
                    string strValue = drc[i][j].ToString();

                    Type type = dt.Columns[j].DataType;
                    jsonString.Append("\"" + strKey + "\":");
                    strValue = StringFormat(strValue, type);
                    if (j < dt.Columns.Count - 1)
                        jsonString.Append(strValue + ",");
                    else
                        jsonString.Append(strValue);
                }
                jsonString.Append("},");
            }
            jsonString.Remove(jsonString.Length - 1, 1);
            jsonString.Append("]");
            return jsonString.ToString();
        }
        else
            return "[]";
    }

    /// <summary>    
    /// DataTable转换为Json
    /// </summary>    
    public static string ToJson(DataTable dt, string jsonName)
    {
        StringBuilder Json = new StringBuilder();
        if (string.IsNullOrEmpty(jsonName))
            jsonName = dt.TableName;
        Json.Append("{\"" + jsonName + "\":[");
        if (dt.Rows.Count > 0)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Json.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    Type type = dt.Rows[i][j].GetType();
                    Json.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + StringFormat(dt.Rows[i][j].ToString(), type));
                    if (j < dt.Columns.Count - 1)
                        Json.Append(",");
                }
                Json.Append("}");
                if (i < dt.Rows.Count - 1)
                    Json.Append(",");
            }
        }
        Json.Append("]}");
        return Json.ToString();
    }
    #endregion

    #region DataReader转换为Json
    /// <summary>     
    /// DataReader转换为Json     
    /// </summary>     
    /// <param name="dataReader">DataReader对象</param>     
    /// <returns>Json字符串</returns>  
    public static string ToJson(DbDataReader dataReader)
    {
        StringBuilder jsonString = new StringBuilder();
        jsonString.Append("[");
        while (dataReader.Read())
        {
            jsonString.Append("{");
            for (int i = 0; i < dataReader.FieldCount; i++)
            {
                Type type = dataReader.GetFieldType(i);
                string strKey = dataReader.GetName(i);
                string strValue = dataReader[i].ToString();
                jsonString.Append("\"" + strKey + "\":");
                strValue = StringFormat(strValue, type);
                if (i < dataReader.FieldCount - 1)
                    jsonString.Append(strValue + ",");
                else
                    jsonString.Append(strValue);
            }
            jsonString.Append("},");
        }
        dataReader.Close();
        jsonString.Remove(jsonString.Length - 1, 1);
        jsonString.Append("]");
        return jsonString.ToString();
    }
    #endregion


    #region 返回错误
    public static string error()
    {
        DataTable dt = new DataTable();
        dt.Columns.Add("error", typeof(int));
        DataRow dr = dt.NewRow();
        dr["error"] = 1;
        dt.Rows.Add(dr);
        return ToJson(dt);
    }
    #endregion

    public static string CreateJson(DataTable table)
    {
        string jsname = "total";
        StringBuilder json = new StringBuilder("{\"" + jsname + "\":[");
        if (table.Rows.Count > 0)
        {
            foreach (DataRow row in table.Rows)
            {
                json.Append("{");
                foreach (DataColumn column in table.Columns)
                {
                    json.Append("\"" + column.ColumnName + "\":\"" + row[column.ColumnName].ToString() + "\",");
                }
                json.Remove(json.Length - 1, 1);
                json.Append("},");
            }
            json.Remove(json.Length - 1, 1);
        }
        json.Append("]}");
        return json.ToString();
    }

    public static string CreateJsonParameters(DataTable dt, bool displayCount, int totalcount)
    {
        StringBuilder JsonString = new StringBuilder();
        //Exception Handling        
        if (dt != null)
        {
            JsonString.Append("{ ");
            if (displayCount)
            {
                JsonString.Append("\"total\":");
                JsonString.Append(totalcount);
                JsonString.Append(",");
            }
            JsonString.Append("\"rows\":[ ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        //if (dt.Rows[i][j] == DBNull.Value) continue;
                        if (dt.Columns[j].DataType == typeof(bool))
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" +
                                              dt.Rows[i][j].ToString().ToLower() + ",");
                        }
                        else if (dt.Columns[j].DataType == typeof(string))
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" +
                                              dt.Rows[i][j].ToString().Replace("\"", "\\\"") + "\",");
                        }
                        else
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" + dt.Rows[i][j] + "\",");
                        }
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        //if (dt.Rows[i][j] == DBNull.Value) continue;
                        if (dt.Columns[j].DataType == typeof(bool))
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" +
                                              dt.Rows[i][j].ToString().ToLower());
                        }
                        else if (dt.Columns[j].DataType == typeof(string))
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" +
                                              dt.Rows[i][j].ToString().Replace("\"", "\\\"") + "\"");
                        }
                        else
                        {
                            JsonString.Append("\"" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" + dt.Rows[i][j] + "\"");
                        }
                    }
                }
                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("}, ");
                }
            }
            JsonString.Append("]");
            JsonString.Append("}");
            return JsonString.ToString().Replace("\n", "");
        }
        else
        {
            return null;
        }
    }

    public static string CreateJsonParameters_JSON(DataTable dt, bool displayCount, int totalcount)
    {
        StringBuilder JsonString = new StringBuilder();
        //Exception Handling        
        if (dt != null)
        {
            JsonString.Append("{ ");
            if (displayCount)
            {
                JsonString.Append("\"total\":");
                JsonString.Append(totalcount);
                JsonString.Append(",");
            }
            JsonString.Append("\"rows\":[ ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                JsonString.Append("{ ");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    if (j < dt.Columns.Count - 1)
                    {
                        //if (dt.Rows[i][j] == DBNull.Value) continue;
                        if (dt.Columns[j].DataType == typeof(bool))
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" +
                                              dt.Rows[i][j].ToString().ToLower() + ",");
                        }
                        else if (dt.Columns[j].DataType == typeof(string))
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" +
                                              dt.Rows[i][j].ToString().Replace("\"", "\\\"") + "\",");
                        }
                        else
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" + dt.Rows[i][j] + "\",");
                        }
                    }
                    else if (j == dt.Columns.Count - 1)
                    {
                        //if (dt.Rows[i][j] == DBNull.Value) continue;
                        if (dt.Columns[j].DataType == typeof(bool))
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" +
                                              dt.Rows[i][j].ToString().ToLower());
                        }
                        else if (dt.Columns[j].DataType == typeof(string))
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" +
                                              dt.Rows[i][j].ToString().Replace("\"", "\\\"") + "\"");
                        }
                        else
                        {
                            JsonString.Append("\"JSON_" + dt.Columns[j].ColumnName.ToLower() + "\":" + "\"" + dt.Rows[i][j] + "\"");
                        }
                    }
                }
                /*end Of String*/
                if (i == dt.Rows.Count - 1)
                {
                    JsonString.Append("} ");
                }
                else
                {
                    JsonString.Append("}, ");
                }
            }
            JsonString.Append("]");
            JsonString.Append("}");
            return JsonString.ToString().Replace("\n", "");
        }
        else
        {
            return null;
        }
    }
    public static string DataTableToJson(DataTable table, string name)
    {
        StringBuilder Json = new StringBuilder("{\"" + name + "\":[");
        if (table.Rows.Count > 0)
        {
            foreach (DataRow row in table.Rows)
            {
                Json.Append("{");
                foreach (DataColumn cloumn in table.Columns)
                {
                    Json.Append("\"" + cloumn.ColumnName + "\":\"" + row[cloumn.ColumnName].ToString() + "\",");
                }
                Json.Remove(Json.Length - 1, 1);
                Json.Append("},");
            }
            Json.Remove(Json.Length - 1, 1);
        }
        Json.Append("]}");
        return Json.ToString();
    }

    public static string CreateJson0(DataTable table)
    {
        StringBuilder json = new StringBuilder("[");
        int id = 1;
        if (table.Rows.Count > 0)
        {
            foreach (DataRow row in table.Rows)
            {
                if(id==1)
                    json.Append("{\"selected\":true,\"id\":" + id.ToString() + ",\"text\":\"" + row[0].ToString() + "\"},");
                else
                    json.Append("{\"id\":" + id.ToString() + ",\"text\":\"" + row[0].ToString() + "\"},");
                
                id++;
            }
            json.Remove(json.Length - 1, 1);
        }
        json.Append("]");
        return json.ToString();
    }

    public static string CreateJson1(DataTable table)
    {
        StringBuilder json = new StringBuilder("[");
        int id = 1;
        if (table.Rows.Count > 0)
        {
            foreach (DataRow row in table.Rows)
            {
                if (id == 1)
                    json.Append("{\"selected\":true,\"value\":\"" + row[0].ToString() + "\",\"text\":\"" + row[1].ToString() + "\"},");
                else
                    json.Append("{\"value\":\"" + row[0].ToString() + "\",\"text\":\"" + row[1].ToString() + "\"},");

                id++;
            }
            json.Remove(json.Length - 1, 1);
        }
        json.Append("]");
        return json.ToString();
    }
    public static DataTable JsonToDataTable(string strJson)
    {
        //转换json格式
        strJson = strJson.Replace(",\"", "*\"").Replace("\":", "\"#").ToString();
        //取出表名   
        var rg = new Regex(@"(?<={)[^:]+(?=:\[)", RegexOptions.IgnoreCase);
        string strName = rg.Match(strJson).Value;
        DataTable tb = null;
        //去除表名   
        strJson = strJson.Substring(strJson.IndexOf("[") + 1);
        strJson = strJson.Substring(0, strJson.IndexOf("]"));

        //获取数据   
        rg = new Regex(@"(?<={)[^}]+(?=})");
        MatchCollection mc = rg.Matches(strJson);
        for (int i = 0; i < mc.Count; i++)
        {
            string strRow = mc[i].Value;
            string[] strRows = strRow.Split('*');

            //创建表   
            if (tb == null)
            {
                tb = new DataTable();
                tb.TableName = strName;
                foreach (string str in strRows)
                {
                    var dc = new DataColumn();
                    string[] strCell = str.Split('#');

                    if (strCell[0].Substring(0, 1) == "\"")
                    {
                        int a = strCell[0].Length;
                        dc.ColumnName = strCell[0].Substring(1, a - 2);
                    }
                    else
                    {
                        dc.ColumnName = strCell[0];
                    }
                    tb.Columns.Add(dc);
                }
                tb.AcceptChanges();
            }

            //增加内容   
            DataRow dr = tb.NewRow();
            for (int r = 0; r < strRows.Length; r++)
            {
                dr[r] = strRows[r].Split('#')[1].Trim().Replace("，", ",").Replace("：", ":").Replace("\"", "");
            }
            tb.Rows.Add(dr);
            tb.AcceptChanges();
        }

        return tb;
    }


   
}

