package cn.it.shop.listener;

import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import cn.it.shop.service.FileUploadUtil;
import cn.it.shop.util.ProductTimerTask;

/**
 * 
 * @Title: InitDataServletContextListener.java
 * @Package cn.it.shop.listener
 * @Description: TODO(启动的时候用来加载数据的初始化监听器)
 * @author 广州传智播客
 * @date 2014-7-12 下午3:28:16
 * @version V1.0
 */
public class InitDataServletContextListener implements ServletContextListener {
	
	private ApplicationContext context;
	
	private FileUploadUtil fileUploadUtil;
	
	private ProductTimerTask productTimerTask;

	@Override
	public void contextDestroyed(ServletContextEvent event) {

	}

	@Override  // jsp ----> html (静态化)
	public void contextInitialized(ServletContextEvent event) {
		context=WebApplicationContextUtils.getRequiredWebApplicationContext(event.getServletContext());
		fileUploadUtil=(FileUploadUtil)context.getBean("fileUploadUtil");
		// 自定义线程实现类,用来加载首页的数据
		productTimerTask =(ProductTimerTask) context.getBean("productTimerTask");
		productTimerTask.setApplication(event.getServletContext());
		// 通过定时器,完成首页数据的同步更新
		new Timer(true).schedule(productTimerTask, 0,1000*60*60);
		// 加载银行logo, 存储到application中,在支付页面使用
		String[] bankName = fileUploadUtil.getFileNameByPath(event.getServletContext().getRealPath("/images/bank/"));
//		System.out.println(bankName.length);
		event.getServletContext().setAttribute("bankName", bankName);
	}

}
