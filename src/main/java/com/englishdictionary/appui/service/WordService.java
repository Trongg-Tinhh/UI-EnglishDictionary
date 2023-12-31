package com.englishdictionary.appui.service;

import com.englishdictionary.appui.dto.AddWordToWordlistForm;
import com.englishdictionary.appui.dto.LoginForm;
import com.englishdictionary.appui.dto.Word;
import com.englishdictionary.appui.models.User;
import com.englishdictionary.appui.models.Wordlist;
import com.google.gson.Gson;
import org.apache.catalina.connector.Response;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WordService {
    private final String Port = "4040";
    private final String urlAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    /*private final String Host= "http://13.236.161.75:";*/
    private final String Host= "http://10.1.3.91:";
    public Word searchWord(String param) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.dictionaryapi.dev/api/v2/entries/en/{word}";
        Map<String, String> params = Map.of("word",param);
        String getWord = restTemplate.getForObject(url,String.class, params);
        JSONObject jsonObject = new JSONObject(getWord.substring(1,getWord.length()-1));

        Gson gson = new Gson();
        Word word = gson.fromJson(jsonObject.toString(), Word.class);

        return word==null ? null:word;

    }

    // Add word to wordlist
    public ResponseEntity<String> addWordToWordlist(AddWordToWordlistForm addWordToWordlistForm) {
        RestTemplate restTemplate = new RestTemplate();
        String url = Host+Port+"/api/wordlists/word";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<AddWordToWordlistForm> request = new HttpEntity<>(addWordToWordlistForm, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response;
    }

}
