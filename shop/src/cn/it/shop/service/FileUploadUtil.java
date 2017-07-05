package cn.it.shop.service;

import java.io.File;

public interface FileUploadUtil {

	public String upload(File file,String fileName);
	
	public String[] getFileNameByPath(String path);
}
