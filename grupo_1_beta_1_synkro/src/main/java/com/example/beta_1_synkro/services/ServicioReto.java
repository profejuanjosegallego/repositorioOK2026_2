package com.example.beta_1_synkro.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.beta_1_synkro.models.Reto;
import com.example.beta_1_synkro.repository.IRepositorioReto;

@Service
public class ServicioReto {

    private final IRepositorioReto repositorioReto;

    // Inyección de dependencias por constructor
    public ServicioReto(IRepositorioReto repositorioReto) {
        this.repositorioReto = repositorioReto;
    }

    // Operaciones que habilitamos ejecutar en nuestra tabla

    // guardar
    public Reto guardarReto(Reto datosReto) {
        return this.repositorioReto.save(datosReto);
    }

    // buscar
    public List<Reto> buscar() {
        return this.repositorioReto.findAll();
    }

    // actualizar
    public Reto modificar(UUID id, Reto datosNuevos) {
        Optional<Reto> retoBuscado = this.repositorioReto.findById(id);
        if (retoBuscado.isPresent()) {
            Reto retoEncontrado = retoBuscado.get();

            retoEncontrado.setNombre(datosNuevos.getNombre());
            retoEncontrado.setDescripcion(datosNuevos.getDescripcion());
            retoEncontrado.setFecha_inicio(datosNuevos.getFecha_inicio());
            retoEncontrado.setFecha_fin(datosNuevos.getFecha_fin());
            retoEncontrado.setEstado(datosNuevos.getEstado());

            return this.repositorioReto.save(retoEncontrado);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reto no encontrado");
        }
    }

    // eliminar
    public boolean eliminar(UUID id) {
        Optional<Reto> retoBuscado = this.repositorioReto.findById(id);
        if (retoBuscado.isPresent()) {
            this.repositorioReto.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reto no encontrado");
        }
    }
}
