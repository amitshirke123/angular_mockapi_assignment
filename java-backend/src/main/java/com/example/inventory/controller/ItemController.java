package com.example.inventory.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.inventory.entity.Item;
import com.example.inventory.service.ItemService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class ItemController {
 
    @Autowired
    private ItemService service;
    
    @GetMapping(value ="/items", name="To get all item details")
    public List<Item> list() {
        return service.listAll();
    }
    
    @GetMapping(value ="/items/{id}", name="To get item details by id")
    public ResponseEntity<Item> get(@PathVariable Integer id) {
        try {
            Item item = service.get(id);
            return new ResponseEntity<Item>(item, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Item>(HttpStatus.NOT_FOUND);
        }      
    }
    
    @PostMapping(value="/items", name="To add new item")
    public void add(@RequestBody Item item) {
        service.save(item);
    }
    
    @PutMapping(value="/items/{id}", name="To update existing item by id") 
    public ResponseEntity<?> update(@RequestBody Item item, @PathVariable Integer id) {
        try {
            Item existItem = service.get(id);
            if(existItem != null) {
            	service.save(item);
            }            
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }      
    }
    
    
    @DeleteMapping(value="/items/{id}", name="To delete item by id")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
    
    
}
