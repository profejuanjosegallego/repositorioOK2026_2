package com.example.beta1_RetoEmpresarial2.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nombre", nullable = false, unique = false, length = 100)
    private String nombre;

    @Column(name = "descripcion", nullable = false, unique = false, length = 400)
    private String descripcion;

    @Column(name = "fecha_inicio", nullable = false, unique = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false, unique = false)
    private LocalDate fechaFin;

    @Column(name = "estado", nullable = false, unique = false, length = 30)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    @JsonBackReference("reto_empresa")
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @JsonBackReference("reto_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_prioridad")
    @JsonBackReference("reto_prioridad")
    private Prioridad prioridad;

    @OneToMany(mappedBy = "reto")
    @JsonManagedReference("reto_registro")
    private List<Registro> registros = new ArrayList<>();

    public Reto() {
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
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
