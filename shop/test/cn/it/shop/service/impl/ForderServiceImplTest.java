package cn.it.shop.service.impl;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Product;
import cn.it.shop.model.Status;
import cn.it.shop.service.ForderService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-*.xml")
public class ForderServiceImplTest {
	// 1:在Spring中如果有接口的类型,注入都统一用接口接收(面向接口编程)
	// 2:如果符合表达式的业务逻辑类,则返回的是proxy代理.否则返回的是cglib代理
	@Resource
	private ForderService forderService;

	@Test
	public void testStatus() {
		forderService.updateStatus(201407013,2);
//		Forder forder = new Forder();
//		forder.setId(201407013);
//		forder.setStatus(new Status(3));
//		forderService.update(forder);
	}

}
