package com.example.beta_1_InnovaCesde.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_InnovaCesde.models.Prioridad;
import com.example.beta_1_InnovaCesde.repository.IRepositorioPrioridad;

@Service
public class ServicioPrioridad {


    //inyecto una dependencia hacia el repositorio
    @Autowired
    private IRepositorioPrioridad repositorioPrioridad;

    //operaciones que habilitamos ejecutar en nuestra tabla


    //guardar
    public Prioridad guardarPrioridad(Prioridad datosPrioridad){

        return this.repositorioPrioridad.save(datosPrioridad);

    }

    // Buscar
    public List <Prioridad> buscar() {
        return this.repositorioPrioridad.findAll();
    }

    // Actualizar
    public Prioridad modificar(UUID id, Prioridad datosNuevos) {
        Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);

        if (prioridadBuscada.isPresent()) {
            Prioridad prioridadEncontrada = prioridadBuscada.get();

            // Modificando los datos
            prioridadEncontrada.setNombre(datosNuevos.getNombre());
            prioridadEncontrada.setDescripcion(datosNuevos.getDescripcion());
            

            // Guardo los cambios y los retorno
            return this.repositorioPrioridad.save(prioridadEncontrada);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prioridad no encontrada");
        }
    }

    // Eliminar
    public boolean eliminar(UUID id) {
        Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);

        if (prioridadBuscada.isPresent()) {
            this.repositorioPrioridad.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la prioridad");
        }
    }
}
