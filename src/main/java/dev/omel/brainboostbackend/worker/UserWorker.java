package dev.omel.brainboostbackend.worker;

import dev.omel.brainboostbackend.bean.UserBean;
import dev.omel.brainboostbackend.domain.UserEntity;
import dev.omel.brainboostbackend.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class UserWorker {

    private final UserRepository userRepository;

    public UserWorker(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[A-Za-z0-9_]{3,50}$");
    private static final Pattern NAME_PATTERN = Pattern.compile("^[\\p{L} '\\-]{1,100}$");

    private void validateUsernameForCreation(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username ist erforderlich");
        }
        String u = username.trim();
        if (!USERNAME_PATTERN.matcher(u).matches()) {
            throw new IllegalArgumentException("Username muss 3-50 Zeichen sein und darf nur Buchstaben, Zahlen oder Unterstrich enthalten");
        }
        // Check if Username Already Exists
        if (userRepository.findByUsername(u)) {
            throw new IllegalArgumentException("Username existiert bereits");
        }
    }

    private void validateUsernameForUpdate(String username, String currentUsername) {
        if (username == null) return;
        String u = username.trim();
        if (!USERNAME_PATTERN.matcher(u).matches()) {
            throw new IllegalArgumentException("Username muss 3-50 Zeichen sein und darf nur Buchstaben, Zahlen oder Unterstrich enthalten");
        }
        if (!u.equals(currentUsername) && userRepository.findByUsername(u)) {
            throw new IllegalArgumentException("Username existiert bereits");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Passwort ist erforderlich");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Passwort muss mindestens 8 Zeichen lang sein");
        }
        if (password.contains(" ")) {
            throw new IllegalArgumentException("Passwort darf keine Leerzeichen enthalten");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Passwort muss mindestens einen Großbuchstaben enthalten");
        }
        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException("Passwort muss mindestens einen Kleinbuchstaben enthalten");
        }
        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Passwort muss mindestens eine Zahl enthalten");
        }
        // optional: Sonderzeichen prüfen - aktuell nicht zwingend erforderlich
    }

    private void validateNameField(String name, String fieldName) {
        if (name == null) return;
        String n = name.trim();
        if (n.isEmpty()) {
            throw new IllegalArgumentException(fieldName + " darf nicht leer sein");
        }
        if (!NAME_PATTERN.matcher(n).matches()) {
            throw new IllegalArgumentException(fieldName + " enthält ungültige Zeichen oder ist zu lang");
        }
    }
    // --- Ende Validierungsregeln ---

    public UserBean createUser(String username, String password, String firstName, String lastName) {
        // Validierung
        validateUsernameForCreation(username);
        validatePassword(password);
        validateNameField(firstName, "Vorname");
        validateNameField(lastName, "Nachname");

        UserEntity userEntity = new UserEntity();
        String u = username.trim();
        userEntity.setUsername(u);

        //should normally be done in the Frontend for man in the middle attack prevention :)
        //Should be Hashed normally with Salt and Pepper as well
        //For production use Argon2 or PBKDF2 those are more secure than plain hashing
        //NEVER USE BASE64 FOR PASSWORD HASHING/ENCRYPTION IN PRODUCTION
        String hashedPassword = Base64.getEncoder().encodeToString(password.getBytes());

        userEntity.setPasswordHash(hashedPassword);
        userEntity.setFirstName(firstName != null ? firstName.trim() : null);
        userEntity.setLastName(lastName != null ? lastName.trim() : null);
        userRepository.save(userEntity);
        return UserBean.from(userEntity);
    }

    public UserBean getUserByUsernameAndPassword(String username, String password) {
        // Validierung
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username ist erforderlich");
        }
        validatePassword(password);

        String u = username.trim();
        //should normally be done in the Frontend for man in the middle attack prevention :)
        //Should be Hashed normally with Salt and Pepper as well
        //For production use Argon2 or PBKDF2
        //NEVER USE BASE64 FOR PASSWORD HASHING/ENCRYPTION IN PRODUCTION

        String passwordHash = Base64.getEncoder().encodeToString(password.getBytes());
        Optional<UserEntity> opt = userRepository.findByUsernameAndPasswordHash(u, passwordHash);
        return UserBean.from(Objects.requireNonNull(opt.orElseThrow(() -> new IllegalArgumentException("Ungültiger Benutzername oder Passwort"))));
    }

    public UserBean updateUser(Long id, UserBean userBean) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow();

        // Username-Prüfung und Validierung
        if (userBean.username() != null) {
            validateUsernameForUpdate(userBean.username(), userEntity.getUsername());
            if (!userEntity.getUsername().equals(userBean.username())) {
                userEntity.setUsername(userBean.username().trim());
            }
        }

        // Namen validieren
        Optional.ofNullable(userBean.firstName()).ifPresent(fn -> {
            validateNameField(fn, "Vorname");
            userEntity.setFirstName(fn.trim());
        });
        Optional.ofNullable(userBean.lastName()).ifPresent(ln -> {
            validateNameField(ln, "Nachname");
            userEntity.setLastName(ln.trim());
        });

        // Passwort validieren falls gesetzt
        Optional.ofNullable(userBean.password()).ifPresent(p -> {
            validatePassword(p);
            userEntity.setPasswordHash(Base64.getEncoder().encodeToString(p.getBytes()));
        });

        userRepository.save(userEntity);
        return UserBean.from(userEntity);
    }
}
