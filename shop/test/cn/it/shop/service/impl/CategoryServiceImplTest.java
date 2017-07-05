package cn.it.shop.service.impl;

import javax.annotation.Resource;

import net.sf.json.JSONSerializer;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.it.shop.model.Category;
import cn.it.shop.service.CategoryService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-*.xml")
public class CategoryServiceImplTest {
	// 1:在Spring中如果有接口的类型,注入都统一用接口接收(面向接口编程)
	// 2:如果符合表达式的业务逻辑类,则返回的是proxy代理.否则返回的是cglib代理
	@Resource
	private CategoryService categoryService;

	@Test
	public void testSave() {
		categoryService.save(new Category(null,"abc",true));
	
	}

	@Test
	public void testUpdate() {
		categoryService.update(new Category(5,"aaa",false));
	}

	@Test
	public void testDelete() {
		categoryService.delete(5);
	}

	@Test
	public void testQuery() {
		for(Category temp:categoryService.query()){
			System.out.println(temp);
			temp.setAccount(null);
			System.out.println(JSONSerializer.toJSON(temp));
		}
	}

	@Test
	public void testGet() {
		System.out.println(categoryService.get(5));
		// 如果配置二级缓存 session 所有操作(除了save) 默认支持的
		System.out.println(categoryService.get(5));
	}
	
	@Test
	public void testQueryJoinAccount() {
		for(Category temp:categoryService.queryJoinAccount("",3,5)){
			System.out.println(temp);
//			System.out.println(temp.getAccount());
		}
	}
	
	@Test
	public void testCount() {
		System.out.println(categoryService.count(""));
	}
	@Test
	public void testQueryByHot() {
		for(Category temp:categoryService.queryByHot(true)){
			System.out.println(temp);
		}
	}

}
