package com.example.beta_1_proyecto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_proyecto.models.Categoria;
import com.example.beta_1_proyecto.repository.IRepositorioCategoria;

@Service
public class ServicioCategoria {

    @Autowired
    IRepositorioCategoria repositorioCategoria;

    public Categoria guardar(Categoria datosCategoria) {
        return this.repositorioCategoria.save(datosCategoria);
    }

    public List<Categoria> buscar() {
        return this.repositorioCategoria.findAll();
    }

    public Categoria modificar(UUID id, Categoria datosNuevos) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        
        if (categoriaBuscada.isPresent()) {
            Categoria categoriaEncontrada = categoriaBuscada.get();

            // Modificando los datos
            categoriaEncontrada.setNombre(datosNuevos.getNombre());
            categoriaEncontrada.setDescripcion(datosNuevos.getDescripcion());

            // Guardar los cambios 
            return this.repositorioCategoria.save(categoriaEncontrada);
            
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }
    }

    public boolean eliminar(UUID id) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        
        if (categoriaBuscada.isPresent()) {
            this.repositorioCategoria.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }
    }
}