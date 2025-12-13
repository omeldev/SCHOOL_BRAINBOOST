package dev.omel.brainboostbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Table(name = "flash_card_set_entity")
public class FlashCardSetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "title")
    private String title;

    @Setter
    @Column(name = "description", length = 2048)
    private String description;

    @OneToMany(mappedBy = "flashCardSet")
    @Setter
    private List<FlashCardEntity> flashCards;

    public FlashCardSetEntity() {}

}
