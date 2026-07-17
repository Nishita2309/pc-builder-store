package com.pcbuilderstore.backend.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.pcbuilderstore.backend.entity.Component;

public class ComponentSpecification {

    private ComponentSpecification() {
    }

    public static Specification<Component> hasKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")),
                    "%" + keyword.toLowerCase() + "%");
        };
    }

    public static Specification<Component> hasBrand(Long brandId) {

        return (root, query, criteriaBuilder) -> {

            if (brandId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("brand").get("id"),
                    brandId);
        };
    }

    public static Specification<Component> hasCategory(Long categoryId) {

        return (root, query, criteriaBuilder) -> {

            if (categoryId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("category").get("id"),
                    categoryId);
        };
    }

    public static Specification<Component> hasMinPrice(BigDecimal minPrice) {

        return (root, query, criteriaBuilder) -> {

            if (minPrice == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.greaterThanOrEqualTo(
                    root.get("price"),
                    minPrice);
        };
    }

    public static Specification<Component> hasMaxPrice(BigDecimal maxPrice) {

        return (root, query, criteriaBuilder) -> {

            if (maxPrice == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.lessThanOrEqualTo(
                    root.get("price"),
                    maxPrice);
        };
    }
    
    public static Specification<Component> isActive() {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("active"));
    }

}