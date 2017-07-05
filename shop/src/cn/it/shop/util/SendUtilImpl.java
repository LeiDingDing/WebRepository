package cn.it.shop.util;

import java.io.IOException;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.PostMethod;
import org.springframework.stereotype.Component;

import cn.it.shop.service.SendUtil;
@Component("sendlUtil")
public class SendUtilImpl implements SendUtil {
	
	/* (non-Javadoc)
	 * @see cn.it.shop.util.EmailUtil#sendMessage(java.lang.String, java.lang.String)
	 */
	@Override
	public void sendEmail(String id,String total,String email){
		Properties prop=new Properties();
		prop.setProperty("mail.transport.protocol", "smtp");
		Message message=null;
		Transport transport=null;
		Session session=null;
		try {
			session = Session.getDefaultInstance(prop);
			session.setDebug(true);
			// 2: 创建一封新有邮件
			message=(Message) new MimeMessage(session);
			// 3: 标题、正文内容、发件人地址
			message.setSubject("订单支付成功邮件(系统邮件)");
			message.setContent("订单编号为:" + id + ",金额 为: " +  total  + ",已经支付成功!", "text/html;charset=utf-8");
			message.setFrom(new InternetAddress("soft03_test@sina.com"));
			// 4: 设置用户名密码,收件人地址,发送邮件
			transport = session.getTransport();
			// 5: 通过用户名与密码, 链接邮件服务器
			transport.connect("smtp.sina.com", "soft03_test", "soft03_test");
			transport.sendMessage(message, new Address[]{new InternetAddress(email)});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new RuntimeException(e);
		}finally{
			try {
				// 5: 关闭客户端(释放资源)
				transport.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
	}

	@Override
	public void sendMessage(String id, String total,String phone) {
		// 创建浏览器对象
		HttpClient client=new HttpClient();
		// 创建post请求
		PostMethod post=new PostMethod("http://utf8.sms.webchinese.cn");
		post.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		post.setParameter("Uid", "gz_shop_ms");
		post.setParameter("Key", "0d0dd0eeca547bcb896d");
		post.setParameter("smsMob", phone);
		post.setParameter("smsText", "订单编号为:" + id + ",金额 为: " +  total  + ",已经支付成功!");
		// 发送post请求
		try {
			int code=client.executeMethod(post);
			System.out.println("http状态码:200代表OK: " + code);
			// 查看发送结果
			System.out.println(post.getResponseBodyAsString());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

	public static void main(String[] args) throws Exception {
//		// 1: 登陆邮箱客户端(session)
//		Properties prop=new Properties();
//		prop.setProperty("mail.transport.protocol", "smtp");
//		Session session = Session.getDefaultInstance(prop);
//		session.setDebug(true);
//		// 2: 创建一封新有邮件
//		Message message=(Message) new MimeMessage(session);
//		// 3: 标题、正文内容、发件人地址
//		message.setSubject("订单支付成功邮件(系统邮件)");
//		message.setContent("订单1234567,金额 888.88,已经支付成功!", "text/html;charset=utf-8");
//		message.setFrom(new InternetAddress("soft03_test@sina.com"));
//		// 4: 设置用户名密码,收件人地址,发送邮件
//		Transport transport = session.getTransport();
//		// 5: 通过用户名与密码, 链接邮件服务器
//		transport.connect("smtp.sina.com", "soft03_test", "soft03_test");
//		transport.sendMessage(message, new Address[]{new InternetAddress("soft03_test@sina.com")});
//		// 5: 关闭客户端(释放资源)
//		transport.close();
		
		SendUtilImpl sendUtilImpl=new SendUtilImpl();
		sendUtilImpl.sendMessage("123456789", "45.67","18027364651");
	}
}
