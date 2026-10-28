package com.example.beta_1_InnovaCesde.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.beta_1_InnovaCesde.models.Categoria;
import com.example.beta_1_InnovaCesde.service.ServicioCategoria;

@RestController 
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired 
    ServicioCategoria categoriaServicio;

    // Controlador para guardar
    @PostMapping 
    public ResponseEntity<?> guardar(@RequestBody Categoria datos){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaServicio.guardarCategoria(datos));
    }

    // Controlador para buscar todas las categorías
    @GetMapping 
    public ResponseEntity<?> buscar(){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.buscar());
    }

    // Controlador para modificar
    @PutMapping("/{id}") 
    public ResponseEntity<?> modificar(@PathVariable UUID id, @RequestBody Categoria datos){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.modificar(id, datos));
    }

    // Controlador para eliminar
    @DeleteMapping("/{id}") 
    public ResponseEntity<?> eliminar(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.eliminar(id));
    }
}
