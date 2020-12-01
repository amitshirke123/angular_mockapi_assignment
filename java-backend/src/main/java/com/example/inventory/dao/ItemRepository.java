package com.example.inventory.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.inventory.entity.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> {

}
