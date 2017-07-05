package cn.it.shop.service.impl;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.it.shop.model.Privilege;
import cn.it.shop.model.Product;
import cn.it.shop.service.PrivilegeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-*.xml")
public class PrivilegeServiceImplTest {
	// 1:在Spring中如果有接口的类型,注入都统一用接口接收(面向接口编程)
	// 2:如果符合表达式的业务逻辑类,则返回的是proxy代理.否则返回的是cglib代理
	@Resource
	private PrivilegeService privilegeService;

	@Test
	public void testQueryForTree() {
		for(Privilege temp:privilegeService.queryForTree()){
			System.out.println(temp);
			System.out.println("-->" + temp.getChildren());
		}
	}

}
