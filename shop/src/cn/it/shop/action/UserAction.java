package cn.it.shop.action;

import cn.it.shop.model.User;
/*
 * MethodFilterInterceptor--->AbstractInterceptor--->Interceptor
 * MethodFilterInterceptor: 支持方法过滤的功能  intercept用来进行方法过滤的
 * doIntercept 才是用来执行具体的页面逻辑
 *   
 * 
 * */
public class UserAction extends BaseAction<User> {
	
	public UserAction(){
		System.out.println("----UserAction()----");
	}

	public String login(){
		model=userService.login(model);
		if(model==null){
			// 登陆失败,重新跳转到登陆页面
			session.put("error", "登陆失败!");
			return "ulogin";
		}else{
			// 登陆成功,跳转到首页
			session.put("user", model);
			// 根据需求是否被过滤器拦截器选择跳转到不同页面
			if(session.get("goURL")==null){
				return "index";
			}else{
				return "goURL";
			}
		}
	}
	
	public String demo(){
		try{
			Integer.parseInt("xyz");
		}catch(Exception e){
			throw new RuntimeException("类型出错了!");
		}
		return "index";
	}
}
