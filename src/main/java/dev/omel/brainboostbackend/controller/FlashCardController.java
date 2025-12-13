package dev.omel.brainboostbackend.controller;

import dev.omel.brainboostbackend.bean.FlashCardBean;
import dev.omel.brainboostbackend.worker.FlashCardWorker;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller()
public class FlashCardController {

    private final FlashCardWorker flashCardWorker;

    public FlashCardController(FlashCardWorker flashCardWorker) {
        this.flashCardWorker = flashCardWorker;
    }

    @PostMapping("/flashcardset/{id}/flashcard/create/")
    public ResponseEntity<Boolean> createFlashCard(@RequestBody FlashCardBean flashCardBean, @PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.createFlashCard(flashCardBean, id));
    }

    @PostMapping("/flashcard/create/")
    public ResponseEntity<Boolean> createFlashCard(@RequestBody FlashCardBean flashCardBean) {
        return ResponseEntity.ok(flashCardWorker.createFlashCard(flashCardBean, null));
    }

    @PostMapping("/flashcardset/create/")
    public ResponseEntity<Boolean> createFlashCardSet(@RequestBody java.util.List<FlashCardBean> flashCardBeans) {
        return ResponseEntity.ok(flashCardWorker.createFlashCardSet(flashCardBeans));
    }

    @GetMapping("/flashcard/{id}/")
    public ResponseEntity<FlashCardBean> getFlashCardBean(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.getFlashCardBean(id));
    }

    @GetMapping("/user/{id}/flashcards/")
    public ResponseEntity<java.util.List<FlashCardBean>> getFlashCardBeansFromUser(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.getFlashCardBeansFromUser(id));
    }

    @GetMapping("/flashcardset/{id}/flashcards/")
    public ResponseEntity<java.util.List<FlashCardBean>> getFlashCardBeansFromFlashCardSetById(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.getFlashCardBeansFromFlashCardSetById(id));
    }

    @DeleteMapping("/flashcard/{id}/")
    public ResponseEntity<Boolean> deleteFlashCard(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.deleteFlashCard(id));
    }

    @DeleteMapping("/flashcardset/{id}/")
    public ResponseEntity<Boolean> deleteFlashCardSetById(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardWorker.deleteFlashCardSetById(id));
    }


}
