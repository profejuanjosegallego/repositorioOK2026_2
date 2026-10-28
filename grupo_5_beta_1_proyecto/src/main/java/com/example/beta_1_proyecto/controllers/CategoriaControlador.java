package com.example.beta_1_proyecto.controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.beta_1_proyecto.services.ServicioCategoria;
import com.example.beta_1_proyecto.models.Categoria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired
    private ServicioCategoria servicio;

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Categoria datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.guardar(datos));
    }

    @GetMapping
    public ResponseEntity<?> buscar() {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.buscar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable UUID id, @RequestBody Categoria datos) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.modificar(id, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.eliminar(id));
    }
}