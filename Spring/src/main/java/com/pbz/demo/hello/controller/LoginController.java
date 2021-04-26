package com.pbz.demo.hello.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RestController
@RequestMapping(value = "/login")
public class LoginController {

	@Autowired
	HttpSession session;

	@Value("${demo.timeout}")
	private int timeout;

	@RequestMapping("")
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView();
		if ("admin".equals(session.getAttribute("name"))) {
			mv.setViewName("logout.html");
			mv.addObject("username", "admin");
		} else {
			mv.setViewName("login.html");
		}
		return mv;
	}

	@RequestMapping(value = "/in")
	@ResponseBody
	public ModelAndView in(@RequestParam(name = "lname") String lname, @RequestParam(name = "lpwd") String lpwd) {
		if ("admin".equals(lname) && "password".equals(lpwd)) {
			session.setAttribute("name", "admin");
			session.setMaxInactiveInterval(timeout);
		}
		return index();
	}

	@RequestMapping("/out")
	@ResponseBody
	public ModelAndView out() {
		session.removeAttribute("name");
		return index();
	}
}