package com.pcbuilderstore.backend.entity;

import com.pcbuilderstore.backend.enums.SpecificationKey;
import com.pcbuilderstore.backend.util.AppConstants;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "component_specification",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_component_specification",
            columnNames = {"component_id", "specification_key"}
        )
    }
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentSpecification extends BaseEntity {

    public Component getComponent() {
		return component;
	}

	public void setComponent(Component component) {
		this.component = component;
	}

	public SpecificationKey getSpecificationKey() {
		return specificationKey;
	}

	public void setSpecificationKey(SpecificationKey specificationKey) {
		this.specificationKey = specificationKey;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id", nullable = false)
    private Component component;

    @Enumerated(EnumType.STRING)
    @Column(name = "specification_key", nullable = false)
    private SpecificationKey specificationKey;

    @Column(name = "spec_value", nullable = false, length = AppConstants.DESCRIPTION_LENGTH)
    private String value;
}