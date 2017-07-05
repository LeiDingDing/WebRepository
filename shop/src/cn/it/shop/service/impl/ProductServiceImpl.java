package cn.it.shop.service.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Service;

import cn.it.shop.model.Product;
import cn.it.shop.service.ProductService;

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
@Service("productService")
public class ProductServiceImpl extends BaseServiceImpl<Product> implements
		ProductService {

	@Override
	public List<Product> queryJoinCategory(String name, int page, int rows) {
		return productDao.queryJoinCategory(name, page, rows);
	}

	@Override
	public Long count(String name) {
		return productDao.count(name);
	}

	@Override
	public void deleteByIds(String ids) {
		productDao.deleteByIds(ids);
	}

	@Override
	public List<Product> queryByCid(int cid) {
		return productDao.queryByCid(cid);
	}
}
