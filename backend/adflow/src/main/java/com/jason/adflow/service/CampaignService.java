package com.jason.adflow.service;

import com.jason.adflow.dto.CampaignDTO;
import com.jason.adflow.entity.Campaign;
import com.jason.adflow.repository.CampaignRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public Page<Campaign> findAll(String platform, Pageable pageable) {
    if (platform != null && !platform.isBlank()) {
        return campaignRepository.findByPlatformContainingIgnoreCase(platform, pageable);
    }

    return campaignRepository.findAll(pageable);
    }

    public Campaign save(CampaignDTO campaignDTO) {
        Campaign campaign = new Campaign();

        campaign.setName(campaignDTO.getName());
        campaign.setPlatform(campaignDTO.getPlatform());
        campaign.setBudget(campaignDTO.getBudget());
        campaign.setImpressions(campaignDTO.getImpressions());
        campaign.setClicks(campaignDTO.getClicks());
        campaign.setActive(campaignDTO.getActive());

        return campaignRepository.save(campaign);
    }

    public Campaign findById(Long id) {
    return campaignRepository.findById(id).orElse(null);
    }

    public Campaign update(Long id, CampaignDTO campaignDTO) {
    Campaign campaign = campaignRepository.findById(id).orElse(null);

    if (campaign == null) {
        return null;
    }

    campaign.setName(campaignDTO.getName());
    campaign.setPlatform(campaignDTO.getPlatform());
    campaign.setBudget(campaignDTO.getBudget());
    campaign.setImpressions(campaignDTO.getImpressions());
    campaign.setClicks(campaignDTO.getClicks());
    campaign.setActive(campaignDTO.getActive());

    return campaignRepository.save(campaign);
    }

    public boolean delete(Long id) {
    if (!campaignRepository.existsById(id)) {
        return false;
    }

    campaignRepository.deleteById(id);
    return true;
    }
}