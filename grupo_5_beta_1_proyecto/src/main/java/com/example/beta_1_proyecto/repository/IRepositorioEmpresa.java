package com.example.beta_1_proyecto.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.beta_1_proyecto.models.Empresa;

@Repository
public interface IRepositorioEmpresa extends JpaRepository<Empresa, UUID> {

}