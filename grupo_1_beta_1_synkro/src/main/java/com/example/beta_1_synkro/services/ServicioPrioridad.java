package com.example.beta_1_synkro.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_synkro.models.Prioridad;
import com.example.beta_1_synkro.repository.IRepositorioPrioridad;

@Service 
public class ServicioPrioridad {
        //Inyecto una dependencia hacia el repositorio 
    @Autowired 
    private IRepositorioPrioridad repositorioPrioridad;
    //Operaciones que habilitamos ejecutar en nuestra tabla

    //guardar
    public Prioridad guardarPrioridad( Prioridad datosPrioridad){
        return this.repositorioPrioridad.save(datosPrioridad);
        
    }
    //buscar
    public List<Prioridad> buscar(){
        return this.repositorioPrioridad.findAll();
    }
    //actualizar
    public Prioridad modificar(UUID id, Prioridad datosNuevos){
        Optional<Prioridad> prioridadBuscada=this.repositorioPrioridad.findById(id);
        if(prioridadBuscada.isPresent()){
            //hay a quien actualizar
            Prioridad prioridadEncontrada = prioridadBuscada.get();

            //MOdificacando los datos
        prioridadEncontrada.setNombre (datosNuevos.getNombre());
        prioridadEncontrada.setNivel (datosNuevos.getNivel());
            //Guardo los cambios
        return this.repositorioPrioridad.save(prioridadEncontrada);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Prioridad no encontrada");
        }
    }
    //eliminar
    public boolean eliminar(UUID id){
        Optional<Prioridad> prioridadBuscada=this.repositorioPrioridad.findById(id);
        if(prioridadBuscada.isPresent()){
            this.repositorioPrioridad.deleteById(id);
            return true;
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No se encontró la prioridad");
        }

    }
}
