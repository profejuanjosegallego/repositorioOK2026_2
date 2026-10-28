package com.example.beta1_RetoEmpresarial2.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta1_RetoEmpresarial2.models.Reto;
import com.example.beta1_RetoEmpresarial2.repository.IRepositoryReto;

@Service

public class ServicioReto {

    @Autowired
    IRepositoryReto repositorioReto;

    public Reto guardarReto(Reto datosReto) {
        return this.repositorioReto.save(datosReto);
    }

    public List<Reto> buscarRetos() {
        return this.repositorioReto.findAll();
    }

    public Reto modificarReto(UUID id, Reto datosReto) {
        Optional<Reto> RetoBuscado = this.repositorioReto.findById(id);
        if (RetoBuscado.isPresent()) {
            // Hay a quien actualizar
            Reto RetoEncontrado = RetoBuscado.get();

            // Modificando los datos
            RetoEncontrado.setNombre(datosReto.getNombre());
            RetoEncontrado.setDescripcion(datosReto.getDescripcion());
            RetoEncontrado.setFechaInicio(datosReto.getFechaInicio());
            RetoEncontrado.setFechaFin(datosReto.getFechaFin());
            RetoEncontrado.setEstado(datosReto.getEstado());

            // Guardo los cambios
            return this.repositorioReto.save(RetoEncontrado);

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No se encontró el reto con el ID proporcionado.");
        }
    }

    public boolean eliminarReto(UUID id) {
        Optional<Reto> RetoBuscada = this.repositorioReto.findById(id);
        if (RetoBuscada.isPresent()) {
            this.repositorioReto.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No se encontró el reto con el ID proporcionado.");
        }

    }
}