package com.team9oogling.codyus.domain.user.entity;

import lombok.Getter;

@Getter
public enum UserRole {

  USER("USER"),
  ADMIN("ADMIN");

  private final String role;

  UserRole(String role) {
    this.role = role;
  }

}