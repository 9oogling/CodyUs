package com.team9oogling.codyus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

  @GetMapping("/")
  public String root() {
    return "index";
  }

  @GetMapping("/home")
  public String home() {
    return "index";
  }

  @GetMapping("/login")
  public String loginPage() {
    return "login";
  }

  @GetMapping("/signup")
  public String signupPage() {
    return "signup";
  }

  @GetMapping("/admin/signup")
  public String adminSignupPage() {
    return "admin-signup";
  }

  @GetMapping("/admin/back-office")
  public String adminBackOfficePage() {
    return "back-office";
  }

  @GetMapping("/posts")
  public String postsPage() {
    return "posts";
  }

  @GetMapping("/posts/postCreate")
  public String postCreatePage() {
    return "postCreate";
  }

  @GetMapping("/posts/postDetail/{postId}")
  public String postDetailPage(@PathVariable("postId") int postId) {
    return "postDetail";
  }

  @GetMapping("/posts/search")
  public String postSearchPage() {
    return "searchResult";
  }

  @GetMapping("/shop")
  public String shopPage() {
    return "shop";
  }

  @GetMapping("/chat")
  public String chatPage() {
    return "chat";
  }

  @GetMapping("/login/find-email")
  public String findEmailPage() {
    return "find-email";
  }

  @GetMapping("/login/find-password")
  public String findPasswordPage() {
    return "find-password";
  }

  @GetMapping("/help")
  public String helpPage() {
    return "contact-us";
  }

  @GetMapping("/like")
  public String likePage() {
    return "likePage";
  }

  @GetMapping("/my-page")
  public String myPage() {
    return "myPage";
  }

  @GetMapping("/ranking")
  public String ranking() {
    return "ranking";
  }

  @GetMapping("/man")
  public String man() {
    return "man";
  }

  @GetMapping("/woman")
  public String woman() {
    return "woman";
  }

  @GetMapping("/unisex")
  public String unisex() {
    return "unisex";
  }

  @GetMapping("/season")
  public String season() {
    return "season";
  }

}