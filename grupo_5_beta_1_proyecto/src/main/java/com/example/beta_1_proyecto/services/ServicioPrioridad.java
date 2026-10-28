package com.example.beta_1_proyecto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_proyecto.models.Prioridad;
import com.example.beta_1_proyecto.repository.IRepositorioPrioridad;

@Service
public class ServicioPrioridad {

    @Autowired
    IRepositorioPrioridad repositorioPrioridad;

    public Prioridad guardar(Prioridad datosPrioridad) {
        return this.repositorioPrioridad.save(datosPrioridad);
    }

    public List<Prioridad> buscar() {
        return this.repositorioPrioridad.findAll();
    }

    public Prioridad modificar(UUID id, Prioridad datosNuevos) {
        Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);
        
        if (prioridadBuscada.isPresent()) {
            Prioridad prioridadEncontrada = prioridadBuscada.get();

            // Modificando datos específicos de Prioridad
            prioridadEncontrada.setNombre(datosNuevos.getNombre());
            prioridadEncontrada.setNivel(datosNuevos.getNivel());

            // Guardar los cambios 
            return this.repositorioPrioridad.save(prioridadEncontrada);
            
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prioridad no encontrada");
        }
    }

    public boolean eliminar(UUID id) {
        Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);
        
        if (prioridadBuscada.isPresent()) {
            this.repositorioPrioridad.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prioridad no encontrada");
        }
    }
}