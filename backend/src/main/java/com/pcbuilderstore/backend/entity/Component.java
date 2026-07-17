package com.pcbuilderstore.backend.entity;

import com.pcbuilderstore.backend.enums.ComponentType;
import com.pcbuilderstore.backend.util.AppConstants;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "component")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Component extends BaseEntity {

	@Column(nullable = false, length = AppConstants.NAME_LENGTH)
    private String name;

    @Column(nullable = false, length = AppConstants.NAME_LENGTH)
    private String model;

    @Column(length = AppConstants.DESCRIPTION_LENGTH)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer warrantyMonths;

    @Column(length = 500)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComponentType componentType;
    
    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @OneToMany(
            mappedBy = "component",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<ComponentSpecification> specifications = new ArrayList<>();

    @OneToOne(mappedBy = "component", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Inventory inventory;
}