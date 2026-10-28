package com.example.beta1_RetoEmpresarial2.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta1_RetoEmpresarial2.models.Empresa;
import com.example.beta1_RetoEmpresarial2.repository.IRepositoryEmpresa;



@Service

public class ServicioEmpresa {


    @Autowired
    IRepositoryEmpresa repositorioEmpresa;



    public Empresa guardarEmpresa(Empresa datosEmpresa) {
        return this.repositorioEmpresa.save(datosEmpresa);
    }

    public List<Empresa> buscar() {
        return this.repositorioEmpresa.findAll();
    }

public Empresa modificarEmpresa(UUID id, Empresa datosEmpresa) {
    Optional<Empresa> EmpresaBuscada = this.repositorioEmpresa.findById(id);
    if(EmpresaBuscada.isPresent()){
        // Hay a quien actualizar
        Empresa EmpresaEncontrada = EmpresaBuscada.get();

        //Modificando los datos 
        EmpresaEncontrada.setNombre(datosEmpresa.getNombre());
        EmpresaEncontrada.setNit(datosEmpresa.getNit());
        EmpresaEncontrada.setSector(datosEmpresa.getSector());
        EmpresaEncontrada.setContacto(datosEmpresa.getContacto());
        EmpresaEncontrada.setCorreo(datosEmpresa.getCorreo());
        EmpresaEncontrada.setTelefono(datosEmpresa.getTelefono());
        EmpresaEncontrada.setActiva(datosEmpresa.getActiva());

        //Guardo los cambios
        return this.repositorioEmpresa.save(EmpresaEncontrada);

    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la empresa con el ID proporcionado.");
    }   
}

public boolean eliminarEmpresa(UUID id) {
    Optional<Empresa> EmpresaBuscada = this.repositorioEmpresa.findById(id);
    if(EmpresaBuscada.isPresent()){
        this.repositorioEmpresa.deleteById(id);
        return true;
    } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la empresa con el ID proporcionado.");
    }

}}