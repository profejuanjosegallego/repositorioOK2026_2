package com.example.beta1_RetoEmpresarial2.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta1_RetoEmpresarial2.models.Categoria;
import com.example.beta1_RetoEmpresarial2.repository.IRepositoryCategoria;



@Service

public class ServicioCategoria {


    @Autowired
    IRepositoryCategoria repositorioCategoria;



    public Categoria guardarCategoria(Categoria datosCategoria) {
        return this.repositorioCategoria.save(datosCategoria);
    }

    public List<Categoria> buscar() {
        return this.repositorioCategoria.findAll();
    }

public Categoria modificarCategoria(UUID id, Categoria datosCategoria) {
    Optional<Categoria> CategoriaBuscada = this.repositorioCategoria.findById(id);
    if(CategoriaBuscada.isPresent()){
        // Hay a quien actualizar
        Categoria CategoriaEncontrada = CategoriaBuscada.get();

        //Modificando los datos 
        CategoriaEncontrada.setNombre(datosCategoria.getNombre());
        CategoriaEncontrada.setDescripcion(datosCategoria.getDescripcion());

        //Guardo los cambios
        return this.repositorioCategoria.save(CategoriaEncontrada);

    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la categoría con el ID proporcionado.");
    }
}

public boolean eliminarCategoria(UUID id) {
    Optional<Categoria> categoriaBuscada = this.repositorioCategoria.findById(id);
    if(categoriaBuscada.isPresent()){
        this.repositorioCategoria.deleteById(id);
        return true;
    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la categoría con el ID proporcionado.");
    }

}}

