package com.example.beta_1_InnovaCesde.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_InnovaCesde.models.Categoria;
import com.example.beta_1_InnovaCesde.repository.IRepositorioCategoria;

@Service
public class ServicioCategoria {

    // Inyecto una dependencia hacia el repositorio
    @Autowired
    private IRepositorioCategoria repositorioCategoria;

    // Operaciones que habilitamos ejecutar en nuestra tabla

    // Guardar
    public Categoria guardarCategoria(Categoria datosCategoria) {
        return this.repositorioCategoria.save(datosCategoria);
    }

    // Buscar (Todos)
    public List<Categoria> buscar() {
        return this.repositorioCategoria.findAll();
    }

    // Buscar por ID
    public Categoria buscarPorId(UUID id) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        if (categoriaBuscada.isPresent()) {
            return categoriaBuscada.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }
    }

    // Actualizar / Modificar
    public Categoria modificar(UUID id, Categoria datosNuevos) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        
        if (categoriaBuscada.isPresent()) {
            // Hay a quién actualizar
            Categoria categoriaEncontrada = categoriaBuscada.get();

            // Modificando los datos
            categoriaEncontrada.setNombre(datosNuevos.getNombre());
            categoriaEncontrada.setDescripcion(datosNuevos.getDescripcion());

            // Guardar los cambios
            return this.repositorioCategoria.save(categoriaEncontrada);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada para actualizar");
        }
    }

    // Eliminar
    public boolean eliminar(UUID id) {
        Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
        if (categoriaBuscada.isPresent()) {
            this.repositorioCategoria.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la categoría");
        }
    }

}


