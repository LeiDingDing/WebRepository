package cn.it.shop.action;

import java.util.Map;

import org.apache.struts2.interceptor.ParameterAware;

import cn.it.shop.model.BackData;
import cn.it.shop.model.Forder;
import cn.it.shop.model.SendData;
import cn.it.shop.model.User;
/*
 * ParameterAware: 此接口可以获取请求的参数信息
 * 
 *  if (action instanceof ParameterAware) {
           ((ParameterAware) action).setParameters((Map)context.getParameters());
     }
    而且在执行Struts拦截器的时候是先执行: servletConfig---> modelDriven
 * */
public class PayAction extends BaseAction<Object> implements ParameterAware {
	
	private Map<String, String[]> parameters;
	
	@Override
	public void setParameters(Map<String, String[]> parameters) {
		this.parameters=parameters;
	}

	// 重写getModel方法,根据请求的参数动态创建对象
	@Override
	public Object getModel() {
		if(parameters.get("pd_FrpId")!=null){
			// 此请求是发送到银行的请求,应该创建sendData
			model=new SendData();
		}else{
			model=new BackData();
		}
		return model;
	}

	public String goBank(){
		SendData sendData=(SendData)model;
		// 1: 补全: p2 p3 Pa  pd(支付编码前台传递)
		Forder oldForder=(Forder)session.get("oldForder");
		sendData.setP2_Order(oldForder.getId().toString());
		sendData.setP3_Amt(oldForder.getTotal().toString());
		// 获取当前用户的手机号码与邮箱,支付成功后要使用
		User user=(User)session.get("user");
		sendData.setPa_MP(user.getPhone() + "," + user.getEmail());
		// 2: 调用service完成数据的加密
		payService.saveDataToRequest(request, sendData);
		// 3: 跳转到最后支付确认页面
		return "pay";
	}
	
	public String backShop(){
		BackData backData=(BackData)model;
		// 2: 追加数据且加密
		// 3: 与传过来的密文进行比较,如果相等则说明数据没有被篡改
		boolean isOk=payService.checkBackData(backData);
		if(isOk && backData.getR1_Code().equals("1")){
		   // 1: 仅仅修改订单状态,其它字段不用更新
		   forderService.updateStatus(Integer.parseInt(backData.getR6_Order()),2);
		   // 获取返回的扩展信息
		   String r8_MP=backData.getR8_MP();
		   // 2: 发送邮件与短信
		   sendUtil.sendEmail(backData.getR6_Order(),backData.getR3_Amt(),"soft03_test@sina.com");
		   // 3: 发送手机短信
		   sendUtil.sendMessage(backData.getR6_Order(),backData.getR3_Amt(),"18027364651");
		   request.put("info", backData.getR6_Order() + ",支付成功!");
		}else{
			request.put("info", "支付失败");
		}
		return "result";
		
	}
}
