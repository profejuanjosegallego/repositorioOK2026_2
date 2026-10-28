package com.example.beta_1_InnovaCesde.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_InnovaCesde.models.Reto;
import com.example.beta_1_InnovaCesde.repository.IRepositorioReto;

@Service 

public class ServicioReto {
    private IRepositorioReto repositorioReto;

    public ServicioReto(IRepositorioReto repositorioReto) {
        this.repositorioReto = repositorioReto;
    }

    // Operaciones que habilitamos ejecutar en nuestra tabla

    //GUARDAR 

    public Reto guardarReto(Reto datosReto){
        return this.repositorioReto.save(datosReto);
    }
    // Buscar
    public List<Reto>buscar(){
        return this.repositorioReto.findAll();
    }
    //Actualizar
    public Reto modificar (UUID id,Reto datosnuevos){
        Optional<Reto>retoBuscado=this.repositorioReto.findById(id);
        if(retoBuscado.isPresent()){
            // hay a quien actualizar
            Reto retoEncontrado=retoBuscado.get();
            //Modificado los datos

            retoEncontrado.setTitulo(datosnuevos.getTitulo());
            retoEncontrado.setDescripcion(datosnuevos.getDescripcion());
            retoEncontrado.setFecha_creacion(datosnuevos.getFecha_creacion());
            retoEncontrado.setFecha_limite(datosnuevos.getFecha_limite());
            retoEncontrado.setEstado(datosnuevos.getEstado());

            //Guardar los cambios
            return this.repositorioReto.save(retoEncontrado);
            
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Reto no encontrado");

        }
    }

    // Eliminar

    public boolean eliminar (UUID id){
        Optional<Reto> retoBuscado=this.repositorioReto.findById(id);
        if (retoBuscado.isPresent()){
            this.repositorioReto.deleteById(id);
            return true;
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"no se encontro el reto");
        }
    }

}
