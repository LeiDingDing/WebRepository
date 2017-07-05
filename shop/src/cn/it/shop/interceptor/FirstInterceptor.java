package cn.it.shop.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

public class FirstInterceptor implements Interceptor {

	@Override
	public void destroy() {
		System.out.println("-----First destroy()-----");
	}

	@Override
	public void init() {
		// TODO Auto-generated method stub
		System.out.println("-----First init()-----");
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		System.out.println("-----First in()-----");
		String result=invocation.invoke();
		System.out.println("-----First out()-----");
		return result;
	}

}
