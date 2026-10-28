package com.example.beta_1_synkro.models;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity 
@Table(name = "prioridades")
public class Prioridad {
    @Id //LLAVE PRIMARIA
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;
    
    @Column (nullable = false)
    private String nombre;

    @Column (nullable = false)
    private Integer nivel;

    @OneToMany (mappedBy = "prioridad")
    @JsonManagedReference("reto_prioridad") 
    private List<Reto> retos; 

    public Prioridad() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    public List<Reto> getRetos() {
        return retos;
    }

    public void setRetos(List<Reto> retos) {
        this.retos = retos;
    }

    


}
