package cn.it.shop.action;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Status;
import cn.it.shop.model.User;

public class ForderAction extends BaseAction<Forder> {
	
//	@Override  此方式在此处不安全
//	public Forder getModel() {
//		// session中已经存储了购物项集合,然后吧配送信息注入到 model中,即可入库
//		model=(Forder)session.get("forder");
//		return model;
//	}

	// 实现购物车与购物项的级联入库
	public String save(){
		Forder forder=(Forder)session.get("forder");
		
		forder.setAddress(model.getAddress());
		forder.setPhone(model.getPhone());
		forder.setName(model.getName());
		forder.setRemark(model.getRemark());
		forder.setPost(model.getPost());
		forder.setUser((User)session.get("user"));
		forder.setStatus(new Status(1));
		//。。。。。。
		forderService.save(forder);
		session.put("oldForder", session.get("forder"));
		// 此时购物车已经入库, 那么原来session中的购物车就应该清空
		session.put("forder", new Forder());
		return "bank";
	}
}
