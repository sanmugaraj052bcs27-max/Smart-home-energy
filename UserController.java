package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.OtpService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    // Send OTP
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody User user) {

        otpService.generateOtp(user.getEmail(), user);
        return "OTP Sent Successfully";
    }

    // Verify OTP and Register
    @PostMapping("/verify-otp")
public String verifyOtp(@RequestBody Map<String, String> request) {

    String email = request.get("email");
    String otp = request.get("otp");

    User verifiedUser = otpService.verifyOtp(email, otp);

    if (verifiedUser != null) {

        User existingUser = userRepository.findByEmail(email);

        if(existingUser == null){
            // Signup case
            userRepository.save(verifiedUser);
            return "User Registered Successfully";
        }
        else{
            // Forgot password case
            return "OTP Verified Successfully";
        }

    } else {
        return "Invalid or Expired OTP";
    }
}

    @PostMapping("/resend-otp")
public String resendOtp(@RequestBody Map<String,String> request){

    String email = request.get("email");

    otpService.resendOtp(email);

    return "OTP Sent Again";
}

    // Login API
    @PostMapping("/login")
public Map<String, Object> loginUser(@RequestBody User user) {

    User existingUser = userRepository
            .findByEmailAndPassword(user.getEmail(), user.getPassword());

    if (existingUser != null) {
        return Map.of(
                "status", "success",
                "user", existingUser
        );
    } else {
        return Map.of(
                "status", "fail",
                "message", "Invalid Credentials"
        );
    }
}

@PostMapping("/reset-password")
public String resetPassword(@RequestBody Map<String,String> request){

    String email = request.get("email");
    String password = request.get("password");

    User user = userRepository.findByEmail(email);

    if(user != null){

        user.setPassword(password);

        userRepository.save(user);

        return "Password Updated Successfully";

    }else{

        return "User Not Found";

    }

}
    

}