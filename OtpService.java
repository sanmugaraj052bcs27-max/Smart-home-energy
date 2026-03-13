package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.example.demo.model.User;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, OtpData> otpStorage = new HashMap<>();


    // Generate OTP
    public void generateOtp(String email, User user) {

        String otp = String.format("%06d", new Random().nextInt(999999));

        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(20);

        OtpData data = new OtpData();
        data.setOtp(otp);
        data.setExpiryTime(expiryTime);
        data.setUser(user);

        otpStorage.put(email, data);

        // Send OTP Email
        sendOtpEmail(email, otp);

        System.out.println("OTP sent to email: " + email);
    }


    // Verify OTP
    public User verifyOtp(String email, String enteredOtp) {

        OtpData data = otpStorage.get(email);

        if (data == null)
            return null;

        // Check expiry
        if (data.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpStorage.remove(email);
            return null;
        }

        // Check OTP
        if (data.getOtp().equals(enteredOtp)) {
            otpStorage.remove(email);
            return data.getUser();
        }

        return null;
    }


    // Resend OTP
    public void resendOtp(String email) {

        OtpData data = otpStorage.get(email);

        if (data == null)
            return;

        String otp = String.format("%06d", new Random().nextInt(999999));

        data.setOtp(otp);
        data.setExpiryTime(LocalDateTime.now().plusMinutes(20));

        otpStorage.put(email, data);

        sendOtpEmail(email, otp);

        System.out.println("Resent OTP to: " + email);
    }


    // Email sending method
    private void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("OTP Verification");

        message.setText(
                "Your OTP is: " + otp +
                "\n\nThis OTP is valid for 20 minutes."
        );

        mailSender.send(message);
    }


    // Inner class to store OTP details
    private static class OtpData {

        private String otp;
        private LocalDateTime expiryTime;
        private User user;

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }

        public void setExpiryTime(LocalDateTime expiryTime) {
            this.expiryTime = expiryTime;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }
    }
}