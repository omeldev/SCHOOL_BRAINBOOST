package dev.omel.brainboostbackend.bean;

import dev.omel.brainboostbackend.domain.FlashCardEntity;

public record FlashCardBean(Long id,
                            Long userId,
                            String title,
                            String question,
                            String answer,
                            Long lastLearned,
                            Long flashCardSetId) {
    public static FlashCardBean from(FlashCardEntity flashCardEntity) {
        return new FlashCardBean(
                flashCardEntity.getId(),
                flashCardEntity.getCreator().getId(),
                flashCardEntity.getTitle(),
                flashCardEntity.getQuestion(),
                flashCardEntity.getAnswer(),
                flashCardEntity.getLastLearned(),
                flashCardEntity.getFlashCardSet().getId());
    }
}
