package com.team9oogling.codyus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CodyUsApplication {

  public static void main(String[] args) {
    SpringApplication.run(CodyUsApplication.class, args);
  }

}
