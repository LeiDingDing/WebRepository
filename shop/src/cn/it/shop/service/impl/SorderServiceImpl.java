package cn.it.shop.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.it.shop.model.Forder;
import cn.it.shop.model.Product;
import cn.it.shop.model.Sorder;
import cn.it.shop.service.SorderService;

@Service("sorderSerive")
public class SorderServiceImpl extends BaseServiceImpl<Sorder> implements
		SorderService {

	// 把product对象转化为sorder对象
	private Sorder productToSorder(Product product) {
		Sorder sorder=new Sorder();
		sorder.setName(product.getName());
		sorder.setNumber(1);
		sorder.setPrice(product.getPrice());
		sorder.setProduct(product);
		return sorder;
	}
	// 添加购物项, 并且判断重复
	@Override
	public Forder addSorder(Forder forder,Product product) {
		boolean isHave=false;
		Sorder sorder = this.productToSorder(product);
		// 获取当前购物车中已有的购物项
		for(Sorder old:forder.getSorderList()){
			if(old.getProduct().getId().equals(sorder.getProduct().getId())){
				// 不需要重复添加,修改数量即可
				old.setNumber(old.getNumber() + sorder.getNumber());
				isHave=true;
				break;
			}
		}
		// 当前购物项不存在,添加到购物车中
		if(!isHave){
			// 指定购物项与购物车关联( 此时forder.id是null,但是在入库的时候是先forder在sorder,那时forder就有主键了)
			System.out.println("forder.id:" + forder.getId());
			sorder.setForder(forder);
			forder.getSorderList().add(sorder);
		}
		return forder;
	}
	
	@Override	// 更新购物项数量
	public Forder alterSorder(Forder forder, Sorder sorder) {
		for(Sorder old:forder.getSorderList()){
			if(old.getProduct().getId().equals(sorder.getProduct().getId())){
				// 更新当前商品的数量
				old.setNumber(sorder.getNumber());
				break;
			}
		}
		return forder;
	}
	@Override
	public List<Object> querySaleTop10(int number) {
		// TODO Auto-generated method stub
		return sorderDao.querySaleTop10(number);
	}

}
