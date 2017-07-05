package cn.it.shop.util;

import java.util.ArrayList;
import java.util.List;
import java.util.TimerTask;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.springframework.stereotype.Component;

import cn.it.shop.model.Category;
import cn.it.shop.model.Product;
import cn.it.shop.service.CategoryService;
import cn.it.shop.service.ProductService;

/**
 * 
 * @Title: ProductTimerTask.java
 * @Package cn.it.shop.util
 * @Description: TODO(完成首页商品数据的初始化操作)
 * @author 广州传智播客
 * @date 2014-7-13 上午9:26:50
 * @version V1.0
 */
@Component("productTimerTask")
public class ProductTimerTask extends TimerTask {

	@Resource
	private CategoryService categoryService;
	@Resource
	private ProductService productService;
	
	private ServletContext application;
	
    public void setApplication(ServletContext application) {
		this.application = application;
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println("----------run()-----------");

		List<List<Product>> bigList = new ArrayList<List<Product>>();
		// 2: 查询热点类别
		for (Category temp : categoryService.queryByHot(true)) {
			// 3: 通过热点类别查询推荐商品
			bigList.add(productService.queryByCid(temp.getId()));
		}
		// 4： 存储到application内置对象中
		application.setAttribute("bigList", bigList);
	}

	// public static void main(String[] args) {
	// ProductTimerTask task = new ProductTimerTask();
	// // 如果为true则以守护线程的方式执行
	// new Timer(false).schedule(task, 0, 1000);
	// }

}
