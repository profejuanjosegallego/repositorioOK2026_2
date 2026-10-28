package com.example.beta1_RetoEmpresarial2.controllers;

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

import com.example.beta1_RetoEmpresarial2.models.Reto;
import com.example.beta1_RetoEmpresarial2.services.ServicioReto;

@RestController
@RequestMapping("/api/retos")
public class RetoControlador {

    @Autowired
    ServicioReto servicio;

    // controlador para guardar
    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Reto datos) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.guardarReto(datos));
    }

    // controlador para buscar
    @GetMapping
    public ResponseEntity<?> buscar() {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.buscarRetos());
    }

    // controlador para modificar
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable UUID id, @RequestBody Reto datos) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.modificarReto(id, datos));
    }

    // controlador para eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(servicio.eliminarReto(id));
    }
}
