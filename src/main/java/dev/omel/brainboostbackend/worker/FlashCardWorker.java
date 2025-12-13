package dev.omel.brainboostbackend.worker;

import dev.omel.brainboostbackend.bean.FlashCardBean;
import dev.omel.brainboostbackend.domain.FlashCardEntity;
import dev.omel.brainboostbackend.domain.FlashCardSetEntity;
import dev.omel.brainboostbackend.repository.FlashCardRepository;
import dev.omel.brainboostbackend.repository.FlashCardSetRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FlashCardWorker {

    private final FlashCardRepository flashCardRepository;
    private final FlashCardSetRepository flashCardSetRepository;

    public FlashCardWorker(FlashCardRepository flashCardRepository, FlashCardSetRepository flashCardSetRepository) {
        this.flashCardRepository = flashCardRepository;
        this.flashCardSetRepository = flashCardSetRepository;
    }

    public FlashCardBean getFlashCardBean(Long flashCardId) {
        return FlashCardBean.from(flashCardRepository.getReferenceById(flashCardId));
    }

    public List<FlashCardBean> getFlashCardBeansFromUser(Long userId) {
        return this.flashCardRepository.findByCreatorId(userId).stream().map(FlashCardBean::from).collect(Collectors.toList());
    }

    public List<FlashCardBean> getFlashCardBeansFromFlashCardSetById(Long flashCardSetId) {
        return this.flashCardRepository.findByFlashCardSetId(flashCardSetId).stream().map(FlashCardBean::from).collect(Collectors.toList());
    }

    public boolean deleteFlashCard(Long flashCardId) {
        flashCardRepository.deleteById(flashCardId);
        return true;
    }

    public boolean deleteFlashCardSetById(Long flashCardSetId) {
        List<FlashCardEntity> flashCardEntities = flashCardRepository.findByFlashCardSetId(flashCardSetId);
        flashCardRepository.deleteAll(flashCardEntities);
        flashCardSetRepository.deleteById(flashCardSetId);
        return true;
    }

    public boolean createFlashCard(FlashCardBean flashCardBean, Long flashCardSetId) {
        FlashCardEntity flashCardEntity = new FlashCardEntity();
        flashCardEntity.setTitle(flashCardBean.title());
        flashCardEntity.setQuestion(flashCardBean.question());
        flashCardEntity.setAnswer(flashCardBean.answer());
        FlashCardSetEntity flashCardSetEntity;
        if(flashCardSetId == null){
            flashCardSetEntity = new FlashCardSetEntity();
            flashCardSetRepository.save(flashCardSetEntity);

        } else {
            flashCardSetEntity = flashCardSetRepository.getReferenceById(flashCardSetId);
        }

        flashCardEntity.setFlashCardSet(flashCardSetEntity);
        flashCardRepository.save(flashCardEntity);

        return true;
    }

    public boolean createFlashCardSet(List<FlashCardBean> flashCardBeans) {
        boolean success = false;
        for (FlashCardBean flashCardBean : flashCardBeans) {
           success = createFlashCard(flashCardBean, null);
        }
        return success;
    }
}
