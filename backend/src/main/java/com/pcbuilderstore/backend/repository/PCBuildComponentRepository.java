package com.pcbuilderstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.PCBuildComponent;

public interface PCBuildComponentRepository extends JpaRepository<PCBuildComponent, Long> {

    List<PCBuildComponent> findByBuild(PCBuild build);

}