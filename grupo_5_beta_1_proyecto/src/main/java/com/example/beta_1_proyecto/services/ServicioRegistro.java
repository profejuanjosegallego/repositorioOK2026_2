package com.example.beta_1_proyecto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_proyecto.models.Registro;
import com.example.beta_1_proyecto.repository.IRepositorioRegistro;

@Service
public class ServicioRegistro {

    @Autowired
    IRepositorioRegistro repositorioRegistro;

    public Registro guardar(Registro datosRegistro) {
        return this.repositorioRegistro.save(datosRegistro);
    }

    public List<Registro> buscar() {
        return this.repositorioRegistro.findAll();
    }

    public Registro modificar(UUID id, Registro datosNuevos) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);

        if (registroBuscado.isPresent()) {
            Registro registroEncontrado = registroBuscado.get();

            registroEncontrado.setTipo(datosNuevos.getTipo());
            registroEncontrado.setDescripcion(datosNuevos.getDescripcion());
            registroEncontrado.setFecha(datosNuevos.getFecha());

            
            return this.repositorioRegistro.save(registroEncontrado);

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro no encontrado");
        }
    }

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