using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Data;
using System.Text;
using Newtonsoft.Json.Converters;
using System.Data.SqlClient;
using System.IO;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Windows.Forms;

namespace lzq
{
    /// <summary>
    /// Users 的摘要说明
    /// </summary>
    public class Award : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["action"];
            switch (action)
            {

                case "upload":
                    Upload(context);
                    break;
                
                case "query":
                    Query(context);
                    break;
                
                case "datagrid":
                    GetDataGrid(context);
                    break;
                
                case "login":
                    isLogin(context);
                    break;
                case "save":
                    Save(context);
                    break;
                case "saveAward":
                    SaveAward(context);
                    break;
                case "saveGrade":
                    SaveGrade(context);
                    break;
                case "saveSelf":
                    SaveSelf(context);
                    break;
                case "delete":
                    Delete(context);
                    break;
                case　"getStudent":
                    GetStu(context);
                    break;
                case "export":
                    Export(context);
                    break;
                case "searchstu":
                    SearchStuDataGrid(context);
                    break;
                case "searchawd":
                    SearchAwdDataGrid(context);
                    break;
                case "searchgrd":
                    SearchGrdDataGrid(context);
                    break;
                default: break;
            }


        }

        public void Export(HttpContext context)
        {
            HttpResponse response = context.Response;
            string datastr = context.Request.Params["datagrid"];
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //List<Student> datagrid = js.Deserialize<List<Student>>(datastr);
            DataTable datagrid = JsonHelper.JsonToDataTable(datastr);
            ExportClass.OutPutWordDT("学生信息", datagrid, true);
            
        }
        public void GetStu(HttpContext context)
        {
            string sql = "select id,姓名 from student";
            DataTable dt = SqlHelper2.GetTable(sql);
            context.Response.Write(JsonHelper.ToJson(dt));
        }
        public void Delete(HttpContext context)
        {
            int id =Convert.ToInt32(context.Request.Params["id"]);
            string table = context.Request.Params["table"];
            string sql = "delete from "+table+ " where id="+id;
            int i = SqlHelper2.ExecuteNonQuery(sql);
            context.Response.Write(i);
        }
        public void SaveSelf(HttpContext context)
        {
            int id =Convert.ToInt32(context.Request.Form["row[0][学号]"]);
            string name = context.Request.Form["row[0][姓名]"];
            string _pass = context.Request.Form["row[0][密码]"];
            string pass = PrintData.GetMD5(_pass);
            string tel = context.Request.Form["row[0][电话]"];
            string email = context.Request.Form["row[0][邮箱]"];
            string address = context.Request.Form["row[0][住址]"];
            string pic = context.Request.Form["row[0][图片]"];
            string video = context.Request.Form["row[0][视频]"];
            int i = SqlHelper2.ExecuteNonQuery(@"update student
                                                        set 姓名=@name,
                                                            密码=@pass,
                                                            电话=@tel,
                                                            邮箱=@email,
                                                            住址=@address,
                                                            picture=@pic,
                                                            video=@video
                                                            where id=@id",
                                  new SqlParameter("@name", name),
                                  new SqlParameter("@pass", pass),
                                  new SqlParameter("@tel", tel),
                                  new SqlParameter("@email", email),
                                  new SqlParameter("@address", address),
                                  new SqlParameter("@pic", pic),
                                  new SqlParameter("@video", video),
                                  new SqlParameter("@id", id));
            context.Response.Write(i);
        }
        public void SaveGrade(HttpContext context)
        {
            string id = context.Request.Form["row[0][id]"];
            string chinese = context.Request.Form["row[0][语文]"];
            string math = context.Request.Form["row[0][数学]"];
            string english = context.Request.Form["row[0][英语]"];
            string computer = context.Request.Form["row[0][计算机]"];
            int sid = Convert.ToInt32(context.Request.Form["row[0][学生]"]);
            if (id == "")
            {
                int i = SqlHelper2.ExecuteNonQuery(@"insert into 成绩(语文,数学,英语,计算机,sid)
                                     values(@chinese,@math,@english,@computer,@sid)",
                                  new SqlParameter("@chinese", chinese),
                                  new SqlParameter("@math", math),
                                  new SqlParameter("@english", english),
                                  new SqlParameter("@computer", computer),
                                  new SqlParameter("@sid", sid));
                context.Response.Write(i);
            }
            else
            {
                int _id = Convert.ToInt32(id);
                int i = SqlHelper2.ExecuteNonQuery(@"update 成绩
                                                        set 语文=@chinese,
                                                            数学=@math,
                                                            英语=@english,
                                                            计算机=@computer,
                                                            sid=@sid
                                                             where id=@id",
                                  new SqlParameter("@chinese", chinese),
                                  new SqlParameter("@math", math),
                                  new SqlParameter("@english", english),
                                  new SqlParameter("@computer", computer),
                                  new SqlParameter("@sid", sid),
                                  new SqlParameter("@id", _id));
                context.Response.Write(i);
            }
        }
        public void SaveAward(HttpContext context)
        {
            string id = context.Request.Form["row[0][id]"];
            string award = context.Request.Form["row[0][获奖名称]"];
            string ayear = context.Request.Form["row[0][获奖时间]"];
            string awardrank = context.Request.Form["row[0][奖项级别]"];
            int sid =Convert.ToInt32(context.Request.Form["row[0][学生]"]);
            if (id == "")
            {
                int i = SqlHelper2.ExecuteNonQuery(@"insert into 获奖(获奖名称,获奖时间,奖项级别,sid)
                                     values(@award,@ayear,@awardrank,@sid)",
                                  new SqlParameter("@award", award),
                                  new SqlParameter("@ayear", ayear),
                                  new SqlParameter("@awardrank", awardrank),
                                  new SqlParameter("@sid", sid));
                context.Response.Write(i);
            }
            else
            {
                int _id = Convert.ToInt32(id);
                int i = SqlHelper2.ExecuteNonQuery(@"update 获奖
                                                        set 获奖名称=@award,
                                                            获奖时间=@ayear,
                                                            奖项级别=@awardrank,
                                                            sid=@sid
                                                             where id=@id",
                                  new SqlParameter("@award", award),
                                  new SqlParameter("@ayear", ayear),
                                  new SqlParameter("@awardrank", awardrank),
                                  new SqlParameter("@sid", sid),
                                  new SqlParameter("@id", _id));
                context.Response.Write(i);
            }
        }
        public void Save(HttpContext context){
            string id = context.Request.Form["row[0][id]"];
            string name = context.Request.Form["row[0][姓名]"];
            string _pass = context.Request.Form["row[0][密码]"];
            string pass = PrintData.GetMD5(_pass);
            string role = context.Request.Form["row[0][角色]"];
            string tel = context.Request.Form["row[0][电话]"];
            string email = context.Request.Form["row[0][邮箱]"];
            string address = context.Request.Form["row[0][住址]"];
            if (id == "")
            {
                int i = SqlHelper2.ExecuteNonQuery(@"insert into student(姓名,密码,roleid,电话,邮箱,住址)
                                     values(@name,@pass,@role,@tel,@email,@address)",
                                  new SqlParameter("@name", name),
                                  new SqlParameter("@pass", pass),
                                  new SqlParameter("@role", role),
                                  new SqlParameter("@tel", tel),
                                  new SqlParameter("@email", email),
                                  new SqlParameter("@address", address));
                context.Response.Write(i);
            }
            else {
                int sid = Convert.ToInt32(id);
                int i = SqlHelper2.ExecuteNonQuery(@"update student
                                                        set 姓名=@name,
                                                            密码=@pass,
                                                            roleid=@role,
                                                            电话=@tel,
                                                            邮箱=@email,
                                                            住址=@address where id=@id",
                                  new SqlParameter("@name", name),
                                  new SqlParameter("@pass", pass),
                                  new SqlParameter("@role", role),
                                  new SqlParameter("@tel", tel),
                                  new SqlParameter("@email", email),
                                  new SqlParameter("@address", address),
                                  new SqlParameter("@id", sid));
                context.Response.Write(i);
            }
            
        }
        public void isLogin(HttpContext context)
        {
            string role = context.Request.Params["role"];
            int username = Convert.ToInt32(context.Request.Params["username"]);
            string _password = context.Request.Params["password"];
            string password=PrintData.GetMD5(_password);
            //context.Response.Write(password);
            if (!DBManage.ValidateUsername(role, username))
            {
                context.Response.Write("用户名不存在!");
            }
            else if (DBManage.ValidateUserpass(role, username, password)=="")
            {
                context.Response.Write("密码不正确!");
            }
            else {
                string ret = DBManage.ValidateUserpass(role, username, password);
                context.Response.Write("登录成功,"+ret);

            }
        }
        public void SearchGrdDataGrid(HttpContext context)
        {
            int page = Convert.ToInt32(context.Request.Params["page"]);
            int rows = Convert.ToInt32(context.Request.Params["rows"]);
            string id = context.Request.Form["row[0][id]"];
            string chinese = context.Request.Form["row[0][语文]"];
            string math = context.Request.Form["row[0][数学]"];
            string english = context.Request.Form["row[0][英语]"];
            string computer = context.Request.Form["row[0][计算机]"];
            string sid = context.Request.Form["row[0][学生]"];
            string sc = "";
            if (id != "" && sid != "")
            {
                int _id = Convert.ToInt32(id);
                int _sid = Convert.ToInt32(sid);
                sc += "id like '%" + _id + "%'";
                sc += " and 语文 like '%" + chinese + "%'";
                sc += " and 数学 like '%" + math + "%'";
                sc += " and 英语 like '%" + english + "%'";
                sc += " and 计算机 like '%" + computer + "%'";
                sc += " and sid like '%" + _sid + "%'";

            }
            else if (id != "" && sid == "")
            {
                int _id = Convert.ToInt32(id);
                sc += "id like '%" + _id + "%'";
                sc += " and 语文 like '%" + chinese + "%'";
                sc += " and 数学 like '%" + math + "%'";
                sc += " and 英语 like '%" + english + "%'";
                sc += " and 计算机 like '%" + computer + "%'";

            }
            else if (id == "" && sid != "")
            {
                int _sid = Convert.ToInt32(sid);
                sc += "语文 like '%" + chinese + "%'";
                sc += " and 数学 like '%" + math + "%'";
                sc += " and 英语 like '%" + english + "%'";
                sc += " and 计算机 like '%" + computer + "%'";
                sc += " and sid like '%" + _sid + "%'";
            }
            else if (id == "" && sid == "")
            {
                sc += "语文 like '%" + chinese + "%'";
                sc += " and 数学 like '%" + math + "%'";
                sc += " and 英语 like '%" + english + "%'";
                sc += " and 计算机 like '%" + computer + "%'";

            }
            int totalCount;
            string first = Convert.ToString(Convert.ToInt32(rows) * (Convert.ToInt32(page) - 1));
            DataTable dt = SqlHelper2.GetSearchePage(Convert.ToInt32(page), Convert.ToInt32(rows), "成绩", sc, "*", "id asc", out totalCount);
            System.Collections.Hashtable ht = new System.Collections.Hashtable();
            ht.Add("total", totalCount);
            ht.Add("rows", dt);
            string str = Newtonsoft.Json.JsonConvert.SerializeObject(ht);
            context.Response.Write(str);
        }
        public void SearchAwdDataGrid(HttpContext context)
        {
            int page = Convert.ToInt32(context.Request.Params["page"]);
            int rows = Convert.ToInt32(context.Request.Params["rows"]);
            string id = context.Request.Form["row[0][id]"];
            string award = context.Request.Form["row[0][获奖名称]"];
            string ayear = context.Request.Form["row[0][获奖时间]"];
            string awardrank = context.Request.Form["row[0][奖项级别]"];
            string sid = context.Request.Form["row[0][学生]"];
            string sc = "";
            if (id != ""&&sid!="")
            {
                int _id = Convert.ToInt32(id);
                int _sid = Convert.ToInt32(sid);
                sc += "id like '%" + _id + "%'";
                sc += " and 获奖名称 like '%" + award + "%'";
                sc += " and 获奖时间 like '%" + ayear + "%'";
                sc += " and 奖项级别 like '%" + awardrank + "%'";
                sc += " and sid like '%" + _sid + "%'";
                
            }
            else if(id!=""&&sid=="")
            {
                int _id = Convert.ToInt32(id);
                sc += "id like '%" + _id + "%'";
                sc += " and 获奖名称 like '%" + award + "%'";
                sc += " and 获奖时间 like '%" + ayear + "%'";
                sc += " and 奖项级别 like '%" + awardrank + "%'";

            }
            else if (id == "" && sid != "")
            {
                int _sid = Convert.ToInt32(sid);
                sc += "获奖名称 like '%" + award + "%'";
                sc += " and 获奖时间 like '%" + ayear + "%'";
                sc += " and 奖项级别 like '%" + awardrank + "%'";
                sc += " and sid like '%" + _sid + "%'";
            }
            else if (id == "" && sid == "")
            {
                sc += "获奖名称 like '%" + award + "%'";
                sc += " and 获奖时间 like '%" + ayear + "%'";
                sc += " and 奖项级别 like '%" + awardrank + "%'";
               
            }
            int totalCount;
            string first = Convert.ToString(Convert.ToInt32(rows) * (Convert.ToInt32(page) - 1));
            DataTable dt = SqlHelper2.GetSearchePage(Convert.ToInt32(page), Convert.ToInt32(rows), "获奖", sc, "*", "id asc", out totalCount);
            System.Collections.Hashtable ht = new System.Collections.Hashtable();
            ht.Add("total", totalCount);
            ht.Add("rows", dt);
            string str = Newtonsoft.Json.JsonConvert.SerializeObject(ht);
            context.Response.Write(str);
        }
        public void SearchStuDataGrid(HttpContext context)
        {
            int page = Convert.ToInt32(context.Request.Params["page"]);
            int rows = Convert.ToInt32(context.Request.Params["rows"]);
            string id =context.Request.Form["row[0][id]"];
            string name = context.Request.Form["row[0][姓名]"];
            string role = context.Request.Form["row[0][角色]"];
            string tel = context.Request.Form["row[0][电话]"];
            string email = context.Request.Form["row[0][邮箱]"];
            string address = context.Request.Form["row[0][住址]"];

            string sc = "";
            if (id != "")
            {
                int _id = Convert.ToInt32(id);
                sc += "id like '%"+_id+"%'";
                sc += " and 姓名 like '%" + name + "%'";
                sc += " and roleid like '%" + role + "%'";
                sc += " and 电话 like '%" + tel + "%'";
                sc += " and 邮箱 like '%" + email + "%'";
                sc += " and 住址 like '%" + address + "%'";
            }
            else
            {
                sc += "姓名 like '%" + name + "%'";
                sc += " and roleid like '%" + role + "%'";
                sc += " and 电话 like '%" + tel + "%'";
                sc += " and 邮箱 like '%" + email + "%'";
                sc += " and 住址 like '%" + address + "%'";
            }
            int totalCount;
            string first = Convert.ToString(Convert.ToInt32(rows) * (Convert.ToInt32(page) - 1));
            DataTable dt = SqlHelper2.GetSearchePage(Convert.ToInt32(page), Convert.ToInt32(rows), "student", sc, "*", "id asc", out totalCount);
            System.Collections.Hashtable ht = new System.Collections.Hashtable();
            ht.Add("total", totalCount);
            ht.Add("rows", dt);
            string str = Newtonsoft.Json.JsonConvert.SerializeObject(ht);
            context.Response.Write(str);
        }
        public void GetDataGrid(HttpContext context)
        {
            int page = Convert.ToInt32(context.Request.Params["page"]);
            int rows = Convert.ToInt32(context.Request.Params["rows"]);
            string table = context.Request.Params["table"];
            /*int num = page * rows;
            int sub = (page-1) * rows;
            string sql = "select top "+num+" * from 报奖 where ID not in(select top "+sub+" ID from 报奖)";
            DataTable dt = SqlHelper2.GetTable(sql);
            string sql2 = "select count(*) as 记录数 from 报奖";
            DataTable dt2 = SqlHelper2.GetTable(sql2);
            int total=Convert.ToInt32(dt2.Rows[0]["记录数"]);
            context.Response.Write(JsonHelper.CreateJsonParameters2(dt, true, total));*/

            string sc = "";

            int totalCount;
            string first = Convert.ToString(Convert.ToInt32(rows) * (Convert.ToInt32(page) - 1));
            DataTable dt = SqlHelper2.GetSearchePage(Convert.ToInt32(page), Convert.ToInt32(rows), table, sc, "*", "id asc", out totalCount);
            System.Collections.Hashtable ht = new System.Collections.Hashtable();
            ht.Add("total", totalCount);
            ht.Add("rows", dt);
            string str = Newtonsoft.Json.JsonConvert.SerializeObject(ht);
            context.Response.Write(str);
            // context.Response.Write(JsonHelper.ToJson(dt));
        }
        
        
        

        
        public void Query(HttpContext context)
        {
            int id = Convert.ToInt32(context.Request.Params["id"]);
            string json = DBManage.Query(id);
            context.Response.Write(json);
        }
        public void Upload(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            HttpServerUtility server = context.Server;
            HttpRequest request = context.Request;
            HttpResponse response = context.Response;
            string id =context.Request.Params["id"];
            HttpPostedFile file = context.Request.Files[0];
            
            
            
            if (file.ContentLength > 0)
            {

                string extName = Path.GetExtension(file.FileName);
                //string fileName = Guid.NewGuid().ToString();
                string fileName = id;
                string fullName = fileName + extName;

                string imageFilter = ".jpg|.png|.gif|.ico";// 随便模拟几个图片类型
                string videoFilter = ".mp4|.avi|.rmvb|.flv|.mkv";// 随便模拟几个图片类型
                if (imageFilter.Contains(extName.ToLower()))
                {
                    string uploadpath = "~/lzq/Upload/Image/base/";
                    string phyFilePath = server.MapPath(uploadpath) + fullName;
                    file.SaveAs(phyFilePath);
                    string json = "{\"filename\":\"" + fullName + "\"}";
                    response.Write(json);
                    // response.Write(string.Format("<img src='lzq/Upload/Image/{0}'/>",fullName));
                }
                else if (videoFilter.Contains(extName.ToLower()))
                {
                    string uploadpath = "~/lzq/Upload/videos/";
                    string phyFilePath = server.MapPath(uploadpath) + fullName;
                    file.SaveAs(phyFilePath);
                    string json = "{\"filename\":\""+fullName+"\"}";
                    response.Write(json);
                }
            }
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