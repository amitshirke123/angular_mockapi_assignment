package com.example.inventory.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inventory.dao.ItemRepository;
import com.example.inventory.entity.Item;

@Service
public class ItemService {
 
    @Autowired
    private ItemRepository repo;
     
    public List<Item> listAll() {
        return (List<Item>) repo.findAll();
    }
     
    public void save(Item item) {
        repo.save(item);
    }
     
    public Item get(Integer id) {
        return repo.findById(id).get();
    }
     
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}
