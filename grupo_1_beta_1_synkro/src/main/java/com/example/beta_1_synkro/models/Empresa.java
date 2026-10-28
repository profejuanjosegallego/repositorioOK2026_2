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
@Table (name = "empresas")
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name ="nombre", nullable = false, unique = false, length = 50)
    private String nombre;

    @Column(name = "nit" , nullable = false , unique = true, length = 50)
    private String nit;

    @Column(name = "sector" , nullable = false , unique = false, length = 50)
    private String sector;

    @Column(name = "contacto" , nullable = false , unique = false, length = 50)
    private String contacto;
    
    @Column(name = "correo" , nullable = false , unique = true, length = 80)
    private String correo;

    @Column(name = "telefono" , nullable = false , unique = true, length = 50)
    private String telefono;

    @Column(name = "activa" , nullable = false , unique = false)
    private Boolean activa;


    @OneToMany (mappedBy = "empresa")
    @JsonManagedReference ("reto_empresa")
    private List<Reto> retos;

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
    public String getNit() {
        return nit;
    }
    public void setNit(String nit) {
        this.nit = nit;
    }
    public String getSector() {
        return sector;
    }
    public void setSector(String sector) {
        this.sector = sector;
    }
    public String getContacto() {
        return contacto;
    }
    public void setContacto(String contacto) {
        this.contacto = contacto;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public Boolean getActiva() {
        return activa;
    }
    public void setActiva(Boolean activa) {
        this.activa = activa;
    }
    public List<Reto> getRetos() {
        return retos;
    }
    public void setRetos(List<Reto> retos) {
        this.retos = retos;
    }

}
