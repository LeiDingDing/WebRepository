package cn.it.shop.model;

/**
 * Url entity. @author MyEclipse Persistence Tools
 */

public class Url implements java.io.Serializable {

	// Fields

	private Integer id;
	private String url;
	private Privilege privilege;
	
	public Privilege getPrivilege() {
		return privilege;
	}

	public void setPrivilege(Privilege privilege) {
		this.privilege = privilege;
	}

	/** default constructor */
	public Url() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}