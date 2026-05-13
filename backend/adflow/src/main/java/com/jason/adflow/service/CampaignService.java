package com.jason.adflow.service;

import com.jason.adflow.dto.CampaignDTO;
import com.jason.adflow.entity.Campaign;
import com.jason.adflow.repository.CampaignRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> findAll() {
        return campaignRepository.findAll();
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
}