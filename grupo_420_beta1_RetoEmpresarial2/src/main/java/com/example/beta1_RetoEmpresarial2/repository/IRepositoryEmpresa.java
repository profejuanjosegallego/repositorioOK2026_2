package com.example.beta1_RetoEmpresarial2.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.beta1_RetoEmpresarial2.models.Empresa;

@Repository
public interface IRepositoryEmpresa extends JpaRepository<Empresa, UUID> {

}
