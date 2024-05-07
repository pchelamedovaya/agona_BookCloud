package com.example.backend.service;

import com.example.backend.dto.BookDto;
import com.example.backend.entity.BookEntity;
import com.example.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<BookDto> getAllBooks() {
        List<BookEntity> allBooks = bookRepository.findAll();

        return allBooks.stream()
                .map(it -> BookDto.builder()
                        .id(it.getId())
                        .title(it.getTitle())
                        .author(it.getAuthor())
                        .description(it.getDescription())
                        .genre(it.getGenre())
                        .cover(it.getCover())
                        .readingLink(it.getReadingLink())
                        .build())
                .toList();
    }

}
