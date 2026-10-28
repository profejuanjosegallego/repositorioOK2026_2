package com.example.beta_1_proyecto.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_proyecto.models.Reto;
import com.example.beta_1_proyecto.repository.IRepositorioReto;

@Service
public class ServicioReto {

    @Autowired
    IRepositorioReto repositorioReto;

    public Reto guardar(Reto datosReto) {
        return this.repositorioReto.save(datosReto);
    }

    public List<Reto> buscar() {
        return this.repositorioReto.findAll();
    }

    public Reto modificar(UUID id, Reto datosNuevos) {
        Optional<Reto> retoBuscado = this.repositorioReto.findById(id);
        if (retoBuscado.isPresent()) {
            Reto retoEncontrado = retoBuscado.get();

            // Modificando todos los datos de la entidad Reto
            retoEncontrado.setNombre(datosNuevos.getNombre());
            retoEncontrado.setDescripcion(datosNuevos.getDescripcion());
            retoEncontrado.setFechaInicio(datosNuevos.getFechaInicio());
            retoEncontrado.setFechaFin(datosNuevos.getFechaFin());
            retoEncontrado.setEstado(datosNuevos.getEstado());

            return this.repositorioReto.save(retoEncontrado);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reto no encontrado");
        }
    }

    public boolean eliminar(UUID id) {
        Optional<Reto> retoBuscado = this.repositorioReto.findById(id);
        if (retoBuscado.isPresent()) {
            this.repositorioReto.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el reto");
        }
    }
}