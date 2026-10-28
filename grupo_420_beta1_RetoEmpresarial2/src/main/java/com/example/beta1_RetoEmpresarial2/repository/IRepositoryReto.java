package com.example.beta1_RetoEmpresarial2.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.beta1_RetoEmpresarial2.models.Reto;

@Repository
public interface IRepositoryReto extends JpaRepository<Reto, UUID> {

}
