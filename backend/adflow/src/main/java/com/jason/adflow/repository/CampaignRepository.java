package com.jason.adflow.repository;

import com.jason.adflow.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    Page<Campaign> findByPlatformContainingIgnoreCase(String platform, Pageable pageable);
}