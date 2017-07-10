using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace lzq
{
    public class GetXueke
    {
        public static string GetThreeGrade(string id1="",string id2="") {
            String json = "";
            if(id1==""&&id2==""){
                String sql = "select * from xk1";
                DataTable dt = SqlHelper2.GetTable(sql);
                json=JsonHelper.ToJson(dt);
            }else if(id1!=""&&id2==""){
                String sql = "select id,substring(content,1,15) as content from xk2 where id1='"+id1+"'";
                DataTable dt = SqlHelper2.GetTable(sql);
                json = JsonHelper.ToJson(dt);
            }else if(id1==""&&id2!=""){
                String sql = "select id,content from xk3 where id2='" + id2 + "'";
                DataTable dt = SqlHelper2.GetTable(sql);
                json = JsonHelper.ToJson(dt);
            }
            return json;
        }
    }
}