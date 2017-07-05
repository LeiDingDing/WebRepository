package cn.it.shop.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import cn.it.shop.dao.ProductDao;
import cn.it.shop.model.Product;

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
@Repository("productDao")
public class ProductDaoImpl extends BaseDaoImpl<Product> implements
		ProductDao {

	@Override
	public List<Product> queryJoinCategory(String name, int page, int rows) {
		// hql：操作对象是类, 是通过ORM映射文件转化为sql语句的
		String hql = "FROM Product p LEFT JOIN FETCH p.category WHERE p.name LIKE :name";
		Session session = getSession();
		return session.createQuery(hql) //
				.setString("name", "%" + name + "%") //
				.setFirstResult((page - 1) * rows)//
				.setMaxResults(rows) //
				.list();
	}

	@Override
	public Long count(String name) {
		String hql = "SELECT COUNT(p) FROM Product p WHERE p.name LIKE :name";
		Session session = getSession();
		return (Long) session.createQuery(hql) //
				.setString("name", "%" + name + "%") //
				.uniqueResult();
	}

	@Override
	public void deleteByIds(String ids) {
		System.out.println("-----自己实现------");
	}

	@Override
	public List<Product> queryByCid(int cid) {
		String hql = "FROM Product p LEFT JOIN FETCH p.category WHERE p.commend=true AND p.open=true AND p.category.id=:cid ORDER BY p.date DESC";
		return getSession().createQuery(hql)
				.setFirstResult(0)
				.setMaxResults(4)
				.setInteger("cid", cid)
				.list(); //
	}
}
