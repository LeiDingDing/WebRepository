package cn.it.shop.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.it.shop.model.Account;
import cn.it.shop.model.Category;
import cn.it.shop.model.PageModel;

//@Controller  // 没有指定名称,默认类名(第一个字母小写)
//@Scope(value="prototype")
public class CategoryAction extends BaseAction<Category> {
	
	public void save(){
		System.out.println(model);
		// 在此处吧session中的account获取之后交给 model.setAccount();
		Account account=new Account();
		account.setId(1);
		model.setAccount(account);
		categoryService.save(model);
	}
	
	public void update(){
		System.out.println(model + "," + model.getAccount());
		categoryService.update(model);
	}
	
	public String query(){
		jsonList=categoryService.query();
		return "jsonList";
	}

	public String queryJoinAccount(){
		System.out.println(model.getType() + "," + page + "," + rows);
		// root中配置 pageModel
		pageModel=new PageModel<Category>();
		pageModel.setTotal(categoryService.count(model.getType()));
		pageModel.setRows(categoryService.queryJoinAccount(model.getType(), page, rows));
		return "pageModel";
	}
	
	public void deleteByIds(){
		categoryService.deleteByIds(ids);
	}
}
