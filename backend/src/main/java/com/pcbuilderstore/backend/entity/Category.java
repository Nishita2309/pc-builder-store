package com.pcbuilderstore.backend.entity;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

	@Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;
}