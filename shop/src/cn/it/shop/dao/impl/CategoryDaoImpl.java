package cn.it.shop.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import cn.it.shop.dao.CategoryDao;
import cn.it.shop.model.Category;

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
@Repository("categoryDao")
public class CategoryDaoImpl extends BaseDaoImpl<Category> implements
		CategoryDao {

	@Override
	public List<Category> queryJoinAccount(String type, int page, int rows) {
		// hql：操作对象是类, 是通过ORM映射文件转化为sql语句的
		String hql = "FROM Category c LEFT JOIN FETCH c.account WHERE c.type LIKE :type";
		Session session = getSession();
		List<Category> categoryList = session.createQuery(hql) //
				.setString("type", "%" + type + "%") //
				.setFirstResult((page - 1) * rows)//
				.setMaxResults(rows) //
				.list();
		return categoryList;
	}

	@Override
	public Long count(String type) {
		String hql = "SELECT COUNT(c) FROM Category c WHERE c.type LIKE :type";
		Session session = getSession();
		return (Long) session.createQuery(hql) //
				.setString("type", "%" + type + "%") //
				.uniqueResult();
	}

	@Override
	public void deleteByIds(String ids) {
		String hql = "delete from Category WHERE id in (" + ids + ")";
		Session session = getSession();
		session.createQuery(hql) //
				// .setString("ids", ids) //
				.executeUpdate();
	}

	@Override
	public List<Category> queryByHot(boolean hot) {
		String hql = "FROM Category c WHERE c.hot=:hot";
		return getSession().createQuery(hql) //
				.setBoolean("hot", hot) //
				.list();
	}
}
