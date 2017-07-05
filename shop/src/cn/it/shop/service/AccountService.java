package cn.it.shop.service;

import java.util.List;

import cn.it.shop.model.Account;

/**
 * 
 * @Title: CategoryService.java
 * @Package cn.it.shop.service
 * @Description: TODO(管理员自身的业务逻辑)
 * @author http://www.itcast.cn/ 传智播客
 * @date 2014-7-7 下午2:32:40
 * @version V1.0
 */
public interface AccountService extends BaseService<Account> {

	public Account login(Account account);

	public List<Account> query(String name, int page, int rows);

	public Long count(String name);
	
	public void deleteByIds(String ids);
	
	public void updateHql(Account account);
	
	public Account getJoinRole(int id);
}
