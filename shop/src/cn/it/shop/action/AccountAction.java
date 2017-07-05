package cn.it.shop.action;

import java.util.HashSet;
import java.util.Set;

import cn.it.shop.model.Account;
import cn.it.shop.model.PageModel;
import cn.it.shop.model.Role;

/**
 * 
 * @Title: AccountAction.java
 * @Package cn.it.shop.action
 * @Description: TODO(用一句话描述该文件做什么)
 * @author 刘 虹
 * @version V1.0
 */
public class AccountAction extends BaseAction<Account> {

	private static final long serialVersionUID = -515496382921247138L;

	private Integer[] rids;

	public Integer[] getRids() {
		return rids;
	}

	public void setRids(Integer[] rids) {
		this.rids = rids;
	}

	public void save() {
		accountService.save(model);
	}

	/**
	 * 
	 * @Title: updateHql
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param
	 * @return void
	 */
	public void updateHql() {
		System.out.println(model);
		accountService.updateHql(model);
	}

	public void grantRole() {
		// 通过id获取管理员信息
		System.out.println(model);
		model = accountService.get(model.getId());
		Set<Role> roleSet = null;
		if (rids != null) {
			roleSet = new HashSet<Role>();
			for (int rid : rids) {
				roleSet.add(new Role(rid));
			}
		}
		// 当管理员没有选择角色时候 角色集合为null
		model.setRoleSet(roleSet);
		// 通过更新管理员的方式,级联更新拥有的角色集合
		accountService.update(model);
	}

	public void deleteByIds() {
		accountService.deleteByIds(ids);
	}

	public String queryForPage() {
		pageModel = new PageModel<Account>();
		pageModel.setRows(accountService.query(model.getLogin(), page, rows));
		pageModel.setTotal(accountService.count(model.getLogin()));
		return "pageModel";
	}

	public String getAccount() {
		System.out.println(model.getId());
		// 查询管理员,并且级联查询角色集合
		model = accountService.getJoinRole(model.getId());
		// 根据roleSet获取 所有role.id
		request.put("myRids", roleService.getRoleId(model.getRoleSet()));
		// 查询所有角色信息,并且存储reques域
		request.put("roleList", roleService.query());
		return "grantRole";
	}

	public String query() {
		jsonList = accountService.query();
		System.out.println("jsonList:" + jsonList);
		return "jsonList";
	}
}
