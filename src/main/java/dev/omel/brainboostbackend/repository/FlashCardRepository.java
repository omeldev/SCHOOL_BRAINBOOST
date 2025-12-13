package dev.omel.brainboostbackend.repository;

import dev.omel.brainboostbackend.domain.FlashCardEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCardEntity, Long> {
    List<FlashCardEntity> findByCreatorId(Long userId);
    List<FlashCardEntity> findByFlashCardSetId(Long flashCardSetId);
}
