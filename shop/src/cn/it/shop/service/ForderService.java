package cn.it.shop.service;

import java.math.BigDecimal;

import cn.it.shop.model.Forder;

public interface ForderService extends BaseService<Forder> {
	// 根据购物项集合 计算购物车的总价格
	public BigDecimal cluTotal(Forder forder);
	// 通过订单id更新订单状态
	public void updateStatus(int id,int sid);
}
