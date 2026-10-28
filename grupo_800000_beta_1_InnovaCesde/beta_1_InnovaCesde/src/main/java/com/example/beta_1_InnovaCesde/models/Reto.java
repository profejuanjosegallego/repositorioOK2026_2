package com.example.beta_1_InnovaCesde.models;


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "retos") 

public class Reto {
    

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
     private UUID id;
     @Column(name = "titulo", nullable = false, unique = false, length = 100)
     private String titulo;
     @Column(name = "descripcion", nullable = false, unique = false, length = 200)
     private String descripcion;
     @Column(name = "fecha_creacion", nullable = false, unique = false)
     private LocalDateTime fecha_creacion;
     @Column(name = "fecha_limite", nullable = false, unique = false)
     private LocalDateTime fecha_limite;
     @Column(name = "estado", nullable = false, unique = false, length = 20)
     private String estado;
    
    
    @ManyToOne
    @JoinColumn(name="id_empresa")
    @JsonBackReference("reto_empresa")
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name="id_categoria")
    @JsonBackReference("reto_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name="id_prioridad")
    @JsonBackReference("reto_prioridad")
    private Prioridad prioridad;

    @OneToMany(mappedBy = "reto")
    @JsonIgnore
    private List<Registro> registros;


     public UUID getId() {
         return id;
     }
     public void setId(UUID id) {
         this.id = id;
     }
     public String getTitulo() {
         return titulo;
     }
     public void setTitulo(String titulo) {
         this.titulo = titulo;
     }
     public String getDescripcion() {
         return descripcion;
     }
     public void setDescripcion(String descripcion) {
         this.descripcion = descripcion;
     }
     public LocalDateTime getFecha_creacion() {
         return fecha_creacion;
     }
     public void setFecha_creacion(LocalDateTime fecha_creacion) {
         this.fecha_creacion = fecha_creacion;
     }
     public LocalDateTime getFecha_limite() {
         return fecha_limite;
     }
     public void setFecha_limite(LocalDateTime fecha_limite) {
         this.fecha_limite = fecha_limite;
     }
     public String getEstado() {
         return estado;
     }
     public void setEstado(String estado) {
         this.estado = estado;
     }
     public Empresa getEmpresa() {
         return empresa;
     }
     public void setEmpresa(Empresa empresa) {
         this.empresa = empresa;
     }
     public Categoria getCategoria() {
         return categoria;
     }
     public void setCategoria(Categoria categoria) {
         this.categoria = categoria;
     }
     public Prioridad getPrioridad() {
         return prioridad;
     }
     public void setPrioridad(Prioridad prioridad) {
         this.prioridad = prioridad;
     }
     public List<Registro> getRegistros() {
         return registros;
     }
     public void setRegistros(List<Registro> registros) {
         this.registros = registros;
     }
    
     
     

}
