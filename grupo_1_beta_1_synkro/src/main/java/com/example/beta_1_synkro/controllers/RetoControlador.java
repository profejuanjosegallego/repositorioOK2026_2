package com.example.beta_1_synkro.controllers;

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

import com.example.beta_1_synkro.models.Reto;
import com.example.beta_1_synkro.services.ServicioReto;

@RestController
@RequestMapping("/api/retos")
public class RetoControlador {

    @Autowired
    ServicioReto servicio;

    // CONTROLADOR GUARDAR
    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Reto datos) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.guardarReto(datos));
    }

    // CONTROLADOR BUSCAR
    @GetMapping
    public ResponseEntity<?> buscar() {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.buscar());
    }

    // CONTROLADOR MODIFICAR
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable UUID id, @RequestBody Reto datos) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.modificar(id, datos));
    }

    // CONTROLADOR ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.eliminar(id));
    }
}
