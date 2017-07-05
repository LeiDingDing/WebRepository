package cn.it.shop.service;

import java.util.List;

import cn.it.shop.model.Category;

/**
 * 
 * @Title: CategoryService.java
 * @Package cn.it.shop.service
 * @Description: TODO(类别的业务逻辑)
 * @author http://www.itcast.cn/ 传智播客
 * @date 2014-7-7 下午2:32:40
 * @version V1.0
 */
public interface CategoryService extends BaseService<Category> {
	// 查询类别级联管理员,支持分页显示
	public List<Category> queryJoinAccount(String type,int page,int rows);
	// 查询总记录数
	public Long count(String type);
	// 根据id 数值删除多条记录
	public void deleteByIds(String ids);
	// 查询热点/非热点类别
	public List<Category> queryByHot(boolean hot);
}
