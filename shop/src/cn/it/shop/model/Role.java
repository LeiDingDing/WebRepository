package cn.it.shop.model;

import java.util.Set;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.GrantedAuthority;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */

public class Role implements java.io.Serializable, GrantedAuthority,ConfigAttribute {

	private static final long serialVersionUID = 5306051035474972164L;

	private Integer id;
	private String name;
	private String detail;
	private Set<Privilege> privilegeSet;
	
	
	
	@Override
	public String toString() {
		return getName();
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return name;
	}
	
	public Role(Integer id) {
		super();
		this.id = id;
	}

	public Set<Privilege> getPrivilegeSet() {
		return privilegeSet;
	}

	public void setPrivilegeSet(Set<Privilege> privilegeSet) {
		this.privilegeSet = privilegeSet;
	}

	/** default constructor */
	public Role() {
	}

	/** full constructor */
	public Role(String name, String detail) {
		this.name = name;
		this.detail = detail;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetail() {
		return this.detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	@Override
	public String getAttribute() {
		return name;
	}
}