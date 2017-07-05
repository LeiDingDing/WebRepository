package cn.it.shop.dao;

import java.util.List;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Product;
import cn.it.shop.model.Sorder;

public interface SorderDao extends BaseDao<Sorder> {
	// 查询商品销售前10名
	public List<Object> querySaleTop10(int number);
}
