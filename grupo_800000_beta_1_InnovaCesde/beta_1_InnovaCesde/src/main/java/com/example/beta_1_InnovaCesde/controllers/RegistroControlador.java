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

import com.example.beta_1_InnovaCesde.models.Registro;
import com.example.beta_1_InnovaCesde.service.ServicioRegistro;

@RestController 
@RequestMapping("/api/registros")
public class RegistroControlador {

    @Autowired 
    ServicioRegistro registro; // Mantenemos el nombre 'registro'

    // Controlador para guardar
    @PostMapping 
    public ResponseEntity<?> guardar(@RequestBody Registro datos){
        return ResponseEntity.status(HttpStatus.OK).body(registro.guardarRegistro(datos)); // Agregado (datos)
    }

    // Controlador para buscar
    @GetMapping // <-- Faltaba esta anotación para las peticiones GET
    public ResponseEntity<?> buscar(){
        return ResponseEntity.status(HttpStatus.OK).body(registro.buscar());
    }

    // Controlador para modificar
    @PutMapping("/{id}") // <-- Corregido el orden del slash: /{id}
    public ResponseEntity<?> modificar(@PathVariable UUID id, @RequestBody Registro datos){ // <-- Añadido @RequestBody
        return ResponseEntity.status(HttpStatus.OK).body(registro.modificar(id, datos));
    }

    // Controlador para eliminar
    @DeleteMapping("/{id}") // <-- Corregido el orden del slash: /{id}
    public ResponseEntity<?> eliminar(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(registro.eliminar(id));
    }
}
