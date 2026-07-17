package com.pcbuilderstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.User;

public interface PCBuildRepository extends JpaRepository<PCBuild, Long> {

    List<PCBuild> findByUser(User user);

}