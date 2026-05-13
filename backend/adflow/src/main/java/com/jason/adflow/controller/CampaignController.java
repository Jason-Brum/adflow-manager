package com.jason.adflow.controller;

import com.jason.adflow.dto.CampaignDTO;
import com.jason.adflow.entity.Campaign;
import com.jason.adflow.service.CampaignService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

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

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> findById(@PathVariable Long id) {

        Campaign campaign = campaignService.findById(id);

        if (campaign == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(campaign);
    }

    @PostMapping
    public Campaign create(@RequestBody @Valid CampaignDTO campaignDTO) {
        return campaignService.save(campaignDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> update(
            @PathVariable Long id,
            @Valid @RequestBody CampaignDTO campaignDTO
    ) {
        Campaign updatedCampaign = campaignService.update(id, campaignDTO);

        if (updatedCampaign == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedCampaign);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
    boolean deleted = campaignService.delete(id);

    if (!deleted) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.noContent().build();
    }

}