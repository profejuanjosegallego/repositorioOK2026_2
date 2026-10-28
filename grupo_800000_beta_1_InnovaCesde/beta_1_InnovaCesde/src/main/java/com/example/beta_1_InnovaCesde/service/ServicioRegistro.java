package com.example.beta_1_InnovaCesde.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_InnovaCesde.models.Registro;
import com.example.beta_1_InnovaCesde.repository.IRepositorioRegistro;

@Service
public class ServicioRegistro {

    // Inyecto una dependencia hacia el repositorio
    @Autowired
    private IRepositorioRegistro repositorioRegistro;

    // Operaciones que habilitamos ejecutar en nuestra tabla

    // Guardar
    public Registro guardarRegistro(Registro datosRegistro) {
        return this.repositorioRegistro.save(datosRegistro);
    }

    // Buscar (Todos)
    public List<Registro> buscar() {
        return this.repositorioRegistro.findAll();
    }

    // Buscar por ID
    public Registro buscarPorId(UUID id) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
        if (registroBuscado.isPresent()) {
            return registroBuscado.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro no encontrado");
        }
    }

    // Actualizar / Modificar
    public Registro modificar(UUID id, Registro datosNuevos) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
        
        if (registroBuscado.isPresent()) {
            // Hay a quién actualizar
            Registro registroEncontrado = registroBuscado.get();

            // Modificando los datos (ajusta los campos set según los atributos que tenga tu modelo Registro)
            registroEncontrado.setTipo(datosNuevos.getTipo());
            registroEncontrado.setDescripcion(datosNuevos.getDescripcion());
            registroEncontrado.setFecha(datosNuevos.getFecha());

            // Guardar los cambios
            return this.repositorioRegistro.save(registroEncontrado);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro no encontrado para actualizar");
        }
    }

    // Eliminar
    public boolean eliminar(UUID id) {
        Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
        if (registroBuscado.isPresent()) {
            this.repositorioRegistro.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el registro");
        }
    }

}

