using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Data;
using System.Text;
using Newtonsoft.Json.Converters;
using System.Data.SqlClient;

namespace lzq
{
    /// <summary>
    /// Users 的摘要说明
    /// </summary>
    public class Users : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            switch (action)
            {
                case "search":  //查出所有用户
                    Search(context);
                    break;
                case "insert":     
                    Insert(context);
                    break;
                case "update":     
                    Update(context);
                    break;
                case "remove":     
                    Remove(context);
                    break; 
                case "getdept":
                    GetDept(context);
                    break;
                case "xk1":
                    GetXk1(context);
                    break;
            }
        }
        public void Search(HttpContext context)
        {
            string page = context.Request.Params["page"];
            string rows = context.Request.Params["rows"];
            string sc="";
            int totalCount;
            string first = Convert.ToString(Convert.ToInt32(rows) * (Convert.ToInt32(page) - 1));
            DataTable dt = SqlHelper2.GetSearchePage(Convert.ToInt32(page), Convert.ToInt32(rows), "用户", sc, "*", "id desc", out totalCount);
            System.Collections.Hashtable ht = new System.Collections.Hashtable();
            ht.Add("total", totalCount);
            ht.Add("rows", dt);
            string str = Newtonsoft.Json.JsonConvert.SerializeObject(ht);
            context.Response.Write(str);
        }
        public void Insert(HttpContext context)
        {
            string 姓名 = context.Request.Form["row[姓名]"];
            //string 密码 = context.Request.Form["row[密码]"];
            string 密码 = "123456";//初始密码
            string 用户名 = context.Request.Form["row[用户名]"];
            string 身份 = context.Request.Form["row[身份]"];
            string 手机 = context.Request.Form["row[手机]"];
            string 部门 = context.Request.Form["row[部门]"];
            int i = SqlHelper2.ExecuteNonQuery(@"insert into 用户(姓名,密码,用户名,身份,手机,部门)
                                     values(@姓名,@密码,@用户名,@身份,@手机,@部门)",
                                  new SqlParameter("@姓名", 姓名),
                                  new SqlParameter("@密码", 密码),
                                  new SqlParameter("@用户名", 用户名),
                                  new SqlParameter("@身份", 身份),
                                  new SqlParameter("@手机", 手机),
                                  new SqlParameter("@部门", 部门));
            context.Response.Write(i);
        }
        public void Update(HttpContext context)
        {
            string 姓名 = context.Request.Form["row[姓名]"];
            //string 密码 = context.Request.Form["row[密码]"];
            string 密码 = "123456";
            string 用户名 = context.Request.Form["row[用户名]"];
            string 身份 = context.Request.Form["row[身份]"];
            string 手机 = context.Request.Form["row[手机]"];
            string 部门 = context.Request.Form["row[部门]"];
            string id = context.Request.Params["row[id]"];
            int i = SqlHelper2.ExecuteNonQuery(@"update 用户 set 姓名=@姓名,
                                                            密码=@密码,
                                                            用户名=@用户名,
                                                            身份=@身份, 
                                                            手机=@手机,部门=@部门 where id=@id",
                            new SqlParameter("@姓名", 姓名)
                          , new SqlParameter("@密码", 密码)
                          , new SqlParameter("@用户名", 用户名)
                          , new SqlParameter("@身份", 身份)
                          , new SqlParameter("@手机", 手机)
                          , new SqlParameter("@部门", 部门)
                          , new SqlParameter("@id", id));
            context.Response.Write(i);
        }
        public void Remove(HttpContext context)
        {
            string ids = context.Request.Params["ids"];
            string sql = "delete from 用户 where id in(" + ids + ")";//字符串拼接
            int i = SqlHelper2.ExecuteNonQuery(sql);
            context.Response.Write(i);
        }
        public void GetDept(HttpContext context)
        {
            string name = context.Request.Params["name"];
            String sql = "select 学院码,学院名 from 人员 where 姓名='" + name + "'";
            DataTable dt = SqlHelper2.GetTable(sql);
            context.Response.Write(JsonHelper.ToJson(dt));
        }
        public void GetXk1(HttpContext context)
        {
            String sql = "select * from xk1";
            DataTable dt = SqlHelper2.GetTable(sql);
            context.Response.Write(JsonHelper.ToJson(dt));
        }
        
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}