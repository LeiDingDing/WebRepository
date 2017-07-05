package cn.it.shop.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Sorder;
import cn.it.shop.service.ForderService;

@Service("forderService")
public class ForderServiceImpl extends BaseServiceImpl<Forder> implements
		ForderService {

	@Override
	public BigDecimal cluTotal(Forder forder) {
		BigDecimal total = new BigDecimal(0.00);
		for (Sorder sorder : forder.getSorderList()) {
			System.out.println(sorder.getPrice() + "," + sorder.getNumber());
			BigDecimal temp = sorder.getPrice().multiply(
					new BigDecimal(sorder.getNumber()));
			System.out.println(temp);
			total = total.add(temp);
		}
		return total;
	}

	@Override
	public void updateStatus(int id, int sid) {
		forderDao.updateStatus(id, sid);
	}

}
