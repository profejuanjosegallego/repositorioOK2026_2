package com.example.beta_1_InnovaCesde.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.beta_1_InnovaCesde.models.Reto;

public interface IRepositorioReto extends JpaRepository<Reto,UUID> {

}
