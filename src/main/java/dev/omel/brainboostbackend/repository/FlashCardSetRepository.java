package dev.omel.brainboostbackend.repository;

import dev.omel.brainboostbackend.domain.FlashCardSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashCardSetRepository extends JpaRepository<FlashCardSetEntity, Long> {
}
