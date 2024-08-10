package com.team9oogling.codyus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

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

}