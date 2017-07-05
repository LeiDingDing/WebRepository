package cn.it.shop.service;

public interface SendUtil {

	public abstract void sendEmail(String id, String total,String email);
	public abstract void sendMessage(String id, String total,String phone);

}