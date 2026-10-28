package com.example.beta_1_nororiental.models;

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
@Table (name = "categorias")

public class Categoria {
    
    @Id
    @GeneratedValue (strategy =GenerationType.UUID)
    private UUID id;
    @Column (name = "nombre", nullable = false, unique = false, length = 50)
    private String nombre;
    @Column (name = "descripcion", nullable = false, unique = false, length = 100)
    private String descripcion;
//creando la relacion con la tabla de retos
@OneToMany (mappedBy = "categoria")
@JsonManagedReference ("reto_categoria")
private List<Reto> retos;
//Constructor vacio JPA 
public Categoria() {
    }
    // Getters y Setters
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
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    
    public List<Reto> getRetos() {
        return retos;
    }
    public void setRetos(List<Reto> retos) {
        this.retos = retos;
    }
}
