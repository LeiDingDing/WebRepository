package cn.it.shop.service;

import java.util.List;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Product;
import cn.it.shop.model.Sorder;

public interface SorderService extends BaseService<Sorder> {
	
	// 把购物项添加到购物车中,判断商品重复
	public Forder addSorder(Forder forder,Product product);
	
	public Forder alterSorder(Forder forder,Sorder sorder);
	
	public List<Object> querySaleTop10(int number);
	
}
