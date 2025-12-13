package dev.omel.brainboostbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Table(name = "user_entity")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "last_name")
    private String lastName;

    @Setter
    @Column(name = "first_name")
    private String firstName;

    @Setter
    @Column(name = "username", unique = true)
    private String username;

    @Setter
    @Column(name = "password_hash")
    private String passwordHash;

    public UserEntity() {}
}
