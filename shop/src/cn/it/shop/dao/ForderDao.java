package cn.it.shop.dao;

import java.math.BigDecimal;

import cn.it.shop.model.Forder;

public interface ForderDao extends BaseDao<Forder> {

	// 通过订单id更新订单状态
	public void updateStatus(int id,int sid);
}
