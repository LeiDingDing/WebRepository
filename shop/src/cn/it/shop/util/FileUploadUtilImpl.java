package cn.it.shop.util;

import java.io.File;
import java.io.FilenameFilter;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import cn.it.shop.service.FileUploadUtil;

@Component("fileUploadUtil")
public class FileUploadUtilImpl implements FileUploadUtil {
	  
	private String uploadPath=null;
	
	// 注入"值"  配置文件的加载存储到 applicationContext-public.xml 中
	@Value("#{public.basePath+public.uploadPath}")  
	public void setUploadPath(String uploadPath) {
//		System.out.println("uploadPath:" + uploadPath);
		this.uploadPath = uploadPath;
	}
	
	private String getExt(String fileName){
		return FilenameUtils.getExtension(fileName);
	}
	
	private String createName(String fileName){
		String ext=this.getExt(fileName);
		return UUID.randomUUID().toString() + "." + ext;
	}
	// 完成文件上传业务逻辑,返回新的文件名
	public String upload(File file,String fileName){
		String newName = this.createName(fileName);
		try {
			FileUtils.copyFile(file,new File(uploadPath,newName));
			return newName;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}finally{
			file.delete();
		}
	}

	@Override
	public String[] getFileNameByPath(String path) {
		System.out.println("path:" + path);
		File file=new File(path);
		return file.list(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
//				System.out.println("dir:" + dir + ",name:" + name);
				return name.endsWith("gif");
			}
		});
	}
}
