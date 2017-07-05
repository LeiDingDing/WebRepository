package cn.it.shop.service.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import cn.it.shop.model.Category;
import cn.it.shop.service.CategoryService;

/**
 * 
 * @Title: CategoryServiceImpl.java
 * @Package cn.it.shop.service.impl
 * @Description: TODO(实现当前模块的自身业务逻辑)
 * @author 广州传智播客
 * @date 2014-7-8 上午11:43:40
 * @version V1.0
 */
@SuppressWarnings("unchecked")
@Service("categoryService")
public class CategoryServiceImpl extends BaseServiceImpl<Category> implements
		CategoryService {

	@Override
	public List<Category> queryJoinAccount(String type, int page, int rows) {
		return categoryDao.queryJoinAccount(type, page, rows);
	}

	@Override
	public Long count(String type) {
		return categoryDao.count(type);
	}

	@Override
	public void deleteByIds(String ids) {
		categoryDao.deleteByIds(ids);
	}

	@Override
	public List<Category> queryByHot(boolean hot) {
		return categoryDao.queryByHot(hot);
	}
}
