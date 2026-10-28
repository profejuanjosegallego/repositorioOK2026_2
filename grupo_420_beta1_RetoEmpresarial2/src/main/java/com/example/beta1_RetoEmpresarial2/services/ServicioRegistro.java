package com.example.beta1_RetoEmpresarial2.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta1_RetoEmpresarial2.models.Registro;
import com.example.beta1_RetoEmpresarial2.repository.IRepositoryRegistro;



@Service

public class ServicioRegistro {

    @Autowired
    IRepositoryRegistro repositorioRegistro;


   ServicioRegistro(IRepositoryRegistro repositorioRegistro) {
      this.repositorioRegistro = repositorioRegistro;
   }



    public Registro guardarRegistro(Registro datosRegistro) {
        return this.repositorioRegistro.save(datosRegistro);
    }

    public List<Registro> buscar() {
        return this.repositorioRegistro.findAll();
    }

public Registro modificarRegistro(UUID id, Registro datosRegistro) {
    Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
    if(registroBuscado.isPresent()){
        // Hay a quien actualizar
        Registro registroEncontrado = registroBuscado.get();

        //Modificando los datos 
        registroEncontrado.setFechaRegistro(datosRegistro.getFechaRegistro());
        registroEncontrado.setObservacion(datosRegistro.getObservacion());
        registroEncontrado.setEstado(datosRegistro.getEstado());

        //Guardo los cambios
        return this.repositorioRegistro.save(registroEncontrado);

    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el registro con el ID proporcionado.");
    }
}

public boolean eliminarRegistro(UUID id) {
    Optional<Registro> registroBuscado = this.repositorioRegistro.findById(id);
    if(registroBuscado.isPresent()){
        this.repositorioRegistro.deleteById(id);
        return true;
    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el registro con el ID proporcionado.");
    }

}}