package cn.it.shop.service.impl;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.it.shop.model.Privilege;
import cn.it.shop.model.Role;
import cn.it.shop.service.RoleService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:applicationContext-*.xml")
public class RoleServiceImplTest {

	@Resource
	private RoleService roleService;

	@Test
	public void testUpdate() {
		Role role = roleService.get(2);
		roleService.update(role);
	}
	@Test
	public void testDelete() {
		roleService.deleteByIds("1,2");
	}

}
