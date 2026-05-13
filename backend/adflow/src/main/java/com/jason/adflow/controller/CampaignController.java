package com.jason.adflow.controller;

import com.jason.adflow.entity.Campaign;
import com.jason.adflow.service.CampaignService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<Campaign> findAll() {
        return campaignService.findAll();
    }

    @PostMapping
    public Campaign create(@RequestBody Campaign campaign) {
        return campaignService.save(campaign);
    }
}