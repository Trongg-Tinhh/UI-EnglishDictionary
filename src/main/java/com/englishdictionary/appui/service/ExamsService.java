package com.englishdictionary.appui.service;

import com.englishdictionary.appui.models.ListQuestion;
import com.englishdictionary.appui.models.Question;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class ExamsService {
    private final String Port = "4040";
    /*private final String Host= "http://13.236.161.75:";*/
    private final String Host= "http://10.1.3.91:";
    public ResponseEntity<ListQuestion> getAllQuestions() {
        WebClient webClient = WebClient.create(Host + Port + "/api/tests/questions");
        List<Question> questions = webClient.get()
                .retrieve()
                .toEntityList(Question.class)
                .block()
                .getBody();

        ListQuestion listQuestion = new ListQuestion();
        listQuestion.setList(questions);

        return ResponseEntity.ok(listQuestion);
    }
}
