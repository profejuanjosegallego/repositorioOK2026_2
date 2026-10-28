package com.example.beta1_RetoEmpresarial2.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta1_RetoEmpresarial2.models.Prioridad;
import com.example.beta1_RetoEmpresarial2.repository.IRepositoryPrioridad;



@Service

public class ServicioPrioridad {


    @Autowired
    IRepositoryPrioridad repositorioPrioridad;



    public Prioridad guardarPrioridad(Prioridad datosPrioridad) {
        return this.repositorioPrioridad.save(datosPrioridad);
    }

    public List<Prioridad> buscar() {
        return this.repositorioPrioridad.findAll();
    }

public Prioridad modificarPrioridad(UUID id, Prioridad datosPrioridad) {
    Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);
    if(prioridadBuscada.isPresent()){
        // Hay a quien actualizar
        Prioridad prioridadEncontrada = prioridadBuscada.get();

        //Modificando los datos 
        prioridadEncontrada.setNombre(datosPrioridad.getNombre());
        prioridadEncontrada.setNivel(datosPrioridad.getNivel());

        //Guardo los cambios
        return this.repositorioPrioridad.save(prioridadEncontrada);

    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la prioridad con el ID proporcionado.");
    }
}

public boolean eliminarPrioridad(UUID id) {
    Optional<Prioridad> prioridadBuscada = this.repositorioPrioridad.findById(id);
    if(prioridadBuscada.isPresent()){
        this.repositorioPrioridad.deleteById(id);
        return true;
    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la prioridad con el ID proporcionado.");
    }

}}
    


