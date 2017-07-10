using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace lzq
{
    public class GetPeopleInfo
    {
        public static string GetSalaryNo(string name) {
            String json = "";
            string sql = "select 工资号,学院名+' '+职称 as 身份 from 人员 where 姓名='" + name + "'";
            DataTable dt = SqlHelper2.GetTable(sql);
            json = JsonHelper.ToJson(dt);
            return json;
        }
        public static Boolean IsYZU(string name) {
            bool flag = true;
            string sql = "select 工资号 from 人员 where 姓名='" + name + "'";
            DataTable dt = SqlHelper2.GetTable(sql);
            if (dt.Rows.Count==0)
            {
                flag = false;
            }
            return flag;
        }
        public static string GetDeptNo(int gongzi)
        {
            String json = "";
            string sql = "select 学院码,学院名 from 人员 where 工资号=" + gongzi;
            DataTable dt = SqlHelper2.GetTable(sql);
            json = JsonHelper.ToJson(dt);
            return json;
            
        }
        
        public static string GetPeoInfo(string name="",string salaryid="",string deptid="")
        {
            String json = "";
            string sql = "";
            if (salaryid == "" && deptid=="")
            {
                sql = "select 工资号,部门码,部门名,学院名 from 人员 where 姓名='" + name + "'";
            }
            else if (salaryid == "" && deptid != "")
            {
                sql = "select 工资号,部门码,部门名,学院名 from 人员 where 姓名='" + name + "' and 部门码='"+deptid+"'";
            }
            else if (salaryid != "")
            {
                int salaryint = Convert.ToInt32(salaryid);
                sql = "select 工资号,部门码,部门名,学院名 from 人员 where 工资号='" + salaryint + "'";
            }
            DataTable dt = SqlHelper2.GetTable(sql);
            json = JsonHelper.ToJson(dt);
            return json;

        }
    }
}