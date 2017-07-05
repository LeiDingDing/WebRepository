<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<% response.setHeader("cache-control", "no-store"); %>
  </head>
  <body>
  	  此页面设置了不缓存
  	 <form action="c.jsp" method="get">
  	 	<input type="text" name="xyz" />
  	    <input value="c.jsp" type="submit" /> 
  	 </form>
  </body>
</html>
