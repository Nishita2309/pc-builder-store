package com.pcbuilderstore.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory extends BaseEntity {

    public Component getComponent() {
		return component;
	}

	public void setComponent(Component component) {
		this.component = component;
	}

	public Integer getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(Integer availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public Integer getReservedQuantity() {
		return reservedQuantity;
	}

	public void setReservedQuantity(Integer reservedQuantity) {
		this.reservedQuantity = reservedQuantity;
	}

	public Integer getMinimumStock() {
		return minimumStock;
	}

	public void setMinimumStock(Integer minimumStock) {
		this.minimumStock = minimumStock;
	}

	public Integer getMaximumStock() {
		return maximumStock;
	}

	public void setMaximumStock(Integer maximumStock) {
		this.maximumStock = maximumStock;
	}

	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id", nullable = false, unique = true)
    private Component component;

    @Column(nullable = false)
    @Builder.Default
    private Integer availableQuantity = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer reservedQuantity = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer minimumStock = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer maximumStock = 100;
}