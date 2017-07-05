package cn.it.shop.action;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.interceptor.ApplicationAware;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import cn.it.shop.model.PageModel;
import cn.it.shop.service.AccountService;
import cn.it.shop.service.CategoryService;
import cn.it.shop.service.FileUploadUtil;
import cn.it.shop.service.ForderService;
import cn.it.shop.service.PayService;
import cn.it.shop.service.PrivilegeService;
import cn.it.shop.service.ProductService;
import cn.it.shop.service.RoleService;
import cn.it.shop.service.SendUtil;
import cn.it.shop.service.SorderService;
import cn.it.shop.service.UrlService;
import cn.it.shop.service.UserService;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

/**
 * 
 * @Title: BaseAction.java
 * @Package cn.it.shop.action
 * @Description: TODO(BaseAction用来编写所有的子Action公共代码,包括 model)
 *               ServletConfigInterceptor: 此拦截器用来注入相应的 jsp内置对象,和相应的map,
 *               前提是要实现相应的接口
 * 
 * @author 广州传智播客
 * @date 2014-7-8 下午2:56:13
 * @version V1.0
 */
// @Controller
// // 没有指定名称,默认类名(第一个字母小写)
// @Scope(value = "prototype")
public class BaseAction<T> extends ActionSupport implements RequestAware,
		SessionAware, ApplicationAware, ModelDriven<T> {

	protected String ids;

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	@Resource
	// 默认名称为当前变量名称
	protected AccountService accountService;
	@Resource
	protected ProductService productService;
	@Resource
	protected FileUploadUtil fileUploadUtil;
	@Resource
	protected CategoryService categoryService;
	@Resource
	protected SorderService sorderService;
	@Resource
	protected ForderService forderService;
	@Resource
	protected UserService userService;
	@Resource
	protected PayService payService;
	@Resource
	protected RoleService roleService;
	@Resource
	protected UrlService urlService;
	@Resource
	protected PrivilegeService privilegeService;
	@Resource
	protected SendUtil sendUtil;

	// 在调用构造方法的时候给model赋值
	protected T model;

	protected List<T> jsonList = null;

	protected PageModel<T> pageModel = null;

	protected Integer page;

	protected Integer rows;

	public PageModel<T> getPageModel() {
		return pageModel;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public List<T> getJsonList() {
		return jsonList;
	}

	public void setJsonList(List<T> jsonList) {
		this.jsonList = jsonList;
	}

	public BaseAction() {
		ParameterizedType type = (ParameterizedType) this.getClass()
				.getGenericSuperclass();
		Class clazz = (Class) type.getActualTypeArguments()[0];
		try {
			model = (T) clazz.newInstance();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	// 返回的对象将要压栈
	public T getModel() {
		return model;
	}

	protected Map<String, Object> request;

	protected Map<String, Object> session;

	protected Map<String, Object> application;

	@Override
	public void setRequest(Map<String, Object> request) {
		// TODO Auto-generated method stub
		this.request = request;
	}

	@Override
	public void setApplication(Map<String, Object> application) {
		// TODO Auto-generated method stub
		this.application = application;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		this.session = session;

	}
}
