package dev.omel.brainboostbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "flash_card_entity")
public class FlashCardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "title")
    private String title;

    @Setter
    @Column(name = "question")
    private String question;

    @Setter
    @Column(name = "answer")
    private String answer;

    @Setter
    @Column(name = "last_learned")
    private Long lastLearned;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    @Setter
    private UserEntity creator;

    @ManyToOne
    @JoinColumn(name = "flash_card_set_id")
    @Setter
    private FlashCardSetEntity flashCardSet;

    public FlashCardEntity() {}

}
