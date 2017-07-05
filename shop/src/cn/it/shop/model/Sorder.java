package cn.it.shop.model;

import java.math.BigDecimal;

/**
 * Sorder entity. @author MyEclipse Persistence Tools
 */

public class Sorder implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private BigDecimal price;
	private Integer number;
	private Product product;
	private Forder forder;
	
	public Forder getForder() {
		return forder;
	}

	public void setForder(Forder forder) {
		this.forder = forder;
	}

	@Override
	public String toString() {
		return "Sorder [id=" + id + ", name=" + name + ", price=" + price
				+ ", number=" + number + "]";
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	/** default constructor */
	public Sorder() {
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getNumber() {
		return this.number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}
}