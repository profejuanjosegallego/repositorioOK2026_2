package com.example.beta_1_synkro.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_synkro.models.Categoria; 
import com.example.beta_1_synkro.repository.IrepositorioCategoria;

@Service 
public class ServicioCategoria {

    @Autowired
    private IrepositorioCategoria repositorioCategoria;

    // Guardar
    public Categoria guardarCategoria(Categoria datosCategoria) {
        return this.repositorioCategoria.save(datosCategoria);
    }

    // Buscar todos
    public List<Categoria> buscar() {
        return this.repositorioCategoria.findAll();
    }

    // Modificar
    public Categoria modificar(UUID id, Categoria datosNuevos) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        
        if (categoriaBuscada.isPresent()) {
            Categoria categoriaEncontrada = categoriaBuscada.get();

            categoriaEncontrada.setNombre(datosNuevos.getNombre());
            categoriaEncontrada.setCategoria(datosNuevos.getCategoria());
            categoriaEncontrada.setDescripcion(datosNuevos.getDescripcion());

            return this.repositorioCategoria.save(categoriaEncontrada);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada");
        }
    }
    
    // Eliminar
    public boolean eliminar(UUID id) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        
        if (categoriaBuscada.isPresent()) {
            this.repositorioCategoria.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria no encontrada");
        }
    }
}