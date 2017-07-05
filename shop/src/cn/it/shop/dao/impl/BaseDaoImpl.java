package cn.it.shop.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import cn.it.shop.dao.BaseDao;
/*
 *  完成了公共业务逻辑的实现, 具体的子业务逻辑类继承即可
 * */
@SuppressWarnings("unchecked")
@Repository("baseDao")
@Lazy(true)
public class BaseDaoImpl<T> implements BaseDao<T> {
	
	private Class clazz; // clazz中存储了子类当前操作实体类型

	@Resource(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	public BaseDaoImpl(){
		// 如果子类调用当前构造方法,this代表的是子类对象
		System.out.println(this);
		System.out.println("获取父类信息:" + this.getClass().getSuperclass());
		System.out.println("获取父类信息包括泛型信息:" + this.getClass().getGenericSuperclass());
		ParameterizedType type=(ParameterizedType)this.getClass().getGenericSuperclass();
		clazz=(Class)type.getActualTypeArguments()[0];
		System.out.println("clazz:" + clazz);
	}
	
	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	@Override
	public void save(T t) {
		getSession().save(t);
	}

	@Override
	public void update(T t) {
		getSession().update(t);
	}

	@Override
	public void delete(int id) {
//		// TODO Auto-generated method stub
		String hql = "DELETE FROM " + clazz.getSimpleName() + " c WHERE c.id=:id";
		getSession().createQuery(hql)//
				.setInteger("id", id)//
				.executeUpdate();
//		Object o=getSession().get(clazz, id);
//		if(o!=null){
//			getSession().delete(o);
//		}
	}

	@Override
	public List<T> query() {
		String hql = "FROM " + clazz.getSimpleName();
		return getSession().createQuery(hql) //
				.list();
	}

	@Override
	public T get(int id) {
		// TODO Auto-generated method stub
		return (T)getSession().get(clazz, id);
	}

}
