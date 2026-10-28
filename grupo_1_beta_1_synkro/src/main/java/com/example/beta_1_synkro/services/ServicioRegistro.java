package com.example.beta_1_synkro.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_synkro.models.Registro;
import com.example.beta_1_synkro.repository.IRepositorioRegistro;

@Service
public class ServicioRegistro {

    // Inyecto una dependencia hacia el repositorio
    @Autowired
    private IRepositorioRegistro repositorioRegistro;

    // guardar
    public Registro guardarRegistro(Registro datosRegistro) {
        return this.repositorioRegistro.save(datosRegistro);
    }

    // buscar
    public List<Registro> buscar() {
        return this.repositorioRegistro.findAll();
    }

    // actualizar
    public Registro modificar(UUID id, Registro datosNuevos) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
        if (registroBuscado.isPresent()) {
            Registro registroEncontrado = registroBuscado.get();

            registroEncontrado.setFechaRegistro(datosNuevos.getFechaRegistro());
            registroEncontrado.setObservacion(datosNuevos.getObservacion());
            registroEncontrado.setEstado(datosNuevos.getEstado());

            return this.repositorioRegistro.save(registroEncontrado);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro no encontrado");
        }
    }

    // eliminar
    public boolean eliminar(UUID id) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
        if (registroBuscado.isPresent()) {
            this.repositorioRegistro.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro no encontrado");
        }
    }
}