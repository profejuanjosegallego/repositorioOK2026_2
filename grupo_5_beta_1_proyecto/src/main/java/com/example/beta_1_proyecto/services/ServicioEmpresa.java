package com.example.beta_1_proyecto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_proyecto.models.Empresa;
import com.example.beta_1_proyecto.repository.IRepositorioEmpresa;

@Service
public class ServicioEmpresa {

    @Autowired
    IRepositorioEmpresa repositorioEmpresa;

    public Empresa guardar(Empresa datosEmpresa) {
        return this.repositorioEmpresa.save(datosEmpresa);
    }

    public List<Empresa> buscar() {
        return this.repositorioEmpresa.findAll();
    }

    public Empresa modificar(UUID id, Empresa datosNuevos) {
        Optional<Empresa> empresaBuscada = this.repositorioEmpresa.findById(id);
        if (empresaBuscada.isPresent()) {
            Empresa empresaEncontrada = empresaBuscada.get();

            empresaEncontrada.setNombre(datosNuevos.getNombre());
            empresaEncontrada.setNit(datosNuevos.getNit());
            empresaEncontrada.setSector(datosNuevos.getSector());
            empresaEncontrada.setContacto(datosNuevos.getContacto());
            empresaEncontrada.setCorreo(datosNuevos.getCorreo());
            empresaEncontrada.setTelefono(datosNuevos.getTelefono());
            empresaEncontrada.setActiva(datosNuevos.getActiva());

            return this.repositorioEmpresa.save(empresaEncontrada);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa no encontrada");
        }
    }

    public boolean eliminar(UUID id) {
        Optional<Empresa> empresaBuscada = this.repositorioEmpresa.findById(id);
        if (empresaBuscada.isPresent()) {
            this.repositorioEmpresa.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la empresa");
        }
    }
}